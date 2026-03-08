import {
  LayoutDashboard, Briefcase, Settings, FileText, Zap, Landmark, Store,
  Crown, LogOut, BarChart3, Receipt, ScrollText, Users, CalendarDays,
  ClipboardList, Monitor, CreditCard, UserPlus, LifeBuoy,
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NavLink } from '@/components/NavLink';
import { useAuthContext } from '@/contexts/AuthContext';
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarHeader, SidebarFooter, useSidebar,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

const navItems = [
  { title: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
  { title: 'Monthly Retainer', url: '/clients', icon: Briefcase },
  { title: 'Projects', url: '/projects', icon: FileText },
  { title: 'Employees', url: '/employees', icon: Users },
  { title: 'Fixed Expenses', url: '/fixed-expenses', icon: Landmark },
  { title: 'Quote Builder', url: '/quote', icon: FileText },
  { title: 'Vendors', url: '/vendors', icon: Store },
  { title: "Founder's View", url: '/founders', icon: Crown },
  { title: 'Contracts', url: '/contracts', icon: ScrollText },
  { title: 'Salary Dates', url: '/salary-dates', icon: CalendarDays },
  { title: 'Expense Report', url: '/expense-report', icon: BarChart3 },
  { title: 'Monthly Billing', url: '/monthly-billing', icon: Receipt },
  { title: 'Assign Tasks', url: '/assign-tasks', icon: ClipboardList },
  { title: 'My Tasks', url: '/editor-dashboard', icon: Monitor },
  { title: 'Team Dashboard', url: '/team-dashboard', icon: Users },
];

const systemNav = [
  { title: 'Team', url: '/team', icon: UserPlus },
  { title: 'Billing', url: '/billing', icon: CreditCard },
  { title: 'Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useSidebar();
  const collapsed = state === 'collapsed';
  const { signOut, profile, tenant } = useAuthContext();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const renderGroup = (label: string, items: typeof navItems) => (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.url}>
              <SidebarMenuButton
                asChild
                isActive={location.pathname === item.url}
                tooltip={item.title}
              >
                <NavLink to={item.url} end className="transition-colors" activeClassName="font-medium">
                  <item.icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="px-3 py-4">
        <button
          className="flex items-center gap-2.5 w-full rounded-lg px-1.5 py-1 hover:bg-sidebar-accent transition-colors text-left"
          onClick={() => navigate('/dashboard')}
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-bold tracking-tight truncate">
                {tenant?.company_name || 'AgencyOS'}
              </span>
              <span className="text-[10px] text-sidebar-muted-foreground uppercase tracking-widest">Finance</span>
            </div>
          )}
        </button>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup('Navigation', navItems)}
        {renderGroup('System', systemNav)}
      </SidebarContent>
      <SidebarFooter className="px-4 py-3">
        {profile && !collapsed && (
          <div className="mb-2 px-1">
            <p className="text-xs font-medium truncate">{profile.full_name}</p>
            <p className="text-[10px] text-sidebar-muted-foreground truncate">{profile.email}</p>
          </div>
        )}
        {!collapsed && (
          <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        )}
        {!collapsed && (
          <p className="text-[10px] text-sidebar-muted-foreground text-center mt-1">
            © 2026 AgencyOS
          </p>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
