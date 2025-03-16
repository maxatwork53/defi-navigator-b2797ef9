
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChart3, 
  Home, 
  PieChart, 
  Settings, 
  Menu,
  X,
  Brain,
  Activity,
  MessageSquare,
  Star
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type LayoutProps = {
  children: React.ReactNode;
};

const SIDEBAR_LINKS = [
  { to: '/', icon: <Home className="w-5 h-5" />, label: 'Overview' },
  { to: '/analytics', icon: <BarChart3 className="w-5 h-5" />, label: 'Pool Analytics' },
  { to: '/position-analytics', icon: <Activity className="w-5 h-5" />, label: 'Position Analytics' },
  { to: '/positions', icon: <PieChart className="w-5 h-5" />, label: 'Portfolio' },
  { to: '/ai', icon: <Brain className="w-5 h-5" />, label: 'AI' },
  { to: '/telegram-bot', icon: <MessageSquare className="w-5 h-5" />, label: 'Telegram Bot' },
  { to: '/make-a-wish', icon: <Star className="w-5 h-5" />, label: 'Make A Wish' },
  { to: '/settings', icon: <Settings className="w-5 h-5" />, label: 'Settings' },
];

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <div className="flex min-h-screen bg-secondary/30">
      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-20 w-64 bg-white border-r border-border transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          isMobile ? "shadow-lg" : ""
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-border">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">DeFi Navigator</span>
          </Link>
          {isMobile && (
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 rounded-md hover:bg-secondary"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
        <nav className="p-4 space-y-1">
          {SIDEBAR_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-md transition-colors duration-200",
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground/70 hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main 
        className={cn(
          "flex-1 transition-all duration-300",
          sidebarOpen ? (isMobile ? "ml-0" : "ml-64") : "ml-0"
        )}
      >
        <header className="h-16 bg-white border-b border-border sticky top-0 z-10 px-4 flex items-center justify-between">
          {(!sidebarOpen || isMobile) && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-1.5 rounded-md hover:bg-secondary"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <div className="text-lg font-medium ml-auto">
            {SIDEBAR_LINKS.find(link => link.to === location.pathname)?.label || 'Dashboard'}
          </div>
          <div className="ml-auto">
            {/* Header content here */}
          </div>
        </header>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
