
-- Fix INSERT policies to explicitly check tenant_id instead of using (true)
-- The set_tenant_id trigger ensures correct tenant_id, but we add explicit checks

DROP POLICY "insert_clients" ON public.clients;
CREATE POLICY "insert_clients" ON public.clients FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id(auth.uid()));

DROP POLICY "insert_employees" ON public.employees;
CREATE POLICY "insert_employees" ON public.employees FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id(auth.uid()));

DROP POLICY "insert_fixed_expenses" ON public.fixed_expenses;
CREATE POLICY "insert_fixed_expenses" ON public.fixed_expenses FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id(auth.uid()));

DROP POLICY "insert_contracts" ON public.contracts;
CREATE POLICY "insert_contracts" ON public.contracts FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id(auth.uid()));

DROP POLICY "insert_vendors" ON public.vendors;
CREATE POLICY "insert_vendors" ON public.vendors FOR INSERT TO authenticated
  WITH CHECK (tenant_id = public.get_user_tenant_id(auth.uid()));

-- Fix search_path on update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS trigger LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$ BEGIN new.updated_at := now(); RETURN new; END; $$;
