import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PublicNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-lg">
      <div className="mx-auto max-w-[1120px] flex items-center justify-between h-[52px] px-5">
        <Link to="/" className="flex items-center gap-1.5 group">
          <div className="h-6 w-6 rounded-md bg-foreground flex items-center justify-center">
            <Zap className="h-3.5 w-3.5 text-background" />
          </div>
          <span className="text-[15px] font-medium tracking-[-0.01em]">
            AgencyOS
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-0.5">
          {['Features', 'Product', 'Customers', 'Pricing'].map((item) => (
            <a
              key={item}
              href={`/#${item.toLowerCase()}`}
              className="px-3.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-150"
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-[13px] h-8 px-3 text-muted-foreground hover:text-foreground hover:bg-transparent" 
            asChild
          >
            <Link to="/login">Sign in</Link>
          </Button>
          <Button 
            size="sm" 
            className="text-[13px] h-8 px-4 rounded-full bg-foreground text-background hover:bg-foreground/90 font-medium" 
            asChild
          >
            <Link to="/signup">Start for free</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
