import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';
import { CreditCard, Calendar, Zap } from 'lucide-react';

export default function BillingPage() {
  const { tenant } = useAuthContext();
  const plan = PLAN_LIMITS[tenant?.subscription_plan as keyof typeof PLAN_LIMITS] || PLAN_LIMITS.starter;
  const status = tenant?.subscription_status || 'trialing';

  const statusColor = {
    trialing: 'secondary',
    active: 'default',
    past_due: 'destructive',
    canceled: 'destructive',
    inactive: 'destructive',
  }[status] || 'outline';

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Billing & Subscription</h1>
        <p className="page-description">Manage your subscription plan and billing.</p>
      </div>

      {/* Current Plan */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Zap className="h-4 w-4" />
            Current Plan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">{plan.label}</p>
              <p className="text-sm text-muted-foreground">{plan.description}</p>
              <div className="flex items-center gap-3 mt-2">
                <Badge variant={statusColor as any}>{status}</Badge>
                <span className="text-lg font-mono font-bold">{fmt(plan.price)}/mo</span>
              </div>
            </div>
          </div>
          {tenant?.trial_ends_at && status === 'trialing' && (
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              Trial ends: {new Date(tenant.trial_ends_at).toLocaleDateString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Plan Comparison */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Available Plans</CardTitle>
          <CardDescription>Upgrade to unlock more features.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {(['starter', 'growth', 'pro'] as const).map(key => {
              const p = PLAN_LIMITS[key];
              const isCurrent = tenant?.subscription_plan === key;
              return (
                <div key={key} className={`rounded-lg border p-4 ${isCurrent ? 'border-primary bg-primary/5' : ''}`}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{p.label}</h3>
                    {isCurrent && <Badge>Current</Badge>}
                  </div>
                  <p className="text-2xl font-bold font-mono">{fmt(p.price)}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                  <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                    <li>{p.maxClients === Infinity ? 'Unlimited' : p.maxClients} clients</li>
                    <li>{p.maxEmployees === Infinity ? 'Unlimited' : p.maxEmployees} employees</li>
                    <li>{p.fullReports ? 'Full' : 'Basic'} reports</li>
                  </ul>
                  {!isCurrent && (
                    <Button variant="outline" size="sm" className="w-full mt-3" disabled>
                      Upgrade — Stripe Coming Soon
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <CreditCard className="h-4 w-4" />
            Payment Method
          </CardTitle>
          <CardDescription>Stripe integration will be configured soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            No payment method on file. Stripe billing will be activated in a future update.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
