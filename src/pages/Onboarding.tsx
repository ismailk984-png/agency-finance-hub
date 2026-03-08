import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap, Building2, Settings, Rocket, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PendingInvitation {
  id: string;
  tenant_id: string;
  company_name: string;
  role: string;
}

export default function Onboarding() {
  const { user, profile, refreshProfile } = useAuthContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [checkingInvite, setCheckingInvite] = useState(true);
  const [invitation, setInvitation] = useState<PendingInvitation | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [currencySymbol, setCurrencySymbol] = useState('₹');
  const [taxMode, setTaxMode] = useState('gst');
  const [targetMargin, setTargetMargin] = useState('40');
  const [businessType, setBusinessType] = useState('agency');

  // If profile exists and onboarding completed, redirect
  useEffect(() => {
    if (profile?.onboarding_completed) {
      navigate('/dashboard');
    }
  }, [profile, navigate]);

  // Check for pending invitation
  useEffect(() => {
    const check = async () => {
      if (!user) return;
      // If user already has a profile (joined via invitation function), skip to step 2
      if (profile) {
        setStep(2);
        setCheckingInvite(false);
        return;
      }
      try {
        const { data } = await supabase.rpc('check_pending_invitation');
        if (data) setInvitation(data as unknown as PendingInvitation);
      } catch (err) {
        console.error('Error checking invitation:', err);
      }
      setCheckingInvite(false);
    };
    check();
  }, [user, profile]);

  const handleStep1 = async () => {
    if (!fullName.trim()) { toast.error('Please enter your name'); return; }
    setLoading(true);
    try {
      if (invitation) {
        // Join existing tenant
        const { error } = await supabase.rpc('join_tenant_by_invitation', {
          _full_name: fullName.trim(),
        });
        if (error) throw error;
      } else {
        if (!companyName.trim()) { toast.error('Please enter company name'); setLoading(false); return; }
        const { error } = await supabase.rpc('setup_new_tenant', {
          _company_name: companyName.trim(),
          _full_name: fullName.trim(),
        });
        if (error) throw error;
      }
      await refreshProfile();
      if (invitation) {
        // Invited users skip settings, mark onboarding complete
        await supabase.rpc('complete_onboarding', {
          _currency: 'INR', _currency_symbol: '₹', _tax_mode: 'gst',
          _target_margin: 40, _business_type: 'agency',
        });
        await refreshProfile();
        navigate('/dashboard');
      } else {
        setStep(2);
      }
    } catch (err: any) {
      toast.error(err.message || 'Setup failed');
    }
    setLoading(false);
  };

  const handleStep2 = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.rpc('complete_onboarding', {
        _currency: currency,
        _currency_symbol: currencySymbol,
        _tax_mode: taxMode,
        _target_margin: Number(targetMargin),
        _business_type: businessType,
      });
      if (error) throw error;
      await refreshProfile();
      setStep(3);
    } catch (err: any) {
      toast.error(err.message || 'Failed to save settings');
    }
    setLoading(false);
  };

  if (checkingInvite) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const steps = [
    { icon: Building2, label: 'Company' },
    { icon: Settings, label: 'Settings' },
    { icon: Rocket, label: 'Launch' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b py-4 px-4">
        <div className="mx-auto max-w-2xl flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Zap className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold tracking-tight">AgencyOS</span>
        </div>
      </div>

      {/* Steps indicator */}
      <div className="py-6 px-4">
        <div className="mx-auto max-w-2xl flex items-center justify-center gap-8">
          {steps.map((s, i) => (
            <div key={s.label} className={`flex items-center gap-2 text-sm ${i + 1 <= step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>
              <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${i + 1 <= step ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                {i + 1}
              </div>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-4 py-4">
        {step === 1 && (
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>
                {invitation ? `Join ${invitation.company_name}` : 'Set Up Your Agency'}
              </CardTitle>
              <CardDescription>
                {invitation
                  ? `You've been invited to join as ${invitation.role}. Enter your name to continue.`
                  : 'Tell us about your agency to get started.'}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Your Full Name</Label>
                <Input id="fullName" placeholder="John Doe" value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
              {!invitation && (
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input id="companyName" placeholder="Acme Agency" value={companyName} onChange={e => setCompanyName(e.target.value)} />
                </div>
              )}
              <Button className="w-full" onClick={handleStep1} disabled={loading}>
                {loading ? 'Setting up…' : 'Continue'}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Configure Your Workspace</CardTitle>
              <CardDescription>Set your default financial parameters. You can change these later.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value={currency} onValueChange={v => {
                    setCurrency(v);
                    setCurrencySymbol(v === 'INR' ? '₹' : v === 'USD' ? '$' : v === 'EUR' ? '€' : v === 'GBP' ? '£' : v);
                  }}>
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
                  <Select value={taxMode} onValueChange={setTaxMode}>
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
                  <Input type="number" value={targetMargin} onChange={e => setTargetMargin(e.target.value)} min={0} max={100} />
                </div>
                <div className="space-y-2">
                  <Label>Business Type</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
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
              <Button className="w-full" onClick={handleStep2} disabled={loading}>
                {loading ? 'Saving…' : 'Complete Setup'}
              </Button>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card className="w-full max-w-lg text-center">
            <CardContent className="p-8 space-y-4">
              <div className="flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Rocket className="h-8 w-8" />
                </div>
              </div>
              <h2 className="text-2xl font-bold">You're All Set!</h2>
              <p className="text-muted-foreground">
                Your workspace is ready. Start by adding your clients, employees, and expenses.
              </p>
              <Button size="lg" onClick={() => navigate('/dashboard')}>
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
