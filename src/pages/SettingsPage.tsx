import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { profile, tenant, roles, refreshProfile } = useAuthContext();
  const isAdmin = roles.includes('owner') || roles.includes('admin');

  // Company settings
  const [companyName, setCompanyName] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [taxMode, setTaxMode] = useState('gst');
  const [targetMargin, setTargetMargin] = useState('40');
  const [businessType, setBusinessType] = useState('agency');
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Profile settings
  const [fullName, setFullName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    if (tenant) setCompanyName(tenant.company_name);
    if (profile) setFullName(profile.full_name);
    loadSettings();
  }, [tenant, profile]);

  const loadSettings = async () => {
    if (!profile) return;
    const { data } = await supabase.from('tenant_settings').select('*').eq('tenant_id', profile.tenant_id).single();
    if (data) {
      const d = data as any;
      setCurrency(d.currency);
      setCurrencySymbol(d.currency_symbol);
      setTaxMode(d.tax_mode);
      setTargetMargin(String(d.target_margin_percent));
      setBusinessType(d.business_type);
    }
  };

  const saveCompany = async () => {
    if (!isAdmin || !tenant) return;
    setSettingsLoading(true);
    try {
      await supabase.from('tenants').update({ company_name: companyName }).eq('id', tenant.id);
      await supabase.from('tenant_settings').update({
        currency, currency_symbol: currencySymbol, tax_mode: taxMode,
        target_margin_percent: Number(targetMargin), business_type: businessType,
      }).eq('tenant_id', tenant.id);
      await refreshProfile();
      toast.success('Company settings saved');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    }
    setSettingsLoading(false);
  };

  const saveProfile = async () => {
    setProfileLoading(true);
    try {
      await supabase.from('profiles').update({ full_name: fullName }).eq('id', profile!.id);
      if (newPassword.length >= 6) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
        setNewPassword('');
      }
      await refreshProfile();
      toast.success('Profile updated');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save');
    }
    setProfileLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-description">Manage your workspace and account settings.</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Company Settings</CardTitle>
              <CardDescription>
                {isAdmin ? 'Configure your agency workspace.' : 'Only admins can modify these settings.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input value={companyName} onChange={e => setCompanyName(e.target.value)} disabled={!isAdmin} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={currency} onValueChange={v => {
                    setCurrency(v);
                    setCurrencySymbol(v === 'INR' ? '₹' : v === 'USD' ? '$' : v === 'EUR' ? '€' : v === 'GBP' ? '£' : v);
                  }} disabled={!isAdmin}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tax Mode</Label>
                  <Select value={taxMode} onValueChange={setTaxMode} disabled={!isAdmin}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gst">GST</SelectItem>
                      <SelectItem value="vat">VAT</SelectItem>
                      <SelectItem value="sales_tax">Sales Tax</SelectItem>
                      <SelectItem value="none">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Target Margin (%)</Label>
                  <Input type="number" value={targetMargin} onChange={e => setTargetMargin(e.target.value)} disabled={!isAdmin} />
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType} disabled={!isAdmin}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agency">Marketing Agency</SelectItem>
                      <SelectItem value="creative_studio">Creative Studio</SelectItem>
                      <SelectItem value="consultancy">Consultancy</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {isAdmin && (
                <Button onClick={saveCompany} disabled={settingsLoading}>
                  {settingsLoading ? 'Saving…' : 'Save Changes'}
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="account" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Input value={profile?.email || ''} disabled />
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Leave blank to keep current" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
              </div>
              <Button onClick={saveProfile} disabled={profileLoading}>
                {profileLoading ? 'Saving…' : 'Update Profile'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
