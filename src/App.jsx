import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import ChangePassword from './pages/ChangePassword';
import Dashboard from './pages/Dashboard';
import DashboardHome from './pages/DashboardHome';
import Users from './pages/Users';
import Units from './pages/Units';
import Designations from './pages/Designations';
import './index.css';

const queryClient = new QueryClient();

function ProtectedRoute({ children, skipPasswordCheck = false }) {
  const { user, loading, requiresPasswordChange } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiresPasswordChange && !skipPasswordCheck) {
    return <Navigate to="/change-password" replace />;
  }

  return children;
}

function PublicRoute({ children }) {
  const { user, loading, requiresPasswordChange } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (user && requiresPasswordChange) {
    return <Navigate to="/change-password" replace />;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/change-password"
              element={
                <ProtectedRoute skipPasswordCheck={true}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<DashboardHome />} />
              <Route path="users" element={<Users />} />
              <Route path="units" element={<Units />} />
              <Route path="designations" element={<Designations />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
