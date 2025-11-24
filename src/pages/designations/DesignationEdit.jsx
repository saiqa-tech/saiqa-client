import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Typography, Spin } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { designationsAPI } from '../../api/endpoints/designations';
import { formRules } from '../../utils/validators';

const { Title } = Typography;
const { TextArea } = Input;

const DesignationEditPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchDesignation();
  }, [id]);

  const fetchDesignation = async () => {
    setFetching(true);
    try {
      const response = await designationsAPI.getDesignation(id);
      form.setFieldsValue({
        name: response.designation.name,
        code: response.designation.code,
        description: response.designation.description,
      });
    } catch (error) {
      message.error('Failed to fetch designation data');
      navigate('/designations');
    } finally {
      setFetching(false);
    }
  };

  const onFinish = async (values) => {
    setLoading(true);
    try {
      await designationsAPI.updateDesignation(id, values);
      message.success('Designation updated successfully!');
      navigate('/designations');
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to update designation');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Edit Designation</Title>

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
              Update Designation
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

export default DesignationEditPage;
