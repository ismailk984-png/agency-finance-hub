import { demoFixedExpenses, fmt } from '@/lib/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const categoryLabels: Record<string, string> = {
  office_infrastructure: 'Office & Infrastructure',
  software_tools: 'Software & Tools',
  compliance_legal: 'Compliance & Legal',
  financial_commitments: 'Financial Commitments',
  core_admin_payroll: 'Admin Payroll',
  founders_salary: "Founder's Salary",
};

export default function FixedExpenses() {
  const total = demoFixedExpenses.reduce((s, e) => s + e.amount, 0);
  const categories = [...new Set(demoFixedExpenses.map(e => e.category))];

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Fixed Expenses</h1>
          <p className="page-description">Monthly recurring operational costs</p>
        </div>
        <Badge variant="outline" className="text-base font-mono">{fmt(total)} / month</Badge>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map(cat => {
          const catTotal = demoFixedExpenses.filter(e => e.category === cat).reduce((s, e) => s + e.amount, 0);
          return (
            <Card key={cat}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{categoryLabels[cat] || cat}</p>
                <p className="text-lg font-bold font-mono mt-1">{fmt(catTotal)}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoFixedExpenses.map(e => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.name}</TableCell>
                  <TableCell><Badge variant="outline">{categoryLabels[e.category] || e.category}</Badge></TableCell>
                  <TableCell className="text-right font-mono">{fmt(e.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
