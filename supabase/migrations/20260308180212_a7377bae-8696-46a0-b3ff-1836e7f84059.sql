
-- Add explicit deny policy to satisfy linter (all access via security definer functions)
create policy "no_direct_access" on public.platform_admins for select to authenticated using (false);
