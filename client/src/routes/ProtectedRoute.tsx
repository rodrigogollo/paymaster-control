import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user';
import { type PropsWithChildren } from 'react';
import { Navigate } from 'react-router';

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User['role'][];
};
export default function ProtectedRoute({
  allowedRoles = ['admin', 'manager', 'viewer'],
  children,
}: ProtectedRouteProps) {
  const { currentUser, authPromise } = useAuth();

  if (authPromise) {
    throw authPromise;
  }

  if (currentUser === null) {
    return <Navigate to='/signin' replace />;
  }

  if (currentUser && allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to='/' replace />;
  }

  return <>{children}</>;
}
