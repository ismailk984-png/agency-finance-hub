import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard, Building2, Users, Settings, LogOut, Shield, ArrowLeft, LifeBuoy, Puzzle,
} from 'lucide-react';

const adminNav = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Tenants', url: '/admin/tenants', icon: Building2 },
  { title: 'Users', url: '/admin/users', icon: Users },
  { title: 'Tickets', url: '/admin/tickets', icon: LifeBuoy },
  { title: 'Settings', url: '/admin/settings', icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAdminAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-destructive text-destructive-foreground">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight">AgencyOS</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {adminNav.map(item => {
            const isActive = location.pathname === item.url;
            return (
              <button
                key={item.url}
                onClick={() => navigate(item.url)}
                className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={() => navigate('/')}>
            <ArrowLeft className="h-4 w-4" />
            Back to Site
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
          {user && (
            <p className="text-[10px] text-muted-foreground text-center truncate">{user.email}</p>
          )}
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 h-14 flex items-center border-b bg-background/80 backdrop-blur-sm px-6">
          <h2 className="text-sm font-semibold text-foreground">
            {adminNav.find(n => n.url === location.pathname)?.title || 'Admin'}
          </h2>
        </header>
        <main className="flex-1 p-6 overflow-auto">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
