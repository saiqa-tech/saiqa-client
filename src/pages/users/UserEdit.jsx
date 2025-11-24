import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography, Select, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { usersAPI } from '../../api/endpoints/users';
import { unitsAPI } from '../../api/endpoints/units';
import { designationsAPI } from '../../api/endpoints/designations';
import { useAuth } from '../../hooks/useAuth';
import { formRules } from '../../utils/validators';
import { isAdmin, canUpdateUser } from '../../utils/rbac';
import { ROLES } from '../../utils/constants';

const { Title } = Typography;

const UserEditPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetchingUser, setFetchingUser] = useState(true);
  const [units, setUnits] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    setFetchingUser(true);
    try {
      const [userData, unitsData, designationsData] = await Promise.all([
        usersAPI.getUser(id),
        unitsAPI.getUnits(),
        designationsAPI.getDesignations(),
      ]);

      setCurrentUser(userData.user);
      setUnits(unitsData.units || []);
      setDesignations(designationsData.designations || []);

      form.setFieldsValue({
        email: userData.user.email,
        firstName: userData.user.firstName,
        lastName: userData.user.lastName,
        role: userData.user.role,
        unitId: userData.user.unitId,
        designationId: userData.user.designationId,
      });
    } catch (error) {
      message.error('Failed to fetch user data');
      navigate('/users');
    } finally {
      setFetchingUser(false);
    }
  };

  const onFinish = async (values) => {
    if (!canUpdateUser(user?.role, currentUser?.role)) {
      message.error('You do not have permission to update this user');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        firstName: values.firstName,
        lastName: values.lastName,
        unitId: values.unitId,
        designationId: values.designationId,
      };

      if (isAdmin(user?.role)) {
        updateData.role = values.role;
      }

      await usersAPI.updateUser(id, updateData);
      message.success('User updated successfully!');
      navigate('/users');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update user');
    } finally {
      setLoading(false);
    }
  };

  if (fetchingUser) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Edit User</Title>

      <Card style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item label="Email" name="email">
            <Input disabled />
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
              Update User
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

export default UserEditPage;
