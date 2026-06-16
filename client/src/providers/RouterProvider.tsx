import DashboardPage from '@/pages/Dashboard';
import HomePage from '@/pages/Home';
import LoginPage from '@/pages/Login';
import LoginSuccess from '@/pages/LoginSuccess';
import SignupPage from '@/pages/SignUp';
import UsersPage from '@/pages/Users';
import ProtectedRoute from '@/routes/ProtectedRoute';
import PublicRoute from '@/routes/PublicRoute';
import DemoBanner from '@/shared/components/DemoBanner';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DemoBanner isDemo={false} />,
    children: [
      {
        path: '/',
        element: <PublicRoute />,
        children: [
          {
            path: '/',
            element: <HomePage />,
            index: true,
          },
          {
            path: '/signin',
            element: <LoginPage />,
          },
          {
            path: '/signup',
            element: <SignupPage />,
          },
        ],
      },
      {
        path: '/login-success',
        element: <LoginSuccess />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/users',
        element: (
          <ProtectedRoute>
            <UsersPage />
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
    ],
  },
]);

export default router;
