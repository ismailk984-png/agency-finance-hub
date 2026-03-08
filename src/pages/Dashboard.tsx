import {
  demoClients, demoEmployees, demoSettings, demoFixedExpenses, demoContracts,
  derivePools, calcClientMargin, fmt, fmtPct,
} from '@/lib/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  AlertTriangle, Users, TrendingUp, ArrowUpRight, ArrowDownRight,
  Banknote, Film, Image, MessageSquare, Briefcase,
} from 'lucide-react';

export default function Dashboard() {
  const clients = demoClients;
  const employees = demoEmployees;
  const settings = demoSettings;

  const pools = derivePools(employees, clients, settings);
  const activeClients = clients.filter(c => c.active);

  const totalRevenue = activeClients.reduce((s, c) => s + c.current_retainer, 0);
  const totalSalaryPools =
    pools.editor_salary_pool + pools.designer_salary_pool +
    pools.account_mgmt_salary_pool + pools.ads_salary_pool +
    pools.admin_support_salary_pool + pools.videographer_salary_pool +
    pools.cgi_ai_salary_pool + pools.production_mgr_salary_pool +
    pools.founder_salary_pool;

  const committedReels = activeClients.reduce((s, c) => s + c.reels_per_month, 0);
  const committedStatics = activeClients.reduce((s, c) => s + c.statics_per_month, 0);
  const committedStories = activeClients.reduce((s, c) => s + c.stories_per_month, 0);
  const storiesClients = activeClients.filter(c => c.stories_per_month > 0).length;
  const totalStoriesCost = storiesClients * pools.base_mgmt_cost_per_client * (settings.stories_factor_percent / 100);
  const perStoryCost = committedStories > 0 ? totalStoriesCost / committedStories : 0;

  const utilizationReels = pools.reel_capacity_monthly > 0 ? (committedReels / pools.reel_capacity_monthly) * 100 : 0;
  const utilizationStatics = pools.static_capacity_monthly > 0 ? (committedStatics / pools.static_capacity_monthly) * 100 : 0;

  const clientCalcs = activeClients.map(c => ({ ...c, calc: calcClientMargin(c, pools, settings) }));
  const clientsBelowMargin = clientCalcs.filter(c => c.calc.margin_percent !== null && c.calc.margin_percent < settings.target_margin_percent);

  const today = new Date();
  const expiringContracts = demoContracts.filter(c => {
    if (c.status !== 'active' || !c.end_date) return false;
    const days = Math.ceil((new Date(c.end_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return days >= 0 && days <= 45;
  });

  const alerts: string[] = [];
  if (expiringContracts.length > 0) {
    const names = expiringContracts.map(c => {
      const days = Math.ceil((new Date(c.end_date!).getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return `${c.client_name} (${days}d)`;
    }).join(', ');
    alerts.push(`📋 Contract expiring soon: ${names}`);
  }
  if (utilizationReels > 85) alerts.push('Reel capacity running high — consider hiring.');
  if (utilizationStatics > 85) alerts.push('Static capacity running high — consider hiring.');
  if (clientsBelowMargin.length > 0) alerts.push(`${clientsBelowMargin.length} client(s) below target margin.`);

  const overallMargin = totalRevenue > 0 ? ((totalRevenue - totalSalaryPools) / totalRevenue) * 100 : 0;

  // Fixed expense categories
  const categoryTotals = {
    office: demoFixedExpenses.filter(e => e.category === 'office_infrastructure').reduce((s, e) => s + e.amount, 0),
    software: demoFixedExpenses.filter(e => e.category === 'software_tools').reduce((s, e) => s + e.amount, 0),
    compliance: demoFixedExpenses.filter(e => e.category === 'compliance_legal').reduce((s, e) => s + e.amount, 0),
    financial: demoFixedExpenses.filter(e => e.category === 'financial_commitments').reduce((s, e) => s + e.amount, 0),
    admin: demoFixedExpenses.filter(e => e.category === 'core_admin_payroll').reduce((s, e) => s + e.amount, 0),
  };

  const revenueSegments = [
    { key: 'salaries', label: 'Team Salaries', amount: totalSalaryPools, color: 'hsl(var(--primary))' },
    { key: 'office', label: 'Office & Utilities', amount: categoryTotals.office, color: 'hsl(220, 70%, 55%)' },
    { key: 'software', label: 'Software & Tools', amount: categoryTotals.software, color: 'hsl(280, 60%, 55%)' },
    { key: 'admin', label: 'Admin Payroll', amount: categoryTotals.admin, color: 'hsl(30, 80%, 55%)' },
    { key: 'financial', label: 'Financial', amount: categoryTotals.financial, color: 'hsl(0, 65%, 55%)' },
    { key: 'compliance', label: 'Compliance', amount: categoryTotals.compliance, color: 'hsl(180, 50%, 45%)' },
  ];
  const totalCosts = revenueSegments.reduce((s, seg) => s + seg.amount, 0);
  const profitAmount = totalRevenue - totalCosts;
  const allSegments = [
    ...revenueSegments.filter(s => s.amount > 0),
    ...(totalRevenue > 0 ? [{ key: 'profit', label: profitAmount >= 0 ? 'Profit' : 'Loss', amount: profitAmount, color: profitAmount >= 0 ? 'hsl(142, 60%, 45%)' : 'hsl(0, 70%, 50%)' }] : []),
  ];
  const barTotal = totalRevenue > 0 ? totalRevenue : 1;

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-description">Agency performance overview — all metrics auto-update from employee & client data.</p>
        </div>

        {alerts.length > 0 && (
          <div className="space-y-2">
            {alerts.map((a, i) => (
              <div key={i} className="flex items-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3.5 text-sm text-destructive">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span className="font-medium">{a}</span>
              </div>
            ))}
          </div>
        )}

        {/* KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Monthly Revenue', value: fmt(totalRevenue), subtitle: `${activeClients.length} active clients`, icon: Banknote },
            { title: 'Total Salary Cost', value: fmt(totalSalaryPools), subtitle: `${employees.filter(e => e.active).length} employees`, icon: Users },
            { title: 'Gross Margin', value: fmtPct(overallMargin), subtitle: `Target: ${settings.target_margin_percent}%`, icon: TrendingUp, danger: overallMargin < settings.target_margin_percent },
            { title: 'Below-Margin Clients', value: String(clientsBelowMargin.length), subtitle: clientsBelowMargin.length > 0 ? 'Need pricing revision' : 'All on track', icon: AlertTriangle, danger: clientsBelowMargin.length > 0 },
          ].map(stat => (
            <Card key={stat.title} className="relative overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{stat.title}</p>
                    <p className={`text-2xl font-bold font-mono ${stat.danger ? 'text-destructive' : ''}`}>{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                  </div>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${stat.danger ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Per-Unit Costs */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Cost per Reel', value: fmt(pools.reel_internal_cost), sub: `${committedReels} / ${pools.reel_capacity_monthly} capacity`, icon: Film },
            { title: 'Cost per Static', value: fmt(pools.static_internal_cost), sub: `${committedStatics} / ${pools.static_capacity_monthly} capacity`, icon: Image },
            { title: 'Cost per Story', value: fmt(perStoryCost), sub: `${committedStories} stories`, icon: MessageSquare },
            { title: 'Mgmt Cost / Client', value: fmt(pools.base_mgmt_cost_per_client), sub: `${activeClients.length} clients`, icon: Briefcase },
          ].map(c => (
            <Card key={c.title} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <c.icon className="h-4 w-4" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{c.title}</p>
                </div>
                <p className="text-xl font-bold font-mono">{c.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{c.sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Team Utilization */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Team Utilization</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {[
              { label: 'Reel Editing', icon: Film, used: committedReels, capacity: pools.reel_capacity_monthly, pct: utilizationReels, members: pools.active_editors_count, role: 'editors' },
              { label: 'Static / Creative', icon: Image, used: committedStatics, capacity: pools.static_capacity_monthly, pct: utilizationStatics, members: pools.active_designers_count, role: 'designers' },
            ].map(row => (
              <div key={row.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <row.icon className="h-4 w-4 text-primary" />
                    <span className="font-medium">{row.label}</span>
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0">{row.members} {row.role}</Badge>
                  </div>
                  <span className="font-mono text-sm">
                    {row.used} / {row.capacity} <span className="text-muted-foreground">({fmtPct(row.pct)})</span>
                  </span>
                </div>
                <Progress value={Math.min(row.pct, 100)} className={`h-2.5 ${row.pct > 85 ? '[&>div]:bg-destructive' : row.pct > 70 ? '[&>div]:bg-yellow-500' : ''}`} />
              </div>
            ))}

            <div className="border-t pt-4 mt-2">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3">Team Allocation by Role</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { role: 'Editors', count: pools.active_editors_count, pool: pools.editor_salary_pool },
                  { role: 'Designers', count: pools.active_designers_count, pool: pools.designer_salary_pool },
                  { role: 'Campaign Managers', count: pools.active_account_mgmt_count, pool: pools.account_mgmt_salary_pool },
                  { role: 'Performance Marketing', count: pools.active_ads_count, pool: pools.ads_salary_pool },
                  { role: 'Videographers', count: pools.active_videographers_count, pool: pools.videographer_salary_pool },
                  { role: 'Admin Support', count: pools.active_admin_support_count, pool: pools.admin_support_salary_pool },
                  { role: 'Founders', count: pools.active_founders_count, pool: pools.founder_salary_pool },
                ].filter(r => r.count > 0).map(r => (
                  <div key={r.role} className="flex items-center justify-between rounded-lg border px-3 py-2.5">
                    <div>
                      <p className="text-sm font-medium">{r.role}</p>
                      <p className="text-xs text-muted-foreground">{r.count} member{r.count !== 1 ? 's' : ''}</p>
                    </div>
                    <p className="text-sm font-mono font-medium">{fmt(r.pool)}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Breakdown */}
        {totalRevenue > 0 && (
          <Card>
            <CardContent className="p-5">
              <div className="mb-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Revenue Breakdown</p>
                <p className="text-sm text-muted-foreground mt-0.5">Where your {fmt(totalRevenue)} monthly revenue goes</p>
              </div>
              <div className="flex h-10 rounded-lg overflow-hidden border">
                {allSegments.map(seg => {
                  const pct = (Math.abs(seg.amount) / barTotal) * 100;
                  if (pct < 0.5) return null;
                  return (
                    <Tooltip key={seg.key}>
                      <TooltipTrigger asChild>
                        <div className="h-full transition-all hover:opacity-80 cursor-help relative" style={{ width: `${pct}%`, backgroundColor: seg.color }}>
                          {pct > 6 && (
                            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow-sm">
                              {pct.toFixed(1)}%
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs p-3">
                        <p className="font-semibold">{seg.label}: {fmt(seg.amount)}</p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
                {allSegments.filter(s => (Math.abs(s.amount) / barTotal) * 100 >= 0.5).map(seg => (
                  <div key={seg.key} className="flex items-center gap-1.5 text-xs">
                    <div className="h-2.5 w-2.5 rounded-sm shrink-0" style={{ backgroundColor: seg.color }} />
                    <span className="text-muted-foreground">{seg.label}</span>
                    <span className="font-mono font-medium">{fmtPct((Math.abs(seg.amount) / totalRevenue) * 100)}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Below-Margin Clients */}
        {clientsBelowMargin.length > 0 && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <ArrowDownRight className="h-4 w-4 text-destructive" />
                Clients Below Target Margin
                <Badge variant="destructive" className="ml-auto text-xs">{clientsBelowMargin.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {clientsBelowMargin.map(c => (
                  <div key={c.id} className="flex items-center justify-between rounded-lg bg-destructive/5 border border-destructive/10 px-4 py-3">
                    <div>
                      <span className="text-sm font-semibold">{c.client_name}</span>
                      <span className="text-xs text-muted-foreground ml-2">({c.plan_type})</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Current</p>
                        <p className="font-mono font-medium">{fmt(c.current_retainer)}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground" />
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">Recommended</p>
                        <p className="font-mono font-semibold text-primary">{fmt(c.calc.recommended_retainer)}</p>
                      </div>
                      <Badge variant="destructive">{fmtPct(c.calc.margin_percent!)}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </TooltipProvider>
  );
}
