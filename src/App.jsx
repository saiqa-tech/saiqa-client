import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/Layout';
import { ProtectedRoute } from './components/ProtectedRoute';
import './styles/globals.css';

// Import pages
import LoginPage from './pages/Login';
import DashboardPage from './pages/Dashboard';
import ProfilePage from './pages/Profile';
import UsersListPage from './pages/users/UsersList';
import UserCreatePage from './pages/users/UserCreate';
import UserEditPage from './pages/users/UserEdit';
import UnitsListPage from './pages/units/UnitsList';
import UnitCreatePage from './pages/units/UnitCreate';
import UnitEditPage from './pages/units/UnitEdit';
import DesignationsListPage from './pages/designations/DesignationsList';
import DesignationCreatePage from './pages/designations/DesignationCreate';
import DesignationEditPage from './pages/designations/DesignationEdit';
import NotFoundPage from './pages/NotFound';
import UnauthorizedPage from './pages/Unauthorized';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Users routes */}
            <Route
              path="/users"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <UsersListPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/create"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <UserCreatePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/users/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <UserEditPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Units routes */}
            <Route
              path="/units"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <UnitsListPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/units/create"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <UnitCreatePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/units/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <UnitEditPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* Designations routes */}
            <Route
              path="/designations"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <DesignationsListPage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/designations/create"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <DesignationCreatePage />
                  </Layout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/designations/:id/edit"
              element={
                <ProtectedRoute allowedRoles={['admin', 'manager']}>
                  <Layout>
                    <DesignationEditPage />
                  </Layout>
                </ProtectedRoute>
              }
            />

            {/* 404 route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
