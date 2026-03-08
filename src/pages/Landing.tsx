import { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicNav from '@/components/PublicNav';
import { Button } from '@/components/ui/button';
import {
  Zap, BarChart3, Users, Shield, FileText,
  Briefcase, Calculator, Check, ArrowRight, Play,
  ArrowUpRight, Sparkles, Star,
} from 'lucide-react';
import { PLAN_LIMITS, fmt } from '@/lib/planLimits';
import { motion, AnimatePresence } from 'framer-motion';

import dashboardImg from '@/assets/dashboard-preview.jpg';
import clientsImg from '@/assets/clients-preview.jpg';
import analyticsImg from '@/assets/analytics-preview.jpg';

const features = [
  { icon: BarChart3, title: 'Real-Time Margins', desc: 'Auto-calculated margins and cost breakdowns for every client, every day.' },
  { icon: Users, title: 'Team Utilization', desc: 'Monitor workloads and capacity across your entire team effortlessly.' },
  { icon: Calculator, title: 'Per-Unit Costing', desc: 'Know the exact cost of every reel, static, and shoot day produced.' },
  { icon: Briefcase, title: 'Client Management', desc: 'Manage retainers, deliverables, and scopes all in one place.' },
  { icon: FileText, title: 'Contract Tracking', desc: 'Automatic renewal alerts and contract value tracking built in.' },
  { icon: Shield, title: 'Data Isolation', desc: 'Enterprise-grade security with complete tenant data isolation.' },
];

const testimonials = [
  { name: 'Priya Sharma', role: 'Founder, Pixel Perfect', quote: 'AgencyOS transformed how we track margins. We went from guessing profitability to knowing it in real-time.', avatar: 'PS' },
  { name: 'Rahul Mehta', role: 'CEO, Catalyst Digital', quote: 'The per-unit costing alone saved us ₹2L/month by spotting underpriced clients. Essential tool.', avatar: 'RM' },
  { name: 'Ananya Desai', role: 'Co-Founder, Brandwave', quote: 'We tried 5 different tools before this. The team utilization view is genuinely incredible.', avatar: 'AD' },
];

const productTabs = [
  { key: 'dashboard', label: 'Dashboard', img: dashboardImg },
  { key: 'clients', label: 'Clients', img: clientsImg },
  { key: 'reports', label: 'Reporting', img: analyticsImg },
];

const stats = [
  { value: '500+', label: 'Agencies Onboarded' },
  { value: '₹12Cr+', label: 'Revenue Tracked' },
  { value: '99.9%', label: 'Uptime' },
  { value: '4.9/5', label: 'User Rating' },
];

const planKeys = ['starter', 'growth', 'pro'] as const;

export default function Landing() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const activeProduct = productTabs.find((t) => t.key === activeTab)!;

  return (
    <div className="min-h-screen bg-[hsl(0,0%,4%)] text-white antialiased overflow-x-hidden">
      <PublicNav />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-36 pb-8 px-5">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,hsl(48,96%,53%,0.12),transparent_70%)] pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative z-10 mx-auto max-w-[1100px] grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Left - Copy */}
          <div>
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[hsl(0,0%,14%)] bg-[hsl(0,0%,7%)] text-[12px] text-[hsl(0,0%,55%)] mb-8"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              AGENCY FINANCE OS
            </motion.div>

            <h1 className="text-[clamp(2.8rem,6vw,4.5rem)] leading-[0.95] tracking-[-0.04em] font-normal text-white">
              Agency Owners
              <br />
              Are Builders,{' '}
              <span className="text-[hsl(0,0%,40%)]">Not</span>
              <br />
              <span className="text-primary">Accountants.</span>
            </h1>

            <p className="mt-7 text-[17px] leading-[1.7] text-[hsl(0,0%,45%)] max-w-[440px]">
              Let AgencyOS handle the financial complexity: margin tracking, team utilization, and profitability insights — so you stay focused on growing your agency.
            </p>

            <div className="flex items-center gap-3.5 mt-9">
              <Button
                className="h-12 px-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-[15px] font-medium shadow-[0_0_30px_hsl(48,96%,53%,0.2)]"
                asChild
              >
                <Link to="/signup">
                  Start Free Trial
                  <ArrowUpRight className="ml-1.5 h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                className="h-12 px-5 rounded-full text-[15px] font-medium border border-[hsl(0,0%,14%)] text-white hover:bg-white/5"
                asChild
              >
                <a href="#video">
                  <Play className="mr-2 h-4 w-4 fill-current" />
                  Watch Demo
                </a>
              </Button>
            </div>

            <p className="mt-6 text-[12px] text-[hsl(0,0%,35%)]">
              Free 14-day trial · No credit card required
            </p>
          </div>

          {/* Right - Product preview with glow */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute -inset-8 bg-[radial-gradient(ellipse_at_center,hsl(48,96%,53%,0.08),transparent_70%)] pointer-events-none" />
            <div className="relative rounded-2xl border border-[hsl(0,0%,14%)] overflow-hidden shadow-[0_20px_80px_-20px_hsl(48,96%,53%,0.15)]">
              <img src={dashboardImg} alt="AgencyOS Dashboard" className="w-full" />
            </div>
            {/* Floating stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,14%)] rounded-xl p-4 shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-[20px] font-semibold text-primary">+42%</p>
                  <p className="text-[11px] text-[hsl(0,0%,45%)]">Avg. Margin Increase</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════ STATS BAR ═══════════════ */}
      <section className="py-16 px-5 border-t border-[hsl(0,0%,10%)]">
        <div className="mx-auto max-w-[1100px] grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="text-[32px] font-semibold tracking-[-0.02em] text-white">{s.value}</p>
              <p className="text-[13px] text-[hsl(0,0%,40%)] mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══════════════ PRODUCT TABS ═══════════════ */}
      <section id="product" className="py-24 px-5">
        <div className="mx-auto max-w-[1000px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-[12px] uppercase tracking-[0.15em] text-primary font-medium">ALL-IN-ONE SUITE</span>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-white">
              Stop Switching Between Tools.
            </h2>
            <p className="text-[hsl(0,0%,45%)] mt-4 text-[16px] max-w-md mx-auto leading-relaxed">
              Everything from client management to profitability analytics. One unified platform.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex p-1 rounded-full bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,14%)]">
              {productTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`relative px-6 py-2.5 text-[13px] font-medium rounded-full transition-all duration-200 ${
                    activeTab === tab.key ? 'text-primary-foreground' : 'text-[hsl(0,0%,45%)] hover:text-white'
                  }`}
                >
                  {activeTab === tab.key && (
                    <motion.div
                      layoutId="active-dark-tab"
                      className="absolute inset-0 bg-primary rounded-full shadow-[0_0_20px_hsl(48,96%,53%,0.2)]"
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
            className="relative rounded-2xl border border-[hsl(0,0%,14%)] overflow-hidden bg-[hsl(0,0%,7%)] shadow-[0_20px_80px_-20px_hsl(0,0%,0%,0.5)]"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={activeTab}
                src={activeProduct.img}
                alt={activeProduct.label}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="w-full"
                loading="eager"
              />
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ VIDEO ═══════════════ */}
      <section id="video" className="pb-24 px-5">
        <div className="mx-auto max-w-[880px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl overflow-hidden bg-[hsl(0,0%,7%)] border border-[hsl(0,0%,14%)] aspect-video cursor-pointer group"
          >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(48,96%,53%,0.04),transparent_70%)]" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
              <div className="h-[80px] w-[80px] rounded-full bg-primary flex items-center justify-center shadow-[0_0_40px_hsl(48,96%,53%,0.3)] group-hover:scale-105 transition-transform duration-300">
                <Play className="h-8 w-8 text-primary-foreground fill-current ml-1" />
              </div>
              <p className="text-[14px] text-[hsl(0,0%,45%)] font-medium">
                Watch the 2-minute walkthrough
              </p>
            </div>
          </motion.div>
          <p className="text-center text-[11px] text-[hsl(0,0%,25%)] mt-4">
            Replace with your recorded product demo
          </p>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section id="features" className="py-24 px-5 border-t border-[hsl(0,0%,10%)]">
        <div className="mx-auto max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <span className="text-[12px] uppercase tracking-[0.15em] text-primary font-medium">FUTURE OF AGENCIES</span>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-white">
              The OS built for agencies,
              <br />by agency founders.
            </h2>
            <p className="text-[hsl(0,0%,45%)] mt-4 text-[16px] max-w-md mx-auto leading-relaxed">
              Simple. Smart. Purpose-built for creative and marketing agencies.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl border border-[hsl(0,0%,10%)] bg-[hsl(0,0%,6%)] p-7 group hover:border-[hsl(0,0%,16%)] hover:bg-[hsl(0,0%,7%)] transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-[hsl(0,0%,10%)] flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors duration-300">
                  <f.icon className="h-5 w-5 text-[hsl(0,0%,45%)] group-hover:text-primary transition-colors duration-300" />
                </div>
                <h3 className="text-[16px] font-semibold mb-2.5 tracking-[-0.01em] text-white">
                  {f.title}
                </h3>
                <p className="text-[14px] text-[hsl(0,0%,40%)] leading-[1.7]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="customers" className="py-24 px-5 border-t border-[hsl(0,0%,10%)]">
        <div className="mx-auto max-w-[1100px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-6"
          >
            <p className="text-[14px] text-primary font-medium mb-4">★★★★★</p>
            <h2 className="text-[clamp(1.5rem,4vw,2.2rem)] leading-[1.2] tracking-[-0.02em] text-white max-w-lg mx-auto">
              500+ agencies trust AgencyOS for their financial operations.
            </h2>
          </motion.div>

          <div className="grid gap-4 md:grid-cols-3 mt-12">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl border border-[hsl(0,0%,10%)] bg-[hsl(0,0%,6%)] p-7 hover:border-[hsl(0,0%,16%)] transition-all duration-300"
              >
                <div className="flex gap-0.5 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-[14px] text-[hsl(0,0%,70%)] leading-[1.7] mb-7">
                  "{t.quote}"
                </p>
                <div className="flex items-center gap-3 pt-5 border-t border-[hsl(0,0%,10%)]">
                  <div className="h-10 w-10 rounded-full bg-[hsl(0,0%,10%)] flex items-center justify-center text-[12px] font-semibold text-[hsl(0,0%,55%)]">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-white">{t.name}</p>
                    <p className="text-[11px] text-[hsl(0,0%,40%)]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ PRICING ═══════════════ */}
      <section id="pricing" className="py-24 px-5 border-t border-[hsl(0,0%,10%)]">
        <div className="mx-auto max-w-[960px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <span className="text-[12px] uppercase tracking-[0.15em] text-primary font-medium">PLANS</span>
            <h2 className="mt-4 text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-white">
              Simple, transparent pricing.
            </h2>
            <p className="text-[hsl(0,0%,45%)] mt-4 text-[16px]">
              Start free, scale as your agency grows.
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
                  <div className={`rounded-2xl border p-7 h-full flex flex-col transition-all duration-300 ${
                    popular
                      ? 'border-primary bg-primary text-primary-foreground shadow-[0_0_60px_-15px_hsl(48,96%,53%,0.25)]'
                      : 'border-[hsl(0,0%,10%)] bg-[hsl(0,0%,6%)] hover:border-[hsl(0,0%,16%)]'
                  }`}>
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[17px] font-semibold tracking-[-0.01em]">{plan.label}</h3>
                        {popular && (
                          <span className="text-[10px] uppercase tracking-wider bg-primary-foreground text-primary px-2.5 py-0.5 rounded-full font-bold">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className={`text-[13px] leading-relaxed ${popular ? 'text-primary-foreground/60' : 'text-[hsl(0,0%,40%)]'}`}>
                        {plan.description}
                      </p>
                    </div>

                    <div className="mb-7">
                      <span className="text-[40px] font-semibold tracking-[-0.03em]">{fmt(plan.price)}</span>
                      <span className={`text-[14px] ${popular ? 'text-primary-foreground/50' : 'text-[hsl(0,0%,35%)]'}`}>/mo</span>
                    </div>

                    <div className="space-y-3.5 flex-1 mb-8">
                      {[
                        `${plan.maxClients === Infinity ? 'Unlimited' : `Up to ${plan.maxClients}`} clients`,
                        `${plan.maxEmployees === Infinity ? 'Unlimited' : `Up to ${plan.maxEmployees}`} team members`,
                        plan.fullReports ? 'Advanced analytics' : 'Basic reports',
                        'Team collaboration',
                        'Data security & isolation',
                      ].map((item) => (
                        <div key={item} className="flex items-start gap-2.5 text-[13px]">
                          <Check className={`h-4 w-4 flex-shrink-0 mt-0.5 ${popular ? 'text-primary-foreground' : 'text-primary'}`} />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      className={`w-full h-11 rounded-full text-[14px] font-medium ${
                        popular
                          ? 'bg-primary-foreground text-primary hover:bg-primary-foreground/90'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                      asChild
                    >
                      <Link to="/signup">Get started <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link>
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="py-28 px-5 border-t border-[hsl(0,0%,10%)] relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(48,96%,53%,0.06),transparent_60%)] pointer-events-none" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative z-10 mx-auto max-w-[560px] text-center"
        >
          <h2 className="text-[clamp(2rem,5vw,3.2rem)] leading-[1.05] tracking-[-0.03em] text-white">
            Ready to take control of your agency finances?
          </h2>
          <p className="text-[hsl(0,0%,45%)] mt-5 text-[16px] leading-relaxed">
            Join 500+ agencies making smarter financial decisions every day.
          </p>
          <div className="mt-9">
            <Button
              className="h-13 px-8 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-[15px] font-medium shadow-[0_0_40px_hsl(48,96%,53%,0.25)]"
              asChild
            >
              <Link to="/signup">
                Start your free trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <p className="mt-6 text-[12px] text-[hsl(0,0%,30%)]">
            No credit card required
          </p>
        </motion.div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-[hsl(0,0%,10%)] py-10 px-5">
        <div className="mx-auto max-w-[1100px] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="text-[14px] font-semibold text-white">AgencyOS</span>
          </div>
          <div className="flex items-center gap-8">
            {['Features', 'Pricing', 'Customers'].map((item) => (
              <a
                key={item}
                href={`/#${item.toLowerCase()}`}
                className="text-[13px] text-[hsl(0,0%,40%)] hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-[12px] text-[hsl(0,0%,25%)]">© 2026 AgencyOS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
