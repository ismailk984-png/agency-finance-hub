
-- Platform admins table (separate from tenant roles)
create table public.platform_admins (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  created_at timestamptz not null default now()
);

alter table public.platform_admins enable row level security;

-- No direct access policies - all access via security definer functions

-- Check if user is platform admin
create or replace function public.is_platform_admin(_user_id uuid)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.platform_admins where user_id = _user_id) $$;

-- Admin: get platform stats
create or replace function public.admin_get_stats()
returns json language plpgsql security definer set search_path = public
as $$
declare _result json;
begin
  if not public.is_platform_admin(auth.uid()) then raise exception 'Unauthorized'; end if;
  select json_build_object(
    'total_tenants', (select count(*) from public.tenants),
    'active_tenants', (select count(*) from public.tenants where subscription_status in ('active', 'trialing')),
    'total_users', (select count(*) from public.profiles),
    'plan_breakdown', (select coalesce(json_object_agg(subscription_plan, cnt), '{}'::json) from (select subscription_plan::text, count(*) as cnt from public.tenants group by subscription_plan) s)
  ) into _result;
  return _result;
end;
$$;

-- Admin: list tenants (metadata only, no business data)
create or replace function public.admin_list_tenants()
returns table (
  id uuid, company_name text, slug text, subscription_plan text, subscription_status text,
  owner_email text, member_count bigint, trial_ends_at timestamptz, created_at timestamptz
) language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_platform_admin(auth.uid()) then raise exception 'Unauthorized'; end if;
  return query
    select t.id, t.company_name, t.slug, t.subscription_plan::text, t.subscription_status::text,
      (select u.email from auth.users u where u.id = t.owner_user_id)::text as owner_email,
      (select count(*) from public.profiles p where p.tenant_id = t.id) as member_count,
      t.trial_ends_at, t.created_at
    from public.tenants t
    order by t.created_at desc;
end;
$$;

-- Admin: list users (no business data)
create or replace function public.admin_list_users()
returns table (
  id uuid, full_name text, email text, tenant_name text, role text, active boolean, created_at timestamptz
) language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_platform_admin(auth.uid()) then raise exception 'Unauthorized'; end if;
  return query
    select p.id, p.full_name, p.email, t.company_name as tenant_name,
      (select ur.role::text from public.user_roles ur where ur.user_id = p.id limit 1),
      p.active, p.created_at
    from public.profiles p
    join public.tenants t on t.id = p.tenant_id
    order by p.created_at desc;
end;
$$;

-- Admin: suspend tenant
create or replace function public.admin_suspend_tenant(_tenant_id uuid)
returns void language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_platform_admin(auth.uid()) then raise exception 'Unauthorized'; end if;
  update public.tenants set subscription_status = 'inactive' where id = _tenant_id;
end;
$$;

-- Admin: activate tenant
create or replace function public.admin_activate_tenant(_tenant_id uuid)
returns void language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_platform_admin(auth.uid()) then raise exception 'Unauthorized'; end if;
  update public.tenants set subscription_status = 'active' where id = _tenant_id;
end;
$$;

-- Admin: update tenant plan
create or replace function public.admin_update_tenant_plan(_tenant_id uuid, _plan public.subscription_plan)
returns void language plpgsql security definer set search_path = public
as $$
begin
  if not public.is_platform_admin(auth.uid()) then raise exception 'Unauthorized'; end if;
  update public.tenants set subscription_plan = _plan where id = _tenant_id;
end;
$$;
