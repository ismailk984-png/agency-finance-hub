import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Package, Plus, Building2, Loader2, Puzzle, Search } from 'lucide-react';
import { toast } from 'sonner';

interface AddonRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  billing_type: string;
  active: boolean;
  activation_count: number;
}

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

interface TenantAddon {
  addon_id: string;
  addon_name: string;
  addon_slug: string;
  is_active: boolean | null;
  activated_at: string | null;
  activated_by: string | null;
}

export default function AdminAddons() {
  const [addons, setAddons] = useState<AddonRow[]>([]);
  const [tenants, setTenants] = useState<TenantRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [tenantOpen, setTenantOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<TenantRow | null>(null);
  const [tenantAddons, setTenantAddons] = useState<TenantAddon[]>([]);
  const [tenantAddonsLoading, setTenantAddonsLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({
    name: '', slug: '', description: '', category: 'feature', price: '0', billing_type: 'one_time',
  });
  const [submitting, setSubmitting] = useState(false);

  const loadAddons = async () => {
    const { data } = await supabase.rpc('admin_list_addons');
    if (data) setAddons(data as unknown as AddonRow[]);
  };

  const loadTenants = async () => {
    const { data } = await supabase.rpc('admin_list_tenants');
    if (data) setTenants(data as unknown as TenantRow[]);
  };

  useEffect(() => {
    Promise.all([loadAddons(), loadTenants()]).then(() => setLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!form.name.trim() || !form.slug.trim()) {
      toast.error('Name and slug are required');
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.rpc('admin_create_addon', {
      _name: form.name,
      _slug: form.slug,
      _description: form.description,
      _category: form.category,
      _price: Number(form.price),
      _billing_type: form.billing_type,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Add-on created');
    setForm({ name: '', slug: '', description: '', category: 'feature', price: '0', billing_type: 'one_time' });
    setCreateOpen(false);
    loadAddons();
  };

  const openTenantAddons = async (tenant: TenantRow) => {
    setSelectedTenant(tenant);
    setTenantOpen(true);
    setTenantAddonsLoading(true);
    const { data } = await supabase.rpc('admin_tenant_addons', { _tenant_id: tenant.id });
    if (data) setTenantAddons(data as unknown as TenantAddon[]);
    setTenantAddonsLoading(false);
  };

  const toggleAddon = async (addonId: string, currentlyActive: boolean) => {
    if (!selectedTenant) return;
    if (currentlyActive) {
      const { error } = await supabase.rpc('admin_deactivate_addon', {
        _tenant_id: selectedTenant.id,
        _addon_id: addonId,
      });
      if (error) { toast.error(error.message); return; }
      toast.success('Add-on deactivated');
    } else {
      const { error } = await supabase.rpc('admin_activate_addon', {
        _tenant_id: selectedTenant.id,
        _addon_id: addonId,
        _activated_by: 'manual',
      });
      if (error) { toast.error(error.message); return; }
      toast.success('Add-on activated');
    }
    // Refresh
    const { data } = await supabase.rpc('admin_tenant_addons', { _tenant_id: selectedTenant.id });
    if (data) setTenantAddons(data as unknown as TenantAddon[]);
    loadAddons();
  };

  const filteredTenants = tenants.filter(t =>
    t.company_name.toLowerCase().includes(search.toLowerCase()) ||
    t.owner_email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <p className="text-muted-foreground">Loading…</p>;

  return (
    <div className="space-y-8">
      {/* Add-ons catalog */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Add-ons</h1>
            <p className="text-muted-foreground text-sm mt-1">Manage premium features. Activate per tenant below.</p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button size="sm"><Plus className="h-4 w-4 mr-1" />New Add-on</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader><DialogTitle>Create Add-on Feature</DialogTitle></DialogHeader>
              <div className="space-y-3 mt-2">
                <div>
                  <Label>Name</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Custom Invoices" />
                </div>
                <div>
                  <Label>Slug (unique identifier)</Label>
                  <Input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))} placeholder="custom-invoices" />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="What this add-on does…" rows={3} />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>Category</Label>
                    <Select value={form.category} onValueChange={v => setForm(f => ({ ...f, category: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="feature">Feature</SelectItem>
                        <SelectItem value="api">API</SelectItem>
                        <SelectItem value="branding">Branding</SelectItem>
                        <SelectItem value="module">Module</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Price (₹)</Label>
                    <Input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
                  </div>
                  <div>
                    <Label>Billing</Label>
                    <Select value={form.billing_type} onValueChange={v => setForm(f => ({ ...f, billing_type: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="one_time">One-time</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Button className="w-full" onClick={handleCreate} disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Create Add-on
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {addons.length === 0 ? (
          <Card><CardContent className="py-10 text-center text-muted-foreground">No add-ons created yet.</CardContent></Card>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {addons.map(a => (
              <Card key={a.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                      <Puzzle className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{a.name}</h3>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-2">{a.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline" className="text-[10px]">{a.category}</Badge>
                        <Badge variant="secondary" className="text-[10px]">
                          ₹{a.price.toLocaleString()}{a.billing_type === 'monthly' ? '/mo' : ''}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground ml-auto">{Number(a.activation_count)} tenant{Number(a.activation_count) !== 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Tenant list - click to manage add-ons */}
      <div>
        <h2 className="text-lg font-bold tracking-tight mb-1">Activate per Tenant</h2>
        <p className="text-muted-foreground text-sm mb-4">Click a tenant to toggle their add-ons.</p>

        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search tenants…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <div className="space-y-2">
          {filteredTenants.map(t => (
            <Card key={t.id} className="cursor-pointer hover:border-primary/30 transition-colors" onClick={() => openTenantAddons(t)}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm">{t.company_name}</h3>
                  <p className="text-[11px] text-muted-foreground">{t.owner_email} · {t.subscription_plan}</p>
                </div>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Tenant add-ons dialog */}
      <Dialog open={tenantOpen} onOpenChange={setTenantOpen}>
        <DialogContent className="sm:max-w-md">
          {selectedTenant && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {selectedTenant.company_name} — Add-ons
                </DialogTitle>
              </DialogHeader>
              {tenantAddonsLoading ? (
                <div className="flex justify-center py-8"><Loader2 className="h-5 w-5 animate-spin text-primary" /></div>
              ) : tenantAddons.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4">No add-ons available. Create one first.</p>
              ) : (
                <div className="space-y-3 mt-2">
                  {tenantAddons.map(ta => (
                    <div key={ta.addon_id} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <p className="text-sm font-medium">{ta.addon_name}</p>
                        <p className="text-[11px] text-muted-foreground">{ta.addon_slug}</p>
                        {ta.is_active && ta.activated_at && (
                          <p className="text-[10px] text-primary mt-0.5">
                            Active since {new Date(ta.activated_at).toLocaleDateString()} · {ta.activated_by}
                          </p>
                        )}
                      </div>
                      <Switch
                        checked={!!ta.is_active}
                        onCheckedChange={() => toggleAddon(ta.addon_id, !!ta.is_active)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
