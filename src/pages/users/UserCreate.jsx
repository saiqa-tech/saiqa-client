import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../../api/endpoints/users';
import { unitsAPI } from '../../api/endpoints/units';
import { designationsAPI } from '../../api/endpoints/designations';
import { useAuth } from '../../hooks/useAuth';
import { formRules } from '../../utils/validators';
import { isAdmin } from '../../utils/rbac';
import { ROLES } from '../../utils/constants';

const { Title } = Typography;

const UserCreatePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const [designations, setDesignations] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchUnitsAndDesignations();
  }, []);

  const fetchUnitsAndDesignations = async () => {
    try {
      const [unitsData, designationsData] = await Promise.all([
        unitsAPI.getUnits(),
        designationsAPI.getDesignations(),
      ]);
      setUnits(unitsData.units || []);
      setDesignations(designationsData.designations || []);
    } catch (error) {
      message.error('Failed to fetch units and designations');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await usersAPI.createUser(values);
      message.success('User created successfully!');
      navigate('/users');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>Create User</Title>

      <Card style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={formRules.email}
          >
            <Input placeholder="Enter email" />
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={formRules.name}
          >
            <Input placeholder="Enter first name" />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={formRules.name}
          >
            <Input placeholder="Enter last name" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={formRules.password}
          >
            <Input.Password placeholder="Enter password" />
          </Form.Item>

          {isAdmin(user?.role) && (
            <Form.Item
              label="Role"
              name="role"
              rules={formRules.required}
            >
              <Select placeholder="Select role">
                <Select.Option value={ROLES.ADMIN}>Admin</Select.Option>
                <Select.Option value={ROLES.MANAGER}>Manager</Select.Option>
                <Select.Option value={ROLES.USER}>User</Select.Option>
              </Select>
            </Form.Item>
          )}

          <Form.Item
            label="Unit"
            name="unitId"
            rules={formRules.required}
          >
            <Select
              placeholder="Select unit"
              showSearch
              optionFilterProp="children"
            >
              {units.map((unit) => (
                <Select.Option key={unit.id} value={unit.id}>
                  {unit.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Designation"
            name="designationId"
            rules={formRules.required}
          >
            <Select
              placeholder="Select designation"
              showSearch
              optionFilterProp="children"
            >
              {designations.map((designation) => (
                <Select.Option key={designation.id} value={designation.id}>
                  {designation.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create User
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate('/users')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserCreatePage;
