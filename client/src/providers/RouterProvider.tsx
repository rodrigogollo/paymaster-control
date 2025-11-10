import App from '@/App';
import LoginPage from '@/pages/Login';
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
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
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
