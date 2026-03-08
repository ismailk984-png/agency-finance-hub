import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, Users, TrendingUp, BarChart3 } from 'lucide-react';

interface Stats {
  total_tenants: number;
  active_tenants: number;
  total_users: number;
  plan_breakdown: Record<string, number>;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.rpc('admin_get_stats');
      if (data) setStats(data as unknown as Stats);
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <p className="text-muted-foreground">Loading stats…</p>;

  const kpis = [
    { title: 'Total Tenants', value: stats?.total_tenants ?? 0, icon: Building2 },
    { title: 'Active / Trialing', value: stats?.active_tenants ?? 0, icon: TrendingUp },
    { title: 'Total Users', value: stats?.total_users ?? 0, icon: Users },
    { title: 'Plans', value: Object.keys(stats?.plan_breakdown ?? {}).length, icon: BarChart3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Overview</h1>
        <p className="text-muted-foreground text-sm mt-1">Monitor your SaaS platform health. No customer business data is shown here.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map(kpi => (
          <Card key={kpi.title}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{kpi.title}</p>
                  <p className="text-3xl font-bold font-mono">{kpi.value}</p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Plan breakdown */}
      {stats?.plan_breakdown && Object.keys(stats.plan_breakdown).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subscription Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 sm:grid-cols-3">
              {Object.entries(stats.plan_breakdown).map(([plan, count]) => (
                <div key={plan} className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <span className="text-sm font-medium capitalize">{plan}</span>
                  <span className="text-lg font-bold font-mono">{count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
