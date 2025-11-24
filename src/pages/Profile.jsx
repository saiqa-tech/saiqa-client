import React, { useState } from 'react';
import { Card, Form, Input, Button, message, Typography, Divider, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { authAPI } from '../api/endpoints/auth';
import { formRules } from '../utils/validators';

const { Title, Text } = Typography;

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [passwordForm] = Form.useForm();

  const onChangePassword = async (values) => {
    setLoading(true);
    try {
      await authAPI.changePassword(values.oldPassword, values.newPassword);
      message.success('Password changed successfully!');
      passwordForm.resetFields();
    } catch (error) {
      message.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Title level={2}>Profile Settings</Title>

      <Card title="Personal Information" style={{ marginTop: 24 }}>
        <Space direction="vertical" style={{ width: '100%' }} size="middle">
          <div>
            <Text strong>Name:</Text>
            <br />
            <Text>{user?.firstName} {user?.lastName}</Text>
          </div>
          <div>
            <Text strong>Email:</Text>
            <br />
            <Text>{user?.email}</Text>
          </div>
          <div>
            <Text strong>Role:</Text>
            <br />
            <Text>{user?.role?.toUpperCase()}</Text>
          </div>
          {user?.unit && (
            <div>
              <Text strong>Unit:</Text>
              <br />
              <Text>{user.unit.name}</Text>
            </div>
          )}
          {user?.designation && (
            <div>
              <Text strong>Designation:</Text>
              <br />
              <Text>{user.designation.name}</Text>
            </div>
          )}
        </Space>
      </Card>

      <Card title="Change Password" style={{ marginTop: 24 }}>
        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={onChangePassword}
          style={{ maxWidth: 500 }}
        >
          <Form.Item
            label="Current Password"
            name="oldPassword"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="New Password"
            name="newPassword"
            rules={formRules.password}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item
            label="Confirm New Password"
            name="confirmPassword"
            dependencies={['newPassword']}
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;
