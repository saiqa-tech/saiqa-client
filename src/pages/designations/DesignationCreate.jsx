import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { designationsAPI } from '../../api/endpoints/designations';
import { formRules } from '../../utils/validators';

const { Title } = Typography;
const { TextArea } = Input;

const DesignationCreatePage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await designationsAPI.createDesignation(values);
      message.success('Designation created successfully!');
      navigate('/designations');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to create designation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>Create Designation</Title>

      <Card style={{ marginTop: 24 }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label="Designation Name"
            name="name"
            rules={formRules.name}
          >
            <Input placeholder="Enter designation name" />
          </Form.Item>

          <Form.Item
            label="Code"
            name="code"
            rules={formRules.required}
          >
            <Input placeholder="Enter code (e.g., MGR, DEV, HR)" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea rows={4} placeholder="Enter description (optional)" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create Designation
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => navigate('/designations')}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default DesignationCreatePage;
