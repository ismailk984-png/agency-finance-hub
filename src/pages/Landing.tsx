import { Link } from 'react-router-dom';
import PublicNav from '@/components/PublicNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap, BarChart3, Users, Shield, TrendingUp, FileText,
  Briefcase, Calculator, Check,
} from 'lucide-react';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';

const features = [
  { icon: BarChart3, title: 'Real-Time Margins', desc: 'Track client profitability with auto-calculated margins and cost breakdowns.' },
  { icon: Users, title: 'Team Utilization', desc: 'Monitor editor, designer, and videographer workloads against capacity.' },
  { icon: Calculator, title: 'Per-Unit Costing', desc: 'Know the exact cost of every reel, static, shoot day, and story.' },
  { icon: Briefcase, title: 'Client Management', desc: 'Manage retainers, deliverables, and service scopes in one place.' },
  { icon: FileText, title: 'Contract Tracking', desc: 'Track renewals, expirations, and contract values automatically.' },
  { icon: Shield, title: 'Multi-Tenant Security', desc: 'Complete data isolation — your business data is yours alone.' },
];

const planKeys = ['starter', 'growth', 'pro'] as const;

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* Hero */}
      <section className="py-20 lg:py-32 px-4">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <Badge variant="secondary" className="text-xs uppercase tracking-widest">
            Built for Agency Founders
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Financial Intelligence for{' '}
            <span className="text-primary">Modern Agencies</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Track margins, team utilization, and client profitability — all in one
            platform built specifically for creative and marketing agencies.
          </p>
          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link to="/signup">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#pricing">See Pricing</a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">14-day free trial · No credit card required</p>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t bg-muted/30 px-4">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight">Everything Your Agency Needs</h2>
            <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
              From cost tracking to team capacity planning — purpose-built for agency operations.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(f => (
              <Card key={f.title} className="border bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 border-t px-4">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold tracking-tight">Simple, Transparent Pricing</h2>
            <p className="text-muted-foreground mt-3">Start free, upgrade as you grow.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {planKeys.map(key => {
              const plan = PLAN_LIMITS[key];
              const popular = key === 'growth';
              return (
                <Card key={key} className={`relative overflow-hidden ${popular ? 'border-primary shadow-lg ring-1 ring-primary/20' : ''}`}>
                  {popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-lg">
                      Popular
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl">{plan.label}</CardTitle>
                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                    <div className="pt-3">
                      <span className="text-4xl font-bold font-mono">{fmt(plan.price)}</span>
                      <span className="text-sm text-muted-foreground"> /month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      `${plan.maxClients === Infinity ? 'Unlimited' : `Up to ${plan.maxClients}`} clients`,
                      `${plan.maxEmployees === Infinity ? 'Unlimited' : `Up to ${plan.maxEmployees}`} employees`,
                      plan.fullReports ? 'Full reports & analytics' : 'Basic reports',
                      'Team collaboration',
                      'Data isolation & security',
                    ].map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-primary shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                    <Button className="w-full mt-4" variant={popular ? 'default' : 'outline'} asChild>
                      <Link to="/signup">Get Started</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t bg-muted/30 px-4">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Take Control of Your Agency Finances?</h2>
          <p className="text-muted-foreground">
            Join agencies that use AgencyOS to make smarter financial decisions every day.
          </p>
          <Button size="lg" asChild>
            <Link to="/signup">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 px-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold">AgencyOS</span>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AgencyOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
