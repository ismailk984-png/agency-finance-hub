import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuthContext, TenantRole } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, Trash2, Shield } from 'lucide-react';
import { toast } from 'sonner';

interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  active: boolean;
  role: TenantRole;
}

interface Invitation {
  id: string;
  email: string;
  role: string;
  accepted: boolean;
  created_at: string;
}

export default function TeamManagement() {
  const { profile, roles } = useAuthContext();
  const isAdmin = roles.includes('owner') || roles.includes('admin');
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<TenantRole>('viewer');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (profile) {
      loadTeam();
      loadInvitations();
    }
  }, [profile]);

  const loadTeam = async () => {
    const { data: profiles } = await supabase
      .from('profiles')
      .select('id, full_name, email, active')
      .eq('tenant_id', profile!.tenant_id);

    const { data: rolesData } = await supabase
      .from('user_roles')
      .select('user_id, role');

    const roleMap = new Map<string, TenantRole>();
    (rolesData || []).forEach((r: any) => roleMap.set(r.user_id, r.role));

    setMembers(
      (profiles || []).map((p: any) => ({
        ...p,
        role: roleMap.get(p.id) || 'viewer',
      }))
    );
  };

  const loadInvitations = async () => {
    const { data } = await supabase
      .from('team_invitations')
      .select('*')
      .eq('accepted', false)
      .order('created_at', { ascending: false });
    setInvitations((data || []) as unknown as Invitation[]);
  };

  const handleInvite = async () => {
    if (!inviteEmail.trim()) { toast.error('Enter an email'); return; }
    setLoading(true);
    try {
      const { error } = await supabase.rpc('invite_team_member', {
        _email: inviteEmail.trim(),
        _role: inviteRole,
      });
      if (error) throw error;
      toast.success(`Invitation sent to ${inviteEmail}`);
      setInviteEmail('');
      loadInvitations();
    } catch (err: any) {
      toast.error(err.message || 'Failed to invite');
    }
    setLoading(false);
  };

  const handleRemove = async (userId: string) => {
    try {
      const { error } = await supabase.rpc('remove_team_member', { _user_id: userId });
      if (error) throw error;
      toast.success('Member removed');
      loadTeam();
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove');
    }
  };

  const handleRoleChange = async (userId: string, newRole: TenantRole) => {
    try {
      const { error } = await supabase.rpc('update_member_role', {
        _user_id: userId,
        _new_role: newRole,
      });
      if (error) throw error;
      toast.success('Role updated');
      loadTeam();
    } catch (err: any) {
      toast.error(err.message || 'Failed to update role');
    }
  };

  const handleDeleteInvitation = async (id: string) => {
    await supabase.from('team_invitations').delete().eq('id', id);
    toast.success('Invitation removed');
    loadInvitations();
  };

  const roleBadgeColor = (role: string) => {
    switch (role) {
      case 'owner': return 'default';
      case 'admin': return 'default';
      case 'finance': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Team Management</h1>
        <p className="page-description">Manage team members and their access roles.</p>
      </div>

      {/* Invite */}
      {isAdmin && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <UserPlus className="h-4 w-4" />
              Invite Team Member
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 items-end">
              <div className="flex-1 space-y-2">
                <Label>Email</Label>
                <Input placeholder="teammate@agency.com" value={inviteEmail} onChange={e => setInviteEmail(e.target.value)} />
              </div>
              <div className="w-40 space-y-2">
                <Label>Role</Label>
                <Select value={inviteRole} onValueChange={v => setInviteRole(v as TenantRole)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleInvite} disabled={loading}>
                {loading ? 'Sending…' : 'Send Invite'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Members */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Team Members</CardTitle>
          <CardDescription>{members.length} member{members.length !== 1 ? 's' : ''}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {members.map(m => (
              <div key={m.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-bold">
                    {m.full_name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{m.full_name}</p>
                    <p className="text-xs text-muted-foreground">{m.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {isAdmin && m.id !== profile?.id ? (
                    <>
                      <Select value={m.role} onValueChange={v => handleRoleChange(m.id, v as TenantRole)}>
                        <SelectTrigger className="w-28 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="finance">Finance</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleRemove(m.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <Badge variant={roleBadgeColor(m.role) as any}>
                      <Shield className="h-3 w-3 mr-1" />
                      {m.role}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      {invitations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pending Invitations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {invitations.map(inv => (
                <div key={inv.id} className="flex items-center justify-between rounded-lg border px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{inv.email}</p>
                    <p className="text-xs text-muted-foreground">Role: {inv.role}</p>
                  </div>
                  {isAdmin && (
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDeleteInvitation(inv.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
