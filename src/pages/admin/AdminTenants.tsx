import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Building2, Ban, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TenantRow {
  id: string;
  company_name: string;
  slug: string;
  subscription_plan: string;
  subscription_status: string;
  owner_email: string;
  member_count: number;
  trial_ends_at: string | null;
  created_at: string;
}

export default function AdminTenants() {
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.rpc('admin_list_tenants');
    if (data) setTenants(data as unknown as TenantRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleSuspend = async (id: string) => {
    const { error } = await supabase.rpc('admin_suspend_tenant', { _tenant_id: id });
    if (error) toast.error(error.message);
    else { toast.success('Tenant suspended'); load(); }
  };

  const handleActivate = async (id: string) => {
    const { error } = await supabase.rpc('admin_activate_tenant', { _tenant_id: id });
    if (error) toast.error(error.message);
    else { toast.success('Tenant activated'); load(); }
  };

  const handlePlanChange = async (id: string, plan: string) => {
    const { error } = await supabase.rpc('admin_update_tenant_plan', {
      _tenant_id: id,
      _plan: plan,
    });
    if (error) toast.error(error.message);
    else { toast.success('Plan updated'); load(); }
  };

  const statusColor = (s: string) => {
    switch (s) {
      case 'active': return 'default';
      case 'trialing': return 'secondary';
      case 'past_due': return 'destructive';
      case 'canceled':
      case 'inactive': return 'destructive';
      default: return 'outline';
    }
  };

  if (loading) return <p className="text-muted-foreground">Loading tenants…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">All Tenants</h1>
        <p className="text-muted-foreground text-sm mt-1">{tenants.length} registered agencies. Only metadata shown — no business data access.</p>
      </div>

      <div className="space-y-3">
        {tenants.map(t => (
          <Card key={t.id}>
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{t.company_name}</h3>
                    <p className="text-xs text-muted-foreground">{t.owner_email || 'No owner'} · {t.member_count} member{Number(t.member_count) !== 1 ? 's' : ''}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Joined: {new Date(t.created_at).toLocaleDateString()}
                      {t.trial_ends_at && t.subscription_status === 'trialing' && (
                        <> · Trial ends: {new Date(t.trial_ends_at).toLocaleDateString()}</>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <Badge variant={statusColor(t.subscription_status) as any}>
                    {t.subscription_status}
                  </Badge>

                  <Select value={t.subscription_plan} onValueChange={v => handlePlanChange(t.id, v)}>
                    <SelectTrigger className="w-28 h-8 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="starter">Starter</SelectItem>
                      <SelectItem value="growth">Growth</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                    </SelectContent>
                  </Select>

                  {t.subscription_status === 'inactive' || t.subscription_status === 'canceled' ? (
                    <Button size="sm" variant="outline" onClick={() => handleActivate(t.id)}>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Activate
                    </Button>
                  ) : (
                    <Button size="sm" variant="destructive" onClick={() => handleSuspend(t.id)}>
                      <Ban className="h-3.5 w-3.5 mr-1" />
                      Suspend
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {tenants.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              No tenants registered yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
