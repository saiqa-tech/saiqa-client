import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Typography, Table, Tag, Spin } from 'antd';
import { UserOutlined, ApartmentOutlined, TagsOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { usersAPI } from '../api/endpoints/users';
import { unitsAPI } from '../api/endpoints/units';
import { designationsAPI } from '../api/endpoints/designations';
import { canManageUnits } from '../utils/rbac';

const { Title, Text } = Typography;

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ users: 0, units: 0, designations: 0 });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (canManageUnits(user?.role)) {
          const [usersData, unitsData, designationsData] = await Promise.all([
            usersAPI.getUsers({ page: 1, limit: 5 }),
            unitsAPI.getUnits(),
            designationsAPI.getDesignations(),
          ]);

          setStats({
            users: usersData.total || 0,
            units: unitsData.total || unitsData.units?.length || 0,
            designations: designationsData.total || designationsData.designations?.length || 0,
          });

          setRecentUsers(usersData.users || []);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const columns = [
    {
      title: 'Name',
      key: 'name',
      render: (_, record) => `${record.firstName} ${record.lastName}`,
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
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>Dashboard</Title>
      <Text type="secondary">Welcome back, {user?.firstName}!</Text>

      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Users"
              value={stats.users}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Units"
              value={stats.units}
              prefix={<ApartmentOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card>
            <Statistic
              title="Total Designations"
              value={stats.designations}
              prefix={<TagsOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
      </Row>

      {canManageUnits(user?.role) && recentUsers.length > 0 && (
        <Card title="Recent Users" style={{ marginTop: 24 }}>
          <Table
            dataSource={recentUsers}
            columns={columns}
            rowKey="id"
            pagination={false}
          />
        </Card>
      )}

      <Card style={{ marginTop: 24 }}>
        <Row align="middle">
          <Col flex="auto">
            <Text strong>Last Login:</Text>{' '}
            <Text type="secondary">
              {user?.lastLoginAt ? new Date(user.lastLoginAt).toLocaleString() : 'N/A'}
            </Text>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardPage;
