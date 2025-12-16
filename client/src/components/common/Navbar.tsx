import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-shock flex items-center justify-center">
              <Zap className="w-4 h-4 text-foreground" />
            </div>
            <span className="font-bold text-foreground hidden sm:block">Skill Gap Shock</span>
          </button>

          {/* CTA */}
          <div className="flex items-center gap-4">
            {!isHome && (
              <Button variant="ghost" onClick={() => navigate('/')}>
                Home
              </Button>
            )}
            <Button 
              variant="shock" 
              size="sm"
              onClick={() => navigate('/analyze')}
            >
              Start Analysis
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
