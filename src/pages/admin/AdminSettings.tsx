import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';

export default function AdminSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure platform-wide parameters.</p>
      </div>

      {/* Plan Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subscription Plans</CardTitle>
          <CardDescription>Current plan configurations. Pricing changes require code update.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {(['starter', 'growth', 'pro'] as const).map(key => {
              const p = PLAN_LIMITS[key];
              return (
                <div key={key} className="rounded-lg border p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">{p.label}</h3>
                    <Badge variant="outline">{fmt(p.price)}/mo</Badge>
                  </div>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>Max clients: {p.maxClients === Infinity ? '∞' : p.maxClients}</li>
                    <li>Max employees: {p.maxEmployees === Infinity ? '∞' : p.maxEmployees}</li>
                    <li>Full reports: {p.fullReports ? 'Yes' : 'No'}</li>
                  </ul>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Platform Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Platform Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Platform</span>
            <span className="font-medium">AgencyOS Finance</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Trial Period</span>
            <span className="font-medium">14 days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Billing</span>
            <span className="font-medium">Stripe (pending integration)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
