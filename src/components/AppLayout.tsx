import { Outlet, useLocation } from 'react-router-dom';
import { AppSidebar } from '@/components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/employees': 'Employees',
  '/clients': 'Monthly Retainer',
  '/settings': 'Settings',
  '/quote': 'Quote Builder',
  '/fixed-expenses': 'Fixed Expenses',
  '/vendors': 'Vendors',
  '/founders': "Founder's View",
  '/monthly-billing': 'Monthly Billing',
  '/contracts': 'Contracts',
  '/salary-dates': 'Salary Dates',
  '/expense-report': 'Expense Report',
  '/projects': 'Projects',
  '/assign-tasks': 'Assign Tasks',
  '/editor-dashboard': 'My Tasks',
  '/team-dashboard': 'Team Dashboard',
  '/team': 'Team Management',
  '/billing': 'Billing & Subscription',
};

export default function AppLayout() {
  const location = useLocation();
  const title = pageTitles[location.pathname] || 'AgencyOS';

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-40 flex h-14 items-center gap-3 border-b bg-background/80 backdrop-blur-sm px-4 lg:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <h2 className="text-sm font-semibold text-foreground">{title}</h2>
          </header>
          <main className="flex-1 p-4 lg:p-6 overflow-auto">
            <div className="mx-auto max-w-7xl">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
