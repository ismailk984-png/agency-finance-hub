
-- Create support tickets table
CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  created_by uuid NOT NULL,
  subject text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'bug',
  priority text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'open',
  admin_response text,
  resolved_at timestamp with time zone,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;

-- Tenants can view their own tickets
CREATE POLICY "select_own_tickets" ON public.support_tickets
  FOR SELECT USING (tenant_id = public.get_user_tenant_id(auth.uid()));

-- Tenants can insert tickets (trigger sets tenant_id)
CREATE POLICY "insert_tickets" ON public.support_tickets
  FOR INSERT WITH CHECK (tenant_id = public.get_user_tenant_id(auth.uid()));

-- Tenants can update their own open tickets (e.g. add details)
CREATE POLICY "update_own_tickets" ON public.support_tickets
  FOR UPDATE USING (tenant_id = public.get_user_tenant_id(auth.uid()) AND created_by = auth.uid() AND status = 'open');

-- Add updated_at trigger
CREATE TRIGGER update_support_tickets_updated_at
  BEFORE UPDATE ON public.support_tickets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- Admin function to list all tickets
CREATE OR REPLACE FUNCTION public.admin_list_tickets()
RETURNS TABLE(
  id uuid, subject text, description text, category text, priority text, status text,
  admin_response text, tenant_name text, reporter_name text, reporter_email text,
  created_at timestamptz, resolved_at timestamptz
)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  RETURN QUERY
    SELECT st.id, st.subject, st.description, st.category, st.priority, st.status,
      st.admin_response, t.company_name AS tenant_name, p.full_name AS reporter_name, p.email AS reporter_email,
      st.created_at, st.resolved_at
    FROM public.support_tickets st
    JOIN public.tenants t ON t.id = st.tenant_id
    LEFT JOIN public.profiles p ON p.id = st.created_by
    ORDER BY
      CASE st.status WHEN 'open' THEN 0 WHEN 'in_progress' THEN 1 ELSE 2 END,
      CASE st.priority WHEN 'critical' THEN 0 WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,
      st.created_at DESC;
END;
$$;

-- Admin function to respond to a ticket
CREATE OR REPLACE FUNCTION public.admin_respond_ticket(
  _ticket_id uuid, _response text, _status text DEFAULT 'resolved'
) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public' AS $$
BEGIN
  IF NOT public.is_platform_admin(auth.uid()) THEN RAISE EXCEPTION 'Unauthorized'; END IF;
  UPDATE public.support_tickets
    SET admin_response = _response, status = _status,
        resolved_at = CASE WHEN _status IN ('resolved', 'closed') THEN now() ELSE NULL END
    WHERE id = _ticket_id;
END;
$$;
