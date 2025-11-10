import App from '@/App';
import DashboardPage from '@/pages/Dashboard';
import LoginPage from '@/pages/Login';
import LoginSuccess from '@/pages/LoginSuccess';
import SignupPage from '@/pages/SignUp';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/login-success',
    element: <LoginSuccess />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: '/users',
    element: (
      <ProtectedRoute allowedRoles={['admin', 'manager']}>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
        <div>Users</div>
      </ProtectedRoute>
    ),
  },
  {
    path: '/projects',
    element: (
      <ProtectedRoute>
        <div>Projects</div>
      </ProtectedRoute>
    ),
  },
]);

export default router;
