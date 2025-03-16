
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import PoolComparison from "./pages/Analytics"; // Same file, renamed import
import PositionAnalytics from "./pages/PositionAnalytics";
import Portfolio from "./pages/Positions";
import AI from "./pages/AI";
import TelegramBot from "./pages/TelegramBot";
import MakeAWish from "./pages/MakeAWish";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider defaultTheme="system">
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analytics" element={<PoolComparison />} />
            <Route path="/position-analytics" element={<PositionAnalytics />} />
            <Route path="/positions" element={<Portfolio />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/telegram-bot" element={<TelegramBot />} />
            <Route path="/make-a-wish" element={<MakeAWish />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
