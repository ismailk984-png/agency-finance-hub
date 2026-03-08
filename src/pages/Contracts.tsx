import { demoContracts, fmt } from '@/lib/demoData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Contracts() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="page-title">Contracts</h1>
        <p className="page-description">Client contracts and renewal tracking</p>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Start</TableHead>
                <TableHead>End</TableHead>
                <TableHead className="text-right">Value</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoContracts.map(c => {
                const daysLeft = c.end_date ? Math.ceil((new Date(c.end_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : null;
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">{c.client_name}</TableCell>
                    <TableCell>{new Date(c.start_date).toLocaleDateString()}</TableCell>
                    <TableCell>{c.end_date ? new Date(c.end_date).toLocaleDateString() : '—'}</TableCell>
                    <TableCell className="text-right font-mono">{fmt(c.value)}</TableCell>
                    <TableCell>
                      <Badge variant={c.status === 'active' ? 'default' : 'secondary'}>{c.status}</Badge>
                      {daysLeft !== null && daysLeft <= 45 && daysLeft >= 0 && (
                        <Badge variant="destructive" className="ml-2">{daysLeft}d left</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
