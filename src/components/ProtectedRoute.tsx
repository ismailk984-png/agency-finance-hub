import { Navigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import type { AppRole } from '@/contexts/AuthContext';

interface Props {
  children: React.ReactNode;
  allowedRoles?: AppRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { isAuthenticated, roles } = useAuthContext();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.some(r => roles.includes(r))) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
