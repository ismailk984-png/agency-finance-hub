import { Link } from 'react-router-dom';
import { Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between h-14 px-5">
        <Link to="/" className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          <span className="text-[15px] font-semibold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            AgencyOS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          <a href="/#features" className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-md">
            Features
          </a>
          <a href="/#product" className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-md">
            Product
          </a>
          <a href="/#testimonials" className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-md">
            Customers
          </a>
          <a href="/#pricing" className="px-3 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors rounded-md">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-[13px] h-8 px-3" asChild>
            <Link to="/login">Sign in</Link>
          </Button>
          <Button size="sm" className="text-[13px] h-8 px-4 rounded-lg bg-foreground text-background hover:bg-foreground/90" asChild>
            <Link to="/signup">Start for free</Link>
          </Button>
        </div>
      </div>
      <div className="h-px bg-border/60" />
    </nav>
  );
}
