import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { unitsAPI } from '../../api/endpoints/units';
import { formRules } from '../../utils/validators';

const { Title } = Typography;
const { TextArea } = Input;

const UnitCreatePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [units, setUnits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUnits();
  }, []);

  const fetchUnits = async () => {
    try {
      const response = await unitsAPI.getUnits();
      setUnits(response.units || []);
    } catch (error) {
      message.error('Failed to fetch units');
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await unitsAPI.createUnit(values);
      message.success('Unit created successfully!');
      navigate('/units');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create unit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>Create Unit</Title>

      <Card style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Unit Name"
            name="name"
            rules={formRules.name}
          >
            <Input placeholder="Enter unit name" />
          </Form.Item>

          <Form.Item
            label="Parent Unit"
            name="parentUnitId"
            help="Leave empty for root unit"
          >
            <Select
              placeholder="Select parent unit (optional)"
              allowClear
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
            label="Description"
            name="description"
          >
            <TextArea rows={4} placeholder="Enter description (optional)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Unit
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate('/units')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UnitCreatePage;
