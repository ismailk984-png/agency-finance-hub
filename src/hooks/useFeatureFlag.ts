import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext } from '@/contexts/AuthContext';

interface AddonInfo {
  addon_id: string;
  slug: string;
  name: string;
  active: boolean;
}

export function useFeatureFlag(slug: string): { enabled: boolean; loading: boolean } {
  const { tenant } = useAuthContext();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!tenant?.id) { setLoading(false); return; }

    supabase.rpc('tenant_has_addon', { _tenant_id: tenant.id, _addon_slug: slug })
      .then(({ data }) => {
        setEnabled(!!data);
        setLoading(false);
      });
  }, [tenant?.id, slug]);

  return { enabled, loading };
}

export function useTenantAddons() {
  const { tenant } = useAuthContext();
  const [addons, setAddons] = useState<AddonInfo[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!tenant?.id) return;
    const { data: allAddons } = await supabase
      .from('addon_features')
      .select('id, name, slug')
      .eq('active', true);

    const { data: myAddons } = await supabase
      .from('tenant_addons')
      .select('addon_id, active')
      .eq('active', true);

    if (allAddons) {
      setAddons(allAddons.map((a: any) => ({
        addon_id: a.id,
        slug: a.slug,
        name: a.name,
        active: (myAddons || []).some((m: any) => m.addon_id === a.id && m.active),
      })));
    }
    setLoading(false);
  }, [tenant?.id]);

  useEffect(() => { load(); }, [load]);

  return { addons, loading, refresh: load };
}
