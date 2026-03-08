import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext, TenantRole } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface Props {
  children: React.ReactNode;
  allowedRoles?: TenantRole[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user, loading, profile, tenant, roles } = useAuthContext();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  // Allow access to onboarding
  if (location.pathname === '/onboarding') return <>{children}</>;

  // Redirect to onboarding if no profile or onboarding not completed
  if (!profile || !profile.onboarding_completed) {
    return <Navigate to="/onboarding" replace />;
  }

  // Check subscription status (skip for billing page)
  if (location.pathname !== '/billing' && tenant) {
    const status = tenant.subscription_status;
    if (status === 'canceled' || status === 'inactive') {
      return <Navigate to="/billing" replace />;
    }
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.some(r => roles.includes(r))) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
