import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const placeholderPage = (title: string, description: string) => () => (
  <div className="space-y-6">
    <div className="page-header">
      <h1 className="page-title">{title}</h1>
      <p className="page-description">{description}</p>
    </div>
    <Card>
      <CardContent className="p-12 text-center">
        <p className="text-muted-foreground">This page will be fully functional once connected to Lovable Cloud.</p>
        <Badge variant="outline" className="mt-4">Coming Soon</Badge>
      </CardContent>
    </Card>
  </div>
);

export const QuoteBuilder = placeholderPage('Quote Builder', 'Generate pricing quotes for clients');
export const SalaryDates = placeholderPage('Salary Dates', 'Track salary payment schedules');
export const ExpenseReport = placeholderPage('Expense Report', 'Comprehensive expense tracking and reporting');
export const MonthlyBilling = placeholderPage('Monthly Billing', 'Monthly financial overview and billing');
export const TaxPortal = placeholderPage('Tax Portal', 'Tax calculations and filing tracker');
export const Projects = placeholderPage('Projects', 'Track project deliverables and milestones');
export const AssignTasks = placeholderPage('Assign Tasks', 'Assign and manage team tasks');
export const EditorDashboard = placeholderPage('My Tasks', 'Your assigned tasks and deadlines');
export const TeamDashboard = placeholderPage('Team Dashboard', 'Team performance and workload overview');
export const Settings = placeholderPage('Settings', 'Configure agency parameters and calculations');
