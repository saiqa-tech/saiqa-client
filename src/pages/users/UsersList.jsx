import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Input,
  Space,
  Tag,
  Modal,
  message,
  Typography,
  Select,
  Card,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  ReloadOutlined,
  KeyOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { usersAPI } from '../../api/endpoints/users';
import { useAuth } from '../../hooks/useAuth';
import { canDeleteUser, canResetPassword, isAdmin } from '../../utils/rbac';
import { PAGINATION, ROLES } from '../../utils/constants';

const { Title } = Typography;
const { Search } = Input;

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: PAGINATION.DEFAULT_PAGE,
    pageSize: PAGINATION.DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchUsers = async (page = pagination.current, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: pageSize,
        ...(searchText && { search: searchText }),
        ...(roleFilter && { role: roleFilter }),
      };
      const response = await usersAPI.getUsers(params);
      setUsers(response.users || []);
      setPagination({
        current: response.page || page,
        pageSize: response.limit || pageSize,
        total: response.total || 0,
      });
    } catch (error) {
      message.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchText, roleFilter]);

  const handleTableChange = (newPagination) => {
    fetchUsers(newPagination.current, newPagination.pageSize);
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: 'Delete User',
      content: `Are you sure you want to delete ${record.firstName} ${record.lastName}?`,
      okText: 'Delete',
      okType: 'danger',
      onOk: async () => {
        try {
          await usersAPI.deleteUser(record.id);
          message.success('User deleted successfully');
          fetchUsers();
        } catch (error) {
          message.error(error.response?.data?.message || 'Failed to delete user');
        }
      },
    });
  };

  const handleResetPassword = (record) => {
    Modal.confirm({
      title: 'Reset Password',
      content: `Reset password for ${record.firstName} ${record.lastName}?`,
      okText: 'Reset',
      onOk: async () => {
        try {
          const response = await usersAPI.resetPassword(record.id);
          Modal.success({
            title: 'Password Reset Successful',
            content: (
              <div>
                <p>New password: <strong>{response.newPassword}</strong></p>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(response.newPassword);
                    message.success('Password copied to clipboard');
                  }}
                >
                  Copy Password
                </Button>
              </div>
            ),
          });
        } catch (error) {
          message.error(error.response?.data?.message || 'Failed to reset password');
        }
      },
    });
  };

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
      sorter: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag color={role === 'admin' ? 'red' : role === 'manager' ? 'blue' : 'green'}>
          {role?.toUpperCase()}
        </Tag>
      ),
      filters: [
        { text: 'Admin', value: 'admin' },
        { text: 'Manager', value: 'manager' },
        { text: 'User', value: 'user' },
      ],
    },
    {
      title: 'Unit',
      dataIndex: ['unit', 'name'],
      key: 'unit',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Designation',
      dataIndex: ['designation', 'name'],
      key: 'designation',
      render: (text) => text || 'N/A',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => navigate({ to: `/users/${record.id}/edit` })}
          >
            Edit
          </Button>
          {canResetPassword(user?.role) && (
            <Button
              type="link"
              icon={<KeyOutlined />}
              onClick={() => handleResetPassword(record)}
            >
              Reset Password
            </Button>
          )}
          {canDeleteUser(user?.role) && (
            <Button
              type="link"
              danger
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
            >
              Delete
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Title level={2}>Users</Title>
        {isAdmin(user?.role) && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => navigate('/users/create')}
          >
            Create User
          </Button>
        )}
      </div>

      <Card>
        <Space style={{ marginBottom: 16, width: '100%', justifyContent: 'space-between' }}>
          <Space>
            <Search
              placeholder="Search by email or name"
              allowClear
              onSearch={setSearchText}
              style={{ width: 300 }}
            />
            <Select
              placeholder="Filter by role"
              allowClear
              style={{ width: 150 }}
              onChange={setRoleFilter}
            >
              <Select.Option value="admin">Admin</Select.Option>
              <Select.Option value="manager">Manager</Select.Option>
              <Select.Option value="user">User</Select.Option>
            </Select>
          </Space>
          <Button icon={<ReloadOutlined />} onClick={() => fetchUsers()}>
            Refresh
          </Button>
        </Space>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
          loading={loading}
          pagination={{
            ...pagination,
            showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            pageSizeOptions: PAGINATION.PAGE_SIZE_OPTIONS,
          }}
          onChange={handleTableChange}
        />
      </Card>
    </div>
  );
};

export default UsersListPage;
