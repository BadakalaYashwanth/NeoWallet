
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Transactions from "./pages/Transactions";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import SendMoney from "./pages/Send";
import ReceiveMoney from "./pages/Receive";
import SplitBills from "./pages/Split";
import Banking from "./pages/Banking";
import Budget from "./pages/Budget";
import InternationalTransfer from "./pages/InternationalTransfer";
import FinancialAssistant from "./pages/FinancialAssistant";
import Calculator from "./pages/Calculator";
import { useKeyboardShortcuts } from "./utils/keyboardShortcuts";
import * as React from "react";
import { ThemeProvider } from "@/context/ThemeContext";
import { PaymentGatewayProvider } from "@/context/PaymentGatewayContext";

const queryClient = new QueryClient();

// Component to handle keyboard shortcuts
const KeyboardShortcutsHandler = () => {
  useKeyboardShortcuts();
  return null;
};

const App = () => {
  return (
    <ThemeProvider>
      <PaymentGatewayProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <KeyboardShortcutsHandler />
              <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
                <Navbar />
                <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
                  <div className="fade-in">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/budget" element={<Budget />} />
                      <Route path="/transactions" element={<Transactions />} />
                      <Route path="/notifications" element={<Notifications />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/send" element={<SendMoney />} />
                      <Route path="/receive" element={<ReceiveMoney />} />
                      <Route path="/split" element={<SplitBills />} />
                      <Route path="/banking" element={<Banking />} />
                      <Route path="/international" element={<InternationalTransfer />} />
                      <Route path="/assistant" element={<FinancialAssistant />} />
                      <Route path="/calculator" element={<Calculator />} />
                    </Routes>
                  </div>
                </main>
              </div>
              <Toaster />
              <Sonner />
            </TooltipProvider>
          </QueryClientProvider>
        </BrowserRouter>
      </PaymentGatewayProvider>
    </ThemeProvider>
  );
};

export default App;
