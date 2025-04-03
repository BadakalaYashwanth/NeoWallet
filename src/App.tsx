
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
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

const queryClient = new QueryClient();

// Component to handle keyboard shortcuts
const KeyboardShortcutsHandler = () => {
  useKeyboardShortcuts();
  return null;
};

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <KeyboardShortcutsHandler />
          <div className="flex min-h-screen bg-background">
            <Sidebar />
            <main className="flex-1 md:ml-64 p-4 md:p-8 pt-16 md:pt-8">
              <div className="max-w-7xl mx-auto">
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
  );
};

export default App;
