import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNav from '@/components/PublicNav';
import { Button } from '@/components/ui/button';
import {
  Zap, BarChart3, Users, Shield, FileText,
  Briefcase, Calculator, Check, ArrowRight, Play,
  ChevronRight, Sparkles,
} from 'lucide-react';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';
import { motion, AnimatePresence } from 'framer-motion';

import dashboardImg from '@/assets/dashboard-preview.jpg';
import clientsImg from '@/assets/clients-preview.jpg';
import analyticsImg from '@/assets/analytics-preview.jpg';

const features = [
  { icon: BarChart3, title: 'Real-Time Margins', desc: 'Auto-calculated margins and cost breakdowns for every client.' },
  { icon: Users, title: 'Team Utilization', desc: 'Monitor workloads and capacity across your entire team.' },
  { icon: Calculator, title: 'Per-Unit Costing', desc: 'Know the exact cost of every reel, static, and shoot day.' },
  { icon: Briefcase, title: 'Client Management', desc: 'Manage retainers, deliverables, and scopes effortlessly.' },
  { icon: FileText, title: 'Contract Tracking', desc: 'Automatic renewal alerts and contract value tracking.' },
  { icon: Shield, title: 'Data Isolation', desc: 'Enterprise-grade security with complete tenant isolation.' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Founder, Pixel Perfect',
    quote: 'AgencyOS transformed how we track margins. We went from guessing profitability to knowing it in real-time. Absolutely essential.',
    avatar: 'PS',
  },
  {
    name: 'Rahul Mehta',
    role: 'CEO, Catalyst Digital',
    quote: 'The per-unit costing alone saved us ₹2L/month by spotting underpriced clients. This is the tool we always needed.',
    avatar: 'RM',
  },
  {
    name: 'Ananya Desai',
    role: 'Co-Founder, Brandwave',
    quote: 'We tried 5 different tools before this. The team utilization view is genuinely incredible — nothing else compares.',
    avatar: 'AD',
  },
];

const productTabs = [
  { key: 'dashboard', label: 'Dashboard', img: dashboardImg },
  { key: 'clients', label: 'Clients', img: clientsImg },
  { key: 'reports', label: 'Reports', img: analyticsImg },
];

const planKeys = ['starter', 'growth', 'pro'] as const;

export default function Landing() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const activeProduct = productTabs.find((t) => t.key === activeTab)!;

  return (
    <div className="min-h-screen bg-background antialiased">
      <PublicNav />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="pt-28 pb-4 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          className="mx-auto max-w-[680px] text-center"
        >
          {/* Announcement */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/80 bg-muted/40 text-[12px] text-muted-foreground hover:border-border hover:bg-muted/60 transition-all duration-200 mb-10"
            >
              <Sparkles className="h-3 w-3 text-primary" />
              <span>Introducing AI-powered margin insights</span>
              <ChevronRight className="h-3 w-3" />
            </Link>
          </motion.div>

          {/* Headline */}
          <h1 className="text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.04em] font-normal">
            <span className="font-display italic">Agency</span>
            {' '}financial
            <br />
            intelligence.
          </h1>

          {/* Subhead */}
          <p className="mt-7 text-[17px] leading-[1.6] text-muted-foreground max-w-[420px] mx-auto">
            The operating system for agency finances. Track margins, utilization, and profitability — beautifully.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 mt-9">
            <Button 
              className="h-11 px-6 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[14px] font-medium shadow-sm" 
              asChild
            >
              <Link to="/signup">
                Start for free
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="h-11 px-6 rounded-full text-[14px] font-medium border-border/80 hover:bg-muted/50" 
              asChild
            >
              <a href="#video">
                <Play className="mr-1.5 h-3.5 w-3.5 fill-current" />
                Watch demo
              </a>
            </Button>
          </div>

          <p className="mt-5 text-[12px] text-muted-foreground/70">
            Free 14-day trial · No credit card required
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ PRODUCT TABS ═══════════════ */}
      <section id="product" className="pt-16 pb-28 px-5">
        <div className="mx-auto max-w-[980px]">
          {/* Tabs */}
          <div className="flex items-center justify-center mb-5">
            <div className="inline-flex p-1 rounded-full bg-muted/60 border border-border/50">
              {productTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-200 ${
                    activeTab === tab.key
                      ? 'text-foreground'
                      : 'text-muted-foreground hover:text-foreground/80'
                  }`}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="active-tab"
                      className="absolute inset-0 bg-background rounded-full shadow-sm border border-border/60"
                      transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-2xl border border-border/70 overflow-hidden bg-card shadow-[0_8px_60px_-12px_rgba(0,0,0,0.08)]"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5 pointer-events-none z-10" />
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={activeProduct.img}
                alt={activeProduct.label}
                initial={{ opacity: 0, scale: 1.01 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.99 }}
                transition={{ duration: 0.3 }}
                className="w-full"
                loading="eager"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VIDEO ═══════════════ */}
      <section id="video" className="pb-28 px-5">
        <div className="mx-auto max-w-[820px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-foreground/[0.03] border border-border/60 aspect-video cursor-pointer group"
          >
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="h-[72px] w-[72px] rounded-full bg-foreground flex items-center justify-center shadow-lg group-hover:scale-[1.04] transition-transform duration-300">
                <Play className="h-7 w-7 text-background fill-current ml-1" />
              </div>
              <p className="text-[13px] text-muted-foreground font-medium">
                Watch the 2-minute walkthrough
              </p>
            </div>
          </motion.div>
          <p className="text-center text-[11px] text-muted-foreground/50 mt-4">
            Replace with your recorded product demo
          </p>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="py-28 px-5 border-t border-border/50">
        <div className="mx-auto max-w-[980px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.03em]">
              Everything your{' '}
              <span className="font-display italic">agency</span>
              {' '}needs.
            </h2>
            <p className="text-muted-foreground mt-4 text-[16px] max-w-md mx-auto leading-relaxed">
              Purpose-built for creative and marketing agency operations.
            </p>
          </motion.div>

          <div className="grid gap-[1px] sm:grid-cols-2 lg:grid-cols-3 bg-border/50 rounded-2xl overflow-hidden">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-background p-8 group hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="h-10 w-10 rounded-xl bg-muted/80 flex items-center justify-center mb-5 group-hover:bg-muted transition-colors">
                  <f.icon className="h-[18px] w-[18px] text-muted-foreground" />
                </div>
                <h3 className="text-[15px] font-semibold mb-2 tracking-[-0.01em]">
                  {f.title}
                </h3>
                <p className="text-[13px] text-muted-foreground leading-[1.6]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="customers" className="py-28 px-5 border-t border-border/50">
        <div className="mx-auto max-w-[980px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.03em] text-center">
              Loved by{' '}
              <span className="font-display italic">founders</span>.
            </h2>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-border/60 p-7 bg-background hover:border-border/80 hover:shadow-sm transition-all duration-200"
              >
                <p className="text-[14px] text-foreground leading-[1.7] mb-7">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-muted-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold tracking-[-0.01em]">{t.name}</p>
                    <p className="text-[11px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-28 px-5 border-t border-border/50">
        <div className="mx-auto max-w-[900px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.03em]">
              Simple{' '}
              <span className="font-display italic">pricing</span>.
            </h2>
            <p className="text-muted-foreground mt-4 text-[16px]">
              Start free, scale as you grow.
            </p>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3">
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
                    className={`rounded-2xl border p-7 h-full flex flex-col transition-all duration-200 ${
                      popular
                        ? 'border-foreground bg-foreground text-background shadow-xl'
                        : 'border-border/60 bg-background hover:border-border/80 hover:shadow-sm'
                    }`}
                  >
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="text-[16px] font-semibold tracking-[-0.01em]">
                          {plan.label}
                        </h3>
                        {popular && (
                          <span className="text-[10px] uppercase tracking-wide bg-primary text-primary-foreground px-2 py-0.5 rounded-full font-semibold">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className={`text-[12px] leading-relaxed ${popular ? 'text-background/60' : 'text-muted-foreground'}`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-6">
                      <span className="text-[36px] font-semibold tracking-[-0.02em]">{fmt(plan.price)}</span>
                      <span className={`text-[13px] ${popular ? 'text-background/50' : 'text-muted-foreground'}`}>/mo</span>
                    </div>

                    <div className="space-y-3 flex-1 mb-7">
                      {[
                        `${plan.maxClients === Infinity ? 'Unlimited' : `Up to ${plan.maxClients}`} clients`,
                        `${plan.maxEmployees === Infinity ? 'Unlimited' : `Up to ${plan.maxEmployees}`} team members`,
                        plan.fullReports ? 'Advanced analytics' : 'Basic reports',
                        'Team collaboration',
                        'Data security',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-[13px]">
                          <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${popular ? 'text-primary' : 'text-muted-foreground'}`} />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full h-10 rounded-full text-[13px] font-medium ${
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

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-28 px-5 border-t border-border/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-[500px] text-center"
        >
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] leading-[1.1] tracking-[-0.03em]">
            Ready to take{' '}
            <span className="font-display italic">control</span>?
          </h2>
          <p className="text-muted-foreground mt-4 text-[16px] leading-relaxed">
            Join agencies making smarter financial decisions every day.
          </p>
          <div className="mt-9">
            <Button 
              className="h-12 px-8 rounded-full bg-foreground text-background hover:bg-foreground/90 text-[14px] font-medium shadow-sm" 
              asChild
            >
              <Link to="/signup">
                Start your free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-5 text-[12px] text-muted-foreground/60">
            No credit card required
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-border/50 py-8 px-5">
        <div className="mx-auto max-w-[1120px] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-5 w-5 rounded bg-foreground flex items-center justify-center">
              <Zap className="h-3 w-3 text-background" />
            </div>
            <span className="text-[13px] font-medium">AgencyOS</span>
          </div>
          <div className="flex items-center gap-6">
            {['Features', 'Pricing', 'Customers'].map((item) => (
              <a 
                key={item}
                href={`/#${item.toLowerCase()}`} 
                className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-[11px] text-muted-foreground/60">© 2026 AgencyOS</p>
        </div>
      </footer>
    </div>
  );
}
