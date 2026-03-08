import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/contexts/AuthContext';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Puzzle, CheckCircle2, Lock, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

interface AddonDisplay {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  billing_type: string;
  is_active: boolean;
}

export default function AddonsMarketplace() {
  const { tenant } = useAuthContext();
  const [addons, setAddons] = useState<AddonDisplay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant?.id) return;

    const load = async () => {
      const { data: allAddons } = await supabase
        .from('addon_features')
        .select('*')
        .eq('active', true)
        .order('name');

      const { data: myAddons } = await supabase
        .from('tenant_addons')
        .select('addon_id, active')
        .eq('active', true);

      if (allAddons) {
        setAddons(allAddons.map((a: any) => ({
          id: a.id,
          name: a.name,
          slug: a.slug,
          description: a.description,
          category: a.category,
          price: a.price,
          billing_type: a.billing_type,
          is_active: (myAddons || []).some((m: any) => m.addon_id === a.id && m.active),
        })));
      }
      setLoading(false);
    };
    load();
  }, [tenant?.id]);

  const handleRequest = (addon: AddonDisplay) => {
    toast.info(`To activate "${addon.name}", please contact our team via the Support page.`);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );

  const activeAddons = addons.filter(a => a.is_active);
  const availableAddons = addons.filter(a => !a.is_active);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add-ons</h1>
        <p className="text-sm text-muted-foreground mt-1">Premium features to supercharge your agency workflow.</p>
      </div>

      {/* Active add-ons */}
      {activeAddons.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Your Active Add-ons</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {activeAddons.map(a => (
              <Card key={a.id} className="border-primary/20 bg-primary/[0.02]">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{a.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-[10px]">Active</Badge>
                        <Badge variant="outline" className="text-[10px]">{a.category}</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Available add-ons */}
      {availableAddons.length > 0 && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            {activeAddons.length > 0 ? 'Available Add-ons' : 'Premium Add-ons'}
          </h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableAddons.map(a => (
              <Card key={a.id} className="hover:border-primary/20 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted shrink-0">
                      <Puzzle className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm">{a.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{a.description}</p>
                      <div className="flex items-center gap-2 mt-3">
                        <Badge variant="secondary" className="text-[10px]">
                          ₹{a.price.toLocaleString()}{a.billing_type === 'monthly' ? '/mo' : ''}
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">{a.category}</Badge>
                      </div>
                      <Button size="sm" variant="outline" className="w-full mt-3 text-xs" onClick={() => handleRequest(a)}>
                        <Sparkles className="h-3 w-3 mr-1.5" />
                        Request Activation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {addons.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Lock className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-muted-foreground">No add-ons available yet. Check back soon!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
