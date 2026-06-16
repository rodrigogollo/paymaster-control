import { useAuth } from '@/hooks/useAuth';
import { Navigate, Outlet } from 'react-router';

// type PublicRouteProps = {};

export default function PublicRoute() {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to='/dashboard' replace />;
  }

  return <Outlet />;
}
