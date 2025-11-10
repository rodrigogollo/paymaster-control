import { useAuth } from '@/hooks/useAuth';
import type { User } from '@/types/user';
import type { PropsWithChildren } from 'react';

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User['role'][];
};
export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { currentUser } = useAuth();

  // TODO: Use Suspense or redirect
  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  // TODO: Redirect instead of rendering
  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    return <div>Permission denied</div>;
  }

  return children;
}
