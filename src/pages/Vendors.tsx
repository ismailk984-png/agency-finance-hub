import { demoVendors, fmt } from '@/lib/demoData';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Vendors() {
  const active = demoVendors.filter(v => v.active);
  const total = active.reduce((s, v) => s + v.monthly_cost, 0);

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Vendors</h1>
          <p className="page-description">External service providers and costs</p>
        </div>
        <Badge variant="outline" className="text-base font-mono">{fmt(total)} / month</Badge>
      </div>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vendor</TableHead>
                <TableHead>Service</TableHead>
                <TableHead className="text-right">Monthly Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoVendors.map(v => (
                <TableRow key={v.id}>
                  <TableCell className="font-medium">{v.name}</TableCell>
                  <TableCell>{v.service}</TableCell>
                  <TableCell className="text-right font-mono">{fmt(v.monthly_cost)}</TableCell>
                  <TableCell><Badge variant={v.active ? 'default' : 'secondary'}>{v.active ? 'Active' : 'Inactive'}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
