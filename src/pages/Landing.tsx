import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNav from '@/components/PublicNav';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap, BarChart3, Users, Shield, FileText,
  Briefcase, Calculator, Check, ArrowRight, Play,
  Star, ChevronRight, ArrowUpRight,
} from 'lucide-react';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';
import { motion, AnimatePresence } from 'framer-motion';

import dashboardImg from '@/assets/dashboard-preview.jpg';
import clientsImg from '@/assets/clients-preview.jpg';
import analyticsImg from '@/assets/analytics-preview.jpg';

const fade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

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
    role: 'Founder · Pixel Perfect Media',
    quote: 'AgencyOS transformed how we track margins. We went from guessing profitability to knowing it in real-time.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Mehta',
    role: 'CEO · Catalyst Digital',
    quote: 'The per-unit costing alone saved us ₹2L/month by spotting underpriced clients. Nothing else comes close.',
    avatar: 'RM',
  },
  {
    name: 'Ananya Desai',
    role: 'Co-Founder · Brandwave Studios',
    quote: 'We tried 5 different tools before AgencyOS. The team utilization view is genuinely incredible.',
    avatar: 'AD',
  },
];

const productTabs = [
  { key: 'dashboard', label: 'Dashboard', img: dashboardImg },
  { key: 'clients', label: 'Clients', img: clientsImg },
  { key: 'reports', label: 'Reporting', img: analyticsImg },
];

const planKeys = ['starter', 'growth', 'pro'] as const;

export default function Landing() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const activeProduct = productTabs.find((t) => t.key === activeTab)!;

  return (
    <div className="min-h-screen bg-background">
      <PublicNav />

      {/* ═══ HERO ═══ */}
      <section className="pt-32 pb-6 px-5">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[720px] text-center"
        >
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 text-[13px] text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <span className="underline decoration-border underline-offset-4">Now with AI-powered margin insights</span>
            <ChevronRight className="h-3 w-3" />
          </Link>

          <h1
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-foreground"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Agency financial
            <br />
            intelligence.
          </h1>

          <p className="mt-6 text-[17px] text-muted-foreground leading-relaxed max-w-md mx-auto">
            AgencyOS is the operating system for agency finances.
            <br className="hidden sm:block" />
            Margins, utilization, and profitability — all in one place.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <Button className="h-10 px-5 rounded-lg bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium" asChild>
              <Link to="/signup">Start for free</Link>
            </Button>
            <Button variant="outline" className="h-10 px-5 rounded-lg text-[13px] font-medium border-border" asChild>
              <a href="#video">Watch demo</a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* ═══ PRODUCT TABS + SCREENSHOT ═══ */}
      <section id="product" className="pt-14 pb-24 px-5">
        <div className="mx-auto max-w-[1000px]">
          {/* Tabs */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex border-b border-border">
              {productTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-6 py-3 text-[13px] font-medium transition-colors relative ${
                    activeTab === tab.key
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-foreground"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative rounded-xl border border-border/80 overflow-hidden shadow-[0_2px_40px_-12px_rgba(0,0,0,0.12)] bg-card"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={activeProduct.img}
                alt={activeProduct.label}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="w-full object-cover"
                loading="lazy"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══ VIDEO ═══ */}
      <section id="video" className="pb-24 px-5">
        <div className="mx-auto max-w-[860px]">
          <div className="relative rounded-xl overflow-hidden bg-muted border border-border/60 aspect-video cursor-pointer group">
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="h-16 w-16 rounded-full bg-foreground flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
                <Play className="h-6 w-6 text-background fill-current ml-0.5" />
              </div>
              <p className="text-[13px] text-muted-foreground font-medium">Watch the 2-minute product walkthrough</p>
            </div>
          </div>
          <p className="text-center text-[11px] text-muted-foreground/60 mt-3">
            Upload your recorded product demo video here
          </p>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" className="py-24 px-5">
        <div className="mx-auto max-w-[1000px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fade}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Everything your agency needs.
            </h2>
            <p className="text-muted-foreground mt-3 text-[15px] max-w-md mx-auto">
              From cost tracking to team capacity planning — purpose-built for agency operations.
            </p>
          </motion.div>

          <div className="grid gap-px sm:grid-cols-2 lg:grid-cols-3 bg-border/60 rounded-xl overflow-hidden border border-border/60">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                className="bg-background p-8 hover:bg-muted/30 transition-colors"
              >
                <f.icon className="h-5 w-5 text-muted-foreground mb-4" />
                <h3 className="font-medium text-[15px] mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {f.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section id="testimonials" className="py-24 px-5 border-t border-border/60">
        <div className="mx-auto max-w-[1000px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <h2
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em] text-center"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Loved by agency founders.
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-xl border border-border/60 p-7 bg-background hover:border-border transition-colors"
              >
                <p className="text-[14px] text-foreground leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-medium">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" className="py-24 px-5 border-t border-border/60">
        <div className="mx-auto max-w-[920px]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fade}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2
              className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em]"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Simple pricing.
            </h2>
            <p className="text-muted-foreground mt-3 text-[15px]">
              Start free, upgrade as you grow.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {planKeys.map((key, i) => {
              const plan = PLAN_LIMITS[key];
              const popular = key === 'growth';
              return (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                >
                  <div
                    className={`rounded-xl border p-7 h-full flex flex-col transition-colors ${
                      popular
                        ? 'border-foreground bg-foreground text-background'
                        : 'border-border/60 bg-background hover:border-border'
                    }`}
                  >
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-[15px] font-medium" style={{ fontFamily: 'var(--font-display)' }}>
                          {plan.label}
                        </h3>
                        {popular && (
                          <span className="text-[10px] uppercase tracking-wider bg-primary text-primary-foreground px-2 py-0.5 rounded font-medium">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className={`text-[12px] ${popular ? 'text-background/60' : 'text-muted-foreground'}`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <span className="text-3xl font-semibold font-mono tracking-tight">{fmt(plan.price)}</span>
                      <span className={`text-[12px] ${popular ? 'text-background/60' : 'text-muted-foreground'}`}> /month</span>
                    </div>

                    <div className="space-y-2.5 flex-1 mb-6">
                      {[
                        `${plan.maxClients === Infinity ? 'Unlimited' : `Up to ${plan.maxClients}`} clients`,
                        `${plan.maxEmployees === Infinity ? 'Unlimited' : `Up to ${plan.maxEmployees}`} employees`,
                        plan.fullReports ? 'Full reports & analytics' : 'Basic reports',
                        'Team collaboration',
                        'Data isolation & security',
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-2 text-[13px]">
                          <Check className={`h-3.5 w-3.5 flex-shrink-0 ${popular ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full h-9 rounded-lg text-[13px] ${
                        popular
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                          : 'bg-foreground text-background hover:bg-foreground/90'
                      }`}
                      asChild
                    >
                      <Link to="/signup">Get started</Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="py-24 px-5 border-t border-border/60">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fade}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[520px] text-center"
        >
          <h2
            className="text-[clamp(1.75rem,4vw,2.75rem)] font-medium tracking-[-0.03em]"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ready to take control?
          </h2>
          <p className="text-muted-foreground mt-3 text-[15px] leading-relaxed">
            Join agencies that use AgencyOS to make smarter financial decisions every day.
          </p>
          <div className="mt-8 flex items-center justify-center gap-3">
            <Button className="h-10 px-6 rounded-lg bg-foreground text-background hover:bg-foreground/90 text-[13px] font-medium" asChild>
              <Link to="/signup">
                Start your free trial <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
          <p className="mt-4 text-[12px] text-muted-foreground">
            Free 14-day trial · No credit card required
          </p>
        </motion.div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-border/60 py-8 px-5">
        <div className="mx-auto max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4" />
            <span className="text-[13px] font-semibold" style={{ fontFamily: 'var(--font-display)' }}>AgencyOS</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/#features" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="/#pricing" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
            <a href="/#testimonials" className="text-[12px] text-muted-foreground hover:text-foreground transition-colors">Customers</a>
          </div>
          <p className="text-[11px] text-muted-foreground">© 2026 AgencyOS</p>
        </div>
      </footer>
    </div>
  );
}
