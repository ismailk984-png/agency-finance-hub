import { useState } from 'react';
import { demoClients, fmt, type Client } from '@/lib/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export default function Clients() {
  const [search, setSearch] = useState('');
  const filtered = demoClients.filter(c =>
    c.client_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Monthly Retainer</h1>
          <p className="page-description">Manage client retainers and deliverables</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{demoClients.filter(c => c.active).length} Active</Badge>
          <Badge variant="secondary">{demoClients.length} Total</Badge>
        </div>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search clients..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead className="text-right">Retainer</TableHead>
                <TableHead className="text-center">Reels</TableHead>
                <TableHead className="text-center">Statics</TableHead>
                <TableHead className="text-center">Stories</TableHead>
                <TableHead className="text-center">Shoots</TableHead>
                <TableHead className="text-center">Ads</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.client_name}</TableCell>
                  <TableCell>
                    <Badge variant={c.plan_type === 'premium' ? 'default' : c.plan_type === 'growth' ? 'secondary' : 'outline'}>
                      {c.plan_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono">{fmt(c.current_retainer)}</TableCell>
                  <TableCell className="text-center">{c.reels_per_month}</TableCell>
                  <TableCell className="text-center">{c.statics_per_month}</TableCell>
                  <TableCell className="text-center">{c.stories_per_month}</TableCell>
                  <TableCell className="text-center">{c.shoot_days_per_month}</TableCell>
                  <TableCell className="text-center">{c.ads_required ? '✓' : '—'}</TableCell>
                  <TableCell>
                    <Badge variant={c.active ? 'default' : 'secondary'}>
                      {c.active ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
