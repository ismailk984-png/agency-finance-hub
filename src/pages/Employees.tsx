import { useState } from 'react';
import { demoEmployees, fmt, getSalaryPool, getActiveCount, type Employee, type RoleCategory } from '@/lib/demoData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search, Users } from 'lucide-react';

const roleLabels: Record<RoleCategory, string> = {
  editor: 'Editor', designer: 'Designer', campaign_manager: 'Campaign Manager',
  ads: 'Ads / Performance', videographer: 'Videographer', cgi_ai: 'CGI / AI',
  admin_support: 'Admin Support', production_manager: 'Production Manager', founder: 'Founder',
};

export default function Employees() {
  const [search, setSearch] = useState('');
  const filtered = demoEmployees.filter(e =>
    e.employee_name.toLowerCase().includes(search.toLowerCase())
  );
  const active = demoEmployees.filter(e => e.active);

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="page-title">Employees</h1>
          <p className="page-description">Team members and salary pools</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline"><Users className="h-3 w-3 mr-1" />{active.length} Active</Badge>
        </div>
      </div>

      {/* Role Summary Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {(Object.keys(roleLabels) as RoleCategory[]).map(role => {
          const count = getActiveCount(demoEmployees, role);
          if (count === 0) return null;
          return (
            <Card key={role}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider">{roleLabels[role]}</p>
                <p className="text-lg font-bold font-mono mt-1">{fmt(getSalaryPool(demoEmployees, role))}</p>
                <p className="text-xs text-muted-foreground">{count} member{count !== 1 ? 's' : ''}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search employees..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Salary</TableHead>
                <TableHead className="text-right">Overhead %</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(e => (
                <TableRow key={e.id}>
                  <TableCell className="font-medium">{e.employee_name}</TableCell>
                  <TableCell><Badge variant="outline">{roleLabels[e.role_category]}</Badge></TableCell>
                  <TableCell className="text-right font-mono">{fmt(e.monthly_salary)}</TableCell>
                  <TableCell className="text-right">{e.overhead_multiplier_percent}%</TableCell>
                  <TableCell className="text-right font-mono font-medium">{fmt(e.monthly_salary * (1 + e.overhead_multiplier_percent / 100))}</TableCell>
                  <TableCell>
                    <Badge variant={e.active ? 'default' : 'secondary'}>{e.active ? 'Active' : 'Inactive'}</Badge>
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
