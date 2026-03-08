
-- Multi-tenant SaaS schema

-- Enums
create type public.tenant_role as enum ('owner', 'admin', 'finance', 'viewer');
create type public.subscription_plan as enum ('starter', 'growth', 'pro');
create type public.subscription_status as enum ('trialing', 'active', 'past_due', 'canceled', 'inactive');

-- Core tables
create table public.tenants (
  id uuid primary key default gen_random_uuid(),
  company_name text not null,
  slug text unique not null,
  logo_url text,
  subscription_plan public.subscription_plan not null default 'starter',
  subscription_status public.subscription_status not null default 'trialing',
  stripe_customer_id text,
  stripe_subscription_id text,
  current_period_end timestamptz,
  trial_ends_at timestamptz default (now() + interval '14 days'),
  owner_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  full_name text not null default '',
  email text not null default '',
  avatar_url text,
  active boolean not null default true,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  role public.tenant_role not null default 'viewer',
  unique (user_id, tenant_id)
);

create table public.team_invitations (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  email text not null,
  role public.tenant_role not null default 'viewer',
  invited_by uuid references auth.users(id) on delete set null,
  accepted boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.tenant_settings (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null unique,
  currency text not null default 'INR',
  currency_symbol text not null default '₹',
  tax_mode text not null default 'gst',
  target_margin_percent numeric not null default 40,
  business_type text not null default 'agency',
  stories_factor_percent numeric not null default 15,
  shoot_day_internal_cost numeric not null default 5000,
  ads_accounts_capacity_per_ads_person integer not null default 8,
  videographer_shoots_per_month integer not null default 12,
  reels_per_editor_per_month integer not null default 20,
  statics_per_designer_per_month integer not null default 40,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Business tables
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  client_name text not null,
  current_retainer numeric not null default 0,
  plan_type text not null default 'basic',
  active boolean not null default true,
  assigned_campaign_manager text,
  reels_per_month integer not null default 0,
  statics_per_month integer not null default 0,
  stories_per_month integer not null default 0,
  shoot_days_per_month integer not null default 0,
  shoot_frequency text not null default 'monthly',
  orm_required boolean not null default false,
  ads_required boolean not null default false,
  smm_required boolean not null default false,
  gmb_required boolean not null default false,
  travel_type text not null default 'none',
  vendor_budget numeric not null default 0,
  gst_rate numeric not null default 18,
  tds_rate numeric not null default 2,
  comments text,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.employees (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  employee_name text not null,
  role_category text not null default 'editor',
  monthly_salary numeric not null default 0,
  overhead_multiplier_percent numeric not null default 15,
  active boolean not null default true,
  email text,
  joining_date date,
  salary_day integer default 1,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.fixed_expenses (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  name text not null,
  amount numeric not null default 0,
  category text not null default 'other',
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.contracts (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  client_id uuid references public.clients(id) on delete set null,
  client_name text not null,
  status text not null default 'pending',
  start_date date not null,
  end_date date,
  value numeric not null default 0,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.vendors (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid references public.tenants(id) on delete cascade not null,
  name text not null,
  service text not null default '',
  monthly_cost numeric not null default 0,
  active boolean not null default true,
  created_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Security definer helper functions
create or replace function public.get_user_tenant_id(_user_id uuid)
returns uuid language sql stable security definer set search_path = public
as $$ select tenant_id from public.profiles where id = _user_id limit 1 $$;

create or replace function public.has_tenant_role(_user_id uuid, _role public.tenant_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.is_tenant_admin(_user_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role in ('owner', 'admin')) $$;

-- Auto-set tenant_id on insert trigger
create or replace function public.set_tenant_id()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  new.tenant_id := public.get_user_tenant_id(auth.uid());
  if new.created_by is null then new.created_by := auth.uid(); end if;
  return new;
end;
$$;

-- Auto-update updated_at
create or replace function public.update_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;

-- Setup new tenant on signup
create or replace function public.setup_new_tenant(_company_name text, _full_name text)
returns uuid language plpgsql security definer set search_path = public
as $$
declare _tenant_id uuid; _user_id uuid := auth.uid(); _slug text; _email text;
begin
  select email into _email from auth.users where id = _user_id;
  _slug := lower(regexp_replace(_company_name, '[^a-zA-Z0-9]+', '-', 'g')) || '-' || substr(gen_random_uuid()::text, 1, 8);
  insert into public.tenants (company_name, slug, owner_user_id) values (_company_name, _slug, _user_id) returning id into _tenant_id;
  insert into public.profiles (id, tenant_id, full_name, email) values (_user_id, _tenant_id, _full_name, _email);
  insert into public.user_roles (user_id, tenant_id, role) values (_user_id, _tenant_id, 'owner');
  insert into public.tenant_settings (tenant_id) values (_tenant_id);
  return _tenant_id;
end;
$$;

-- Check for pending invitation
create or replace function public.check_pending_invitation()
returns json language plpgsql security definer set search_path = public
as $$
declare _inv record; _email text;
begin
  select email into _email from auth.users where id = auth.uid();
  select ti.id, ti.tenant_id, ti.role, t.company_name
  into _inv from public.team_invitations ti
  join public.tenants t on t.id = ti.tenant_id
  where ti.email = _email and ti.accepted = false
  order by ti.created_at desc limit 1;
  if _inv is null then return null; end if;
  return json_build_object('id', _inv.id, 'tenant_id', _inv.tenant_id, 'company_name', _inv.company_name, 'role', _inv.role);
end;
$$;

-- Join tenant via invitation
create or replace function public.join_tenant_by_invitation(_full_name text)
returns uuid language plpgsql security definer set search_path = public
as $$
declare _inv record; _email text;
begin
  select email into _email from auth.users where id = auth.uid();
  select * into _inv from public.team_invitations where email = _email and accepted = false order by created_at desc limit 1;
  if _inv is null then raise exception 'No pending invitation found'; end if;
  insert into public.profiles (id, tenant_id, full_name, email) values (auth.uid(), _inv.tenant_id, _full_name, _email);
  insert into public.user_roles (user_id, tenant_id, role) values (auth.uid(), _inv.tenant_id, _inv.role);
  update public.team_invitations set accepted = true where id = _inv.id;
  return _inv.tenant_id;
end;
$$;

-- Complete onboarding
create or replace function public.complete_onboarding(
  _currency text default 'INR', _currency_symbol text default '₹',
  _tax_mode text default 'gst', _target_margin numeric default 40,
  _business_type text default 'agency')
returns void language plpgsql security definer set search_path = public
as $$
declare _tid uuid;
begin
  _tid := public.get_user_tenant_id(auth.uid());
  update public.tenant_settings set currency = _currency, currency_symbol = _currency_symbol, tax_mode = _tax_mode, target_margin_percent = _target_margin, business_type = _business_type, updated_at = now() where tenant_id = _tid;
  update public.profiles set onboarding_completed = true, updated_at = now() where id = auth.uid();
end;
$$;

-- Invite team member
create or replace function public.invite_team_member(_email text, _role public.tenant_role default 'viewer')
returns uuid language plpgsql security definer set search_path = public
as $$
declare _tid uuid; _inv_id uuid;
begin
  _tid := public.get_user_tenant_id(auth.uid());
  if not public.is_tenant_admin(auth.uid()) then raise exception 'Only admins can invite'; end if;
  insert into public.team_invitations (tenant_id, email, role, invited_by) values (_tid, _email, _role, auth.uid()) returning id into _inv_id;
  return _inv_id;
end;
$$;

-- Remove team member
create or replace function public.remove_team_member(_user_id uuid)
returns void language plpgsql security definer set search_path = public
as $$
declare _tid uuid;
begin
  _tid := public.get_user_tenant_id(auth.uid());
  if not public.is_tenant_admin(auth.uid()) then raise exception 'Only admins can remove members'; end if;
  if _user_id = auth.uid() then raise exception 'Cannot remove yourself'; end if;
  delete from public.user_roles where user_id = _user_id and tenant_id = _tid;
  update public.profiles set active = false where id = _user_id and tenant_id = _tid;
end;
$$;

-- Update member role
create or replace function public.update_member_role(_user_id uuid, _new_role public.tenant_role)
returns void language plpgsql security definer set search_path = public
as $$
declare _tid uuid;
begin
  _tid := public.get_user_tenant_id(auth.uid());
  if not public.is_tenant_admin(auth.uid()) then raise exception 'Only admins can change roles'; end if;
  update public.user_roles set role = _new_role where user_id = _user_id and tenant_id = _tid;
end;
$$;

-- Triggers: auto-set tenant_id on business tables
create trigger set_tenant_id_clients before insert on public.clients for each row execute function public.set_tenant_id();
create trigger set_tenant_id_employees before insert on public.employees for each row execute function public.set_tenant_id();
create trigger set_tenant_id_fixed_expenses before insert on public.fixed_expenses for each row execute function public.set_tenant_id();
create trigger set_tenant_id_contracts before insert on public.contracts for each row execute function public.set_tenant_id();
create trigger set_tenant_id_vendors before insert on public.vendors for each row execute function public.set_tenant_id();

-- Triggers: auto-update updated_at
create trigger updated_at_tenants before update on public.tenants for each row execute function public.update_updated_at();
create trigger updated_at_profiles before update on public.profiles for each row execute function public.update_updated_at();
create trigger updated_at_tenant_settings before update on public.tenant_settings for each row execute function public.update_updated_at();
create trigger updated_at_clients before update on public.clients for each row execute function public.update_updated_at();
create trigger updated_at_employees before update on public.employees for each row execute function public.update_updated_at();
create trigger updated_at_fixed_expenses before update on public.fixed_expenses for each row execute function public.update_updated_at();
create trigger updated_at_contracts before update on public.contracts for each row execute function public.update_updated_at();
create trigger updated_at_vendors before update on public.vendors for each row execute function public.update_updated_at();

-- Enable RLS on all tables
alter table public.tenants enable row level security;
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.team_invitations enable row level security;
alter table public.tenant_settings enable row level security;
alter table public.clients enable row level security;
alter table public.employees enable row level security;
alter table public.fixed_expenses enable row level security;
alter table public.contracts enable row level security;
alter table public.vendors enable row level security;

-- RLS Policies: Tenants
create policy "select_own_tenant" on public.tenants for select to authenticated using (id = public.get_user_tenant_id(auth.uid()));
create policy "admin_update_tenant" on public.tenants for update to authenticated using (id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

-- RLS Policies: Profiles
create policy "select_tenant_profiles" on public.profiles for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "update_own_profile" on public.profiles for update to authenticated using (id = auth.uid());

-- RLS Policies: User roles
create policy "select_tenant_roles" on public.user_roles for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "admin_insert_roles" on public.user_roles for insert to authenticated with check (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));
create policy "admin_update_roles" on public.user_roles for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));
create policy "admin_delete_roles" on public.user_roles for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

-- RLS Policies: Team invitations
create policy "select_tenant_invitations" on public.team_invitations for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "admin_delete_invitations" on public.team_invitations for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

-- RLS Policies: Tenant settings
create policy "select_tenant_settings" on public.tenant_settings for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "admin_update_settings" on public.tenant_settings for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

-- RLS Policies: Business tables (same pattern)
create policy "select_clients" on public.clients for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "insert_clients" on public.clients for insert to authenticated with check (true);
create policy "update_clients" on public.clients for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "delete_clients" on public.clients for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

create policy "select_employees" on public.employees for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "insert_employees" on public.employees for insert to authenticated with check (true);
create policy "update_employees" on public.employees for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "delete_employees" on public.employees for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

create policy "select_fixed_expenses" on public.fixed_expenses for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "insert_fixed_expenses" on public.fixed_expenses for insert to authenticated with check (true);
create policy "update_fixed_expenses" on public.fixed_expenses for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "delete_fixed_expenses" on public.fixed_expenses for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

create policy "select_contracts" on public.contracts for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "insert_contracts" on public.contracts for insert to authenticated with check (true);
create policy "update_contracts" on public.contracts for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "delete_contracts" on public.contracts for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));

create policy "select_vendors" on public.vendors for select to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "insert_vendors" on public.vendors for insert to authenticated with check (true);
create policy "update_vendors" on public.vendors for update to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()));
create policy "delete_vendors" on public.vendors for delete to authenticated using (tenant_id = public.get_user_tenant_id(auth.uid()) and public.is_tenant_admin(auth.uid()));
