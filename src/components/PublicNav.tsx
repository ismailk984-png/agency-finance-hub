import { Link } from 'react-router-dom';
import { Zap, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl flex items-center justify-between h-16 px-5 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Zap className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            AgencyOS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="/#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
          <a href="/#screenshots" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Product</a>
          <a href="/#testimonials" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          <a href="/#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" className="rounded-full px-5" asChild>
            <Link to="/signup">Start Free →</Link>
          </Button>
        </div>

        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border/50 bg-background overflow-hidden"
          >
            <div className="px-5 py-4 space-y-3">
              <a href="/#features" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Features</a>
              <a href="/#screenshots" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Product</a>
              <a href="/#testimonials" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Testimonials</a>
              <a href="/#pricing" className="block text-sm text-muted-foreground" onClick={() => setMobileOpen(false)}>Pricing</a>
              <div className="pt-2 flex gap-3">
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <Link to="/login">Log In</Link>
                </Button>
                <Button size="sm" asChild className="flex-1 rounded-full">
                  <Link to="/signup">Start Free</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
