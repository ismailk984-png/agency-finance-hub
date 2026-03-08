
-- Master list of available add-on features
CREATE TABLE public.addon_features (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text NOT NULL DEFAULT '',
  category text NOT NULL DEFAULT 'feature',
  price numeric NOT NULL DEFAULT 0,
  billing_type text NOT NULL DEFAULT 'one_time',
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.addon_features ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view active add-ons
CREATE POLICY "select_active_addons" ON public.addon_features
  FOR SELECT TO authenticated USING (active = true);

-- Platform admins manage add-ons via functions

-- Tenant-specific activated add-ons
CREATE TABLE public.tenant_addons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  addon_id uuid NOT NULL REFERENCES public.addon_features(id) ON DELETE CASCADE,
  activated_by text NOT NULL DEFAULT 'manual',
  stripe_payment_id text,
  active boolean NOT NULL DEFAULT true,
  activated_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz,
  UNIQUE(tenant_id, addon_id)
);

ALTER TABLE public.tenant_addons ENABLE ROW LEVEL SECURITY;

-- Tenants can see their own add-ons
CREATE POLICY "select_own_addons" ON public.tenant_addons
  FOR SELECT USING (tenant_id = public.get_user_tenant_id(auth.uid()));

-- Function: check if tenant has a specific add-on
CREATE OR REPLACE FUNCTION public.tenant_has_addon(_tenant_id uuid, _addon_slug text)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path TO 'public' AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.tenant_addons ta
    JOIN public.addon_features af ON af.id = ta.addon_id
    WHERE ta.tenant_id = _tenant_id
      AND af.slug = _addon_slug
      AND ta.active = true
      AND (ta.expires_at IS NULL OR ta.expires_at > now())
  )
$$;

-- Admin: create add-on feature
CREATE OR REPLACE FUNCTION public.admin_create_addon(
  _name text, _slug text, _description text, _category text, _price numeric, _billing_type text
) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
DECLARE _id uuid;
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  INSERT INTO public.addon_features (name, slug, description, category, price, billing_type)
  VALUES (_name, _slug, _description, _category, _price, _billing_type) RETURNING id INTO _id;
  RETURN _id;
END;
$$;

-- Admin: activate add-on for a tenant
CREATE OR REPLACE FUNCTION public.admin_activate_addon(_tenant_id uuid, _addon_id uuid, _activated_by text DEFAULT 'manual')
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  INSERT INTO public.tenant_addons (tenant_id, addon_id, activated_by)
  VALUES (_tenant_id, _addon_id, _activated_by)
  ON CONFLICT (tenant_id, addon_id) DO UPDATE SET active = true, activated_at = now();
END;
$$;

-- Admin: deactivate add-on for a tenant
CREATE OR REPLACE FUNCTION public.admin_deactivate_addon(_tenant_id uuid, _addon_id uuid)
RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  UPDATE public.tenant_addons SET active = false WHERE tenant_id = _tenant_id AND addon_id = _addon_id;
END;
$$;

-- Admin: list all add-ons with activation count
CREATE OR REPLACE FUNCTION public.admin_list_addons()
RETURNS TABLE(id uuid, name text, slug text, description text, category text, price numeric, billing_type text, active boolean, activation_count bigint)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  RETURN QUERY
    SELECT af.id, af.name, af.slug, af.description, af.category, af.price, af.billing_type, af.active,
      (SELECT count(*) FROM public.tenant_addons ta WHERE ta.addon_id = af.id AND ta.active = true) AS activation_count
    FROM public.addon_features af ORDER BY af.created_at DESC;
END;
$$;

-- Admin: list add-ons for a specific tenant
CREATE OR REPLACE FUNCTION public.admin_tenant_addons(_tenant_id uuid)
RETURNS TABLE(addon_id uuid, addon_name text, addon_slug text, is_active boolean, activated_at timestamptz, activated_by text)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  RETURN QUERY
    SELECT af.id, af.name, af.slug, ta.active, ta.activated_at, ta.activated_by
    FROM public.addon_features af
    LEFT JOIN public.tenant_addons ta ON ta.addon_id = af.id AND ta.tenant_id = _tenant_id
    WHERE af.active = true
    ORDER BY af.name;
END;
$$;

-- Seed some initial add-on features
INSERT INTO public.addon_features (name, slug, description, category, price, billing_type) VALUES
  ('Founder''s Dashboard Pro', 'founders-pro', 'Advanced founder analytics with P&L forecasting and investor reports', 'feature', 2999, 'monthly'),
  ('Tax Portal', 'tax-portal', 'Automated GST/tax calculations and filing-ready reports', 'feature', 1999, 'monthly'),
  ('API Access', 'api-access', 'REST API access to export and integrate your data with other tools', 'api', 4999, 'monthly'),
  ('Custom Branding', 'custom-branding', 'White-label your dashboard with custom logo, colors and domain', 'branding', 9999, 'one_time'),
  ('Advanced Reports', 'advanced-reports', 'Custom expense reports, revenue breakdowns, and team utilization', 'feature', 1499, 'monthly');
