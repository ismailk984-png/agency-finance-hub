import {
  demoClients, demoEmployees, demoSettings, demoFixedExpenses,
  derivePools, fmt, fmtPct,
} from '@/lib/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown, TrendingUp, Banknote } from 'lucide-react';

export default function FounderDashboard() {
  const pools = derivePools(demoEmployees, demoClients, demoSettings);
  const activeClients = demoClients.filter(c => c.active);
  const totalRevenue = activeClients.reduce((s, c) => s + c.current_retainer, 0);
  const totalSalary = demoEmployees.filter(e => e.active).reduce((s, e) => s + e.monthly_salary * (1 + e.overhead_multiplier_percent / 100), 0);
  const totalFixed = demoFixedExpenses.reduce((s, e) => s + e.amount, 0);
  const totalCosts = totalSalary + totalFixed;
  const profit = totalRevenue - totalCosts;
  const margin = totalRevenue > 0 ? (profit / totalRevenue) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title flex items-center gap-2"><Crown className="h-6 w-6 text-primary" /> Founder's View</h1>
        <p className="page-description">High-level financial overview for founders</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: 'Revenue', value: fmt(totalRevenue), icon: Banknote },
          { title: 'Total Costs', value: fmt(totalCosts), icon: TrendingUp },
          { title: 'Net Profit', value: fmt(profit), icon: Crown, danger: profit < 0 },
          { title: 'Net Margin', value: fmtPct(margin), icon: TrendingUp, danger: margin < demoSettings.target_margin_percent },
        ].map(s => (
          <Card key={s.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{s.title}</p>
                  <p className={`text-2xl font-bold font-mono ${s.danger ? 'text-destructive' : ''}`}>{s.value}</p>
                </div>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${s.danger ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="text-base">Cost Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Team Salaries', amount: totalSalary },
              { label: 'Fixed Expenses', amount: totalFixed },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center rounded-lg border px-4 py-3">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="font-mono font-medium">{fmt(item.amount)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Key Metrics</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Active Clients', value: String(activeClients.length) },
              { label: 'Active Employees', value: String(demoEmployees.filter(e => e.active).length) },
              { label: 'Avg Revenue / Client', value: fmt(totalRevenue / (activeClients.length || 1)) },
              { label: 'Avg Cost / Employee', value: fmt(totalSalary / (demoEmployees.filter(e => e.active).length || 1)) },
            ].map(item => (
              <div key={item.label} className="flex justify-between items-center rounded-lg border px-4 py-3">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="font-mono font-medium">{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
