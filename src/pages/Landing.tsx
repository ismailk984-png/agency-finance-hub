import { Link } from 'react-router-dom';
import PublicNav from '@/components/PublicNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap, BarChart3, Users, Shield, FileText,
  Briefcase, Calculator, Check, ArrowRight, Play,
  Star, Quote, ChevronRight,
} from 'lucide-react';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';
import { motion } from 'framer-motion';

import dashboardImg from '@/assets/dashboard-preview.jpg';
import clientsImg from '@/assets/clients-preview.jpg';
import analyticsImg from '@/assets/analytics-preview.jpg';

const fade = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const features = [
  { icon: BarChart3, title: 'Real-Time Margins', desc: 'Track client profitability with auto-calculated margins and cost breakdowns.' },
  { icon: Users, title: 'Team Utilization', desc: 'Monitor editor, designer, and videographer workloads against capacity.' },
  { icon: Calculator, title: 'Per-Unit Costing', desc: 'Know the exact cost of every reel, static, shoot day, and story.' },
  { icon: Briefcase, title: 'Client Management', desc: 'Manage retainers, deliverables, and service scopes in one place.' },
  { icon: FileText, title: 'Contract Tracking', desc: 'Track renewals, expirations, and contract values automatically.' },
  { icon: Shield, title: 'Multi-Tenant Security', desc: 'Complete data isolation — your business data is yours alone.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Founder, Pixel Perfect Media',
    quote: 'AgencyOS transformed how we track margins. We went from guessing profitability to knowing it in real-time. Game-changer for our 15-person team.',
    avatar: 'PS',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'CEO, Catalyst Digital',
    quote: 'Finally, a tool that understands agency economics. The per-unit costing alone saved us ₹2L/month by spotting underpriced clients.',
    avatar: 'RM',
    rating: 5,
  },
  {
    name: 'Ananya Desai',
    role: 'Co-Founder, Brandwave Studios',
    quote: 'We tried 5 different tools before AgencyOS. Nothing else comes close for creative agency financial ops. The team utilization view is incredible.',
    avatar: 'AD',
    rating: 5,
  },
];

const screenshots = [
  { img: dashboardImg, label: 'Dashboard & Analytics', desc: 'Revenue, margins, and KPIs at a glance' },
  { img: clientsImg, label: 'Client Management', desc: 'Track retainers, deliverables, and profitability' },
  { img: analyticsImg, label: 'Team & Expense Reports', desc: 'Utilization heatmaps and billing trends' },
];

const planKeys = ['starter', 'growth', 'pro'] as const;

const trustedBy = ['50+ Agencies', '₹12Cr+ Revenue Tracked', '500+ Clients Managed', '99.9% Uptime'];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 pb-20 lg:pt-40 lg:pb-32 px-5">
        {/* Decorative blobs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-5xl text-center relative z-10"
        >
          <motion.div variants={fade} transition={{ duration: 0.5 }}>
            <Badge className="bg-primary/10 text-foreground border-primary/20 hover:bg-primary/15 text-xs uppercase tracking-widest px-4 py-1.5 rounded-full">
              <Zap className="h-3 w-3 mr-1.5 text-primary" /> Built for Agency Founders
            </Badge>
          </motion.div>

          <motion.h1
            variants={fade}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-8 text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Financial Intelligence
            <br />
            <span className="relative">
              for Modern
              <span className="text-primary"> Agencies</span>
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M2 8C50 2 250 2 298 8" stroke="hsl(var(--primary))" strokeWidth="3" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fade}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Track margins, team utilization, and client profitability — all in one
            platform built specifically for creative and marketing agencies.
          </motion.p>

          <motion.div
            variants={fade}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
          >
            <Button size="lg" className="rounded-full px-8 text-base h-12 shadow-lg shadow-primary/25" asChild>
              <Link to="/signup">
                Start Free Trial <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base h-12" asChild>
              <a href="#video">
                <Play className="mr-2 h-4 w-4 fill-current" /> Watch Demo
              </a>
            </Button>
          </motion.div>

          <motion.p variants={fade} transition={{ delay: 0.4 }} className="mt-4 text-sm text-muted-foreground">
            14-day free trial · No credit card required
          </motion.p>
        </motion.div>

        {/* Trusted badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-16 flex flex-wrap justify-center gap-6 md:gap-10"
        >
          {trustedBy.map((t) => (
            <div key={t} className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="font-medium">{t}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ═══ VIDEO / DEMO ═══ */}
      <section id="video" className="py-20 px-5">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fade}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden bg-foreground/5 border border-border aspect-video group cursor-pointer"
          >
            {/* Video placeholder — replace src with your actual video */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="h-8 w-8 text-primary-foreground fill-current ml-1" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">Watch the 2-minute product demo</p>
            </div>
            {/* Decorative gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>
          <p className="text-center text-xs text-muted-foreground mt-4">
            🎥 Record and upload your product walkthrough video here
          </p>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 px-5">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fade}>
              <Badge className="bg-primary/10 text-foreground border-primary/20 text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                Features
              </Badge>
            </motion.div>
            <motion.h2 variants={fade} className="mt-5 text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Everything Your Agency Needs
            </motion.h2>
            <motion.p variants={fade} className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg">
              From cost tracking to team capacity planning — purpose-built for agency operations.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={fade} transition={{ duration: 0.4 }}>
                <Card className="group border border-border/60 bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 h-full">
                  <CardContent className="p-7">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>{f.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ SCREENSHOTS ═══ */}
      <section id="screenshots" className="py-24 px-5 bg-foreground/[0.02]">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fade}>
              <Badge className="bg-primary/10 text-foreground border-primary/20 text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                Product Preview
              </Badge>
            </motion.div>
            <motion.h2 variants={fade} className="mt-5 text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              A Sneak Peek Inside
            </motion.h2>
            <motion.p variants={fade} className="text-muted-foreground mt-4 max-w-lg mx-auto text-lg">
              Beautiful dashboards and powerful tools designed for agency workflows.
            </motion.p>
          </motion.div>

          <div className="space-y-12">
            {screenshots.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                variants={fade}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="rounded-2xl overflow-hidden border border-border/60 shadow-2xl shadow-foreground/5 bg-card">
                  <img
                    src={s.img}
                    alt={s.label}
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="font-semibold text-lg" style={{ fontFamily: 'var(--font-display)' }}>{s.label}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-24 px-5">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fade}>
              <Badge className="bg-primary/10 text-foreground border-primary/20 text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                Testimonials
              </Badge>
            </motion.div>
            <motion.h2 variants={fade} className="mt-5 text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Loved by Agency Founders
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((t) => (
              <motion.div key={t.name} variants={fade} transition={{ duration: 0.4 }}>
                <Card className="h-full border border-border/60 bg-card hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-7 flex flex-col h-full">
                    {/* Stars */}
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                      ))}
                    </div>

                    <Quote className="h-8 w-8 text-primary/20 mb-3" />
                    <p className="text-foreground leading-relaxed flex-1">"{t.quote}"</p>

                    <div className="mt-6 flex items-center gap-3 pt-5 border-t border-border/50">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                        {t.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 px-5 bg-foreground/[0.02]">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fade}>
              <Badge className="bg-primary/10 text-foreground border-primary/20 text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                Pricing
              </Badge>
            </motion.div>
            <motion.h2 variants={fade} className="mt-5 text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Simple, Transparent Pricing
            </motion.h2>
            <motion.p variants={fade} className="text-muted-foreground mt-4 text-lg">
              Start free, upgrade as you grow.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {planKeys.map((key) => {
              const plan = PLAN_LIMITS[key];
              const popular = key === 'growth';
              return (
                <motion.div key={key} variants={fade} transition={{ duration: 0.4 }}>
                  <Card className={`relative h-full overflow-hidden transition-all duration-300 ${
                    popular
                      ? 'border-primary shadow-xl shadow-primary/10 ring-2 ring-primary/20 scale-[1.02]'
                      : 'border-border/60 hover:border-primary/30 hover:shadow-lg'
                  }`}>
                    {popular && (
                      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
                    )}
                    <CardHeader className="pb-4 pt-8">
                      {popular && (
                        <Badge className="w-fit mb-3 bg-primary text-primary-foreground text-[10px] uppercase tracking-wider rounded-full">
                          Most Popular
                        </Badge>
                      )}
                      <CardTitle className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>{plan.label}</CardTitle>
                      <p className="text-sm text-muted-foreground">{plan.description}</p>
                      <div className="pt-4">
                        <span className="text-5xl font-bold font-mono tracking-tight">{fmt(plan.price)}</span>
                        <span className="text-sm text-muted-foreground"> /month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pb-8">
                      {[
                        `${plan.maxClients === Infinity ? 'Unlimited' : `Up to ${plan.maxClients}`} clients`,
                        `${plan.maxEmployees === Infinity ? 'Unlimited' : `Up to ${plan.maxEmployees}`} employees`,
                        plan.fullReports ? 'Full reports & analytics' : 'Basic reports',
                        'Team collaboration',
                        'Data isolation & security',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2.5 text-sm">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="h-3 w-3 text-primary" />
                          </div>
                          <span>{item}</span>
                        </div>
                      ))}
                      <Button
                        className={`w-full mt-6 rounded-full h-11 ${popular ? 'shadow-lg shadow-primary/25' : ''}`}
                        variant={popular ? 'default' : 'outline'}
                        asChild
                      >
                        <Link to="/signup">
                          Get Started <ChevronRight className="ml-1 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="py-24 px-5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl rounded-3xl bg-foreground text-background p-12 md:p-16 text-center relative overflow-hidden"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-primary/20 blur-[60px]" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-primary/10 blur-[40px]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              Ready to Take Control of
              <br />
              Your Agency Finances?
            </h2>
            <p className="mt-5 text-background/60 text-lg max-w-xl mx-auto">
              Join agencies that use AgencyOS to make smarter financial decisions every day.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 h-12 text-base bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg" asChild>
                <Link to="/signup">
                  Start Your Free Trial <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="mt-4 text-background/40 text-sm">No credit card required · Setup in 2 minutes</p>
          </div>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border/50 py-10 px-5">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>AgencyOS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/#features" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="/#pricing" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="/#testimonials" className="text-xs text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 AgencyOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
