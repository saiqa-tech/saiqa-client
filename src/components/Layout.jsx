import React, { useState } from 'react';
import { Layout as AntLayout, Menu, Avatar, Dropdown, Typography, theme } from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  UserOutlined,
  ApartmentOutlined,
  TagsOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import { getAccessibleMenuItems } from '../utils/rbac';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Sider, Content } = AntLayout;
const { Text } = Typography;

const iconMap = {
  HomeOutlined: <HomeOutlined />,
  UserOutlined: <UserOutlined />,
  ApartmentOutlined: <ApartmentOutlined />,
  TagsOutlined: <TagsOutlined />,
};

export const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = getAccessibleMenuItems(user?.role).map((item) => ({
    key: item.key,
    icon: iconMap[item.icon],
    label: item.label,
    onClick: () => navigate(item.path),
  }));

  const userMenuItems = [
    {
      key: 'profile',
      icon: <SettingOutlined />,
      label: 'Profile Settings',
      onClick: () => navigate('/profile'),
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  const selectedKey = menuItems.find((item) => {
    const itemPath = getAccessibleMenuItems(user?.role).find(
      (menuItem) => menuItem.key === item.key
    )?.path;
    if (itemPath === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(itemPath);
  })?.key || 'dashboard';

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg">
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
          }}
        >
          {collapsed ? 'S' : 'SAIQA'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
        />
      </Sider>
      <AntLayout>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
            style: { fontSize: 18, cursor: 'pointer' },
          })}
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
              <div>
                <Text strong>{user?.firstName} {user?.lastName}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {user?.role}
                </Text>
              </div>
            </div>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </AntLayout>
    </AntLayout>
  );
};
