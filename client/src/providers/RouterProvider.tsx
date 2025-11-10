import App from '@/App';
import LoginPage from '@/pages/Login';
import SignupPage from '@/pages/SignUp';
import ProtectedRoute from '@/routes/ProtectedRoute';
import { createBrowserRouter } from 'react-router';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/signin',
    element: <LoginPage />,
  },
  {
    path: '/signup',
    element: <SignupPage />,
  },
  {
    path: '/protected',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <div>protected</div>
      </ProtectedRoute>
    ),
  },
]);

export default router;
