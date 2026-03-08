import { Link } from 'react-router-dom';
import { Zap, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto max-w-[1200px] flex items-center justify-between h-[60px] px-6">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="text-[16px] font-semibold tracking-[-0.02em] text-foreground">
            AgencyOS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {['Home', 'Features', 'Pricing', 'Customers'].map((item) => (
            <a
              key={item}
              href={item === 'Home' ? '#' : `/#${item.toLowerCase()}`}
              className="px-4 py-2 text-[14px] text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="text-[14px] h-9 px-4 text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-full"
            asChild
          >
            <Link to="/login">Login <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link>
          </Button>
          <Button
            size="sm"
            className="text-[14px] h-9 px-5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
            asChild
          >
            <Link to="/signup">Book A Demo <ArrowUpRight className="h-3.5 w-3.5 ml-1" /></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
