import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Bug, AlertTriangle, HelpCircle, Clock, Building2, User, Loader2, MessageSquare, Send } from 'lucide-react';
import { toast } from 'sonner';

interface TicketRow {
  id: string;
  subject: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  admin_response: string | null;
  tenant_name: string;
  reporter_name: string;
  reporter_email: string;
  created_at: string;
  resolved_at: string | null;
}

const categoryIcons: Record<string, any> = { bug: Bug, issue: AlertTriangle, feature: HelpCircle };

const statusStyles: Record<string, string> = {
  open: 'bg-amber-500/10 text-amber-600 border-amber-200',
  in_progress: 'bg-blue-500/10 text-blue-600 border-blue-200',
  resolved: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  closed: 'bg-muted text-muted-foreground',
};

const priorityStyles: Record<string, string> = {
  low: 'bg-muted text-muted-foreground',
  medium: 'bg-amber-500/10 text-amber-600',
  high: 'bg-orange-500/10 text-orange-600',
  critical: 'bg-destructive/10 text-destructive',
};

export default function AdminTickets() {
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TicketRow | null>(null);
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState('resolved');
  const [submitting, setSubmitting] = useState(false);
  const [filter, setFilter] = useState('all');

  const load = async () => {
    const { data } = await supabase.rpc('admin_list_tickets');
    if (data) setTickets(data as unknown as TicketRow[]);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const handleRespond = async () => {
    if (!response.trim()) { toast.error('Please write a response'); return; }
    setSubmitting(true);
    const { error } = await supabase.rpc('admin_respond_ticket', {
      _ticket_id: selected!.id,
      _response: response,
      _status: newStatus,
    });
    setSubmitting(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Response sent');
    setSelected(null);
    setResponse('');
    load();
  };

  const filtered = filter === 'all' ? tickets : tickets.filter(t => t.status === filter);
  const counts = {
    all: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    in_progress: tickets.filter(t => t.status === 'in_progress').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  if (loading) return <p className="text-muted-foreground">Loading tickets…</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Support Tickets</h1>
        <p className="text-muted-foreground text-sm mt-1">
          {counts.open} open · {counts.in_progress} in progress · {tickets.length} total
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2">
        {(['all', 'open', 'in_progress', 'resolved'] as const).map(f => (
          <Button key={f} variant={filter === f ? 'default' : 'outline'} size="sm" onClick={() => setFilter(f)}>
            {f === 'all' ? 'All' : f === 'in_progress' ? 'In Progress' : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="ml-1.5 text-xs opacity-60">{counts[f as keyof typeof counts] ?? tickets.filter(t => t.status === f).length}</span>
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(t => {
          const Icon = categoryIcons[t.category] || Bug;
          return (
            <Card key={t.id} className="cursor-pointer hover:border-primary/30 transition-colors" onClick={() => { setSelected(t); setResponse(t.admin_response || ''); setNewStatus(t.status === 'open' ? 'resolved' : t.status); }}>
              <CardContent className="p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted shrink-0 mt-0.5">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-sm">{t.subject}</h3>
                      <Badge variant="outline" className={statusStyles[t.status] || ''}>
                        {t.status === 'in_progress' ? 'In Progress' : t.status.charAt(0).toUpperCase() + t.status.slice(1)}
                      </Badge>
                      <Badge variant="outline" className={priorityStyles[t.priority] || ''}>
                        {t.priority}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{t.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{t.tenant_name}</span>
                      <span className="flex items-center gap-1"><User className="h-3 w-3" />{t.reporter_name || t.reporter_email}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(t.created_at).toLocaleDateString()}</span>
                    </div>
                    {t.admin_response && (
                      <div className="mt-2 flex items-center gap-1 text-[11px] text-primary">
                        <MessageSquare className="h-3 w-3" /> Responded
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
        {filtered.length === 0 && (
          <Card><CardContent className="p-12 text-center text-muted-foreground">No tickets found.</CardContent></Card>
        )}
      </div>

      {/* Respond dialog */}
      <Dialog open={!!selected} onOpenChange={v => !v && setSelected(null)}>
        <DialogContent className="sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="text-base">{selected.subject}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline" className={statusStyles[selected.status] || ''}>{selected.status}</Badge>
                  <Badge variant="outline" className={priorityStyles[selected.priority] || ''}>{selected.priority}</Badge>
                  <span className="text-xs text-muted-foreground">{selected.category}</span>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p><strong>Tenant:</strong> {selected.tenant_name}</p>
                  <p><strong>Reporter:</strong> {selected.reporter_name} ({selected.reporter_email})</p>
                  <p><strong>Submitted:</strong> {new Date(selected.created_at).toLocaleString()}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 border">
                  <p className="text-sm">{selected.description}</p>
                </div>
                <div>
                  <Label>Your Response</Label>
                  <Textarea value={response} onChange={e => setResponse(e.target.value)} rows={4} placeholder="Write your response to the tenant..." />
                </div>
                <div>
                  <Label>Set Status</Label>
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full" onClick={handleRespond} disabled={submitting}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Send className="h-4 w-4 mr-2" />}
                  Send Response
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
