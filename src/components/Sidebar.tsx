
import { useState } from "react";
import { Home, PieChart, Settings, User, CreditCard, Bell, Send, Download, Users, Wallet, Building, Coins, Menu, X, Bot, Calculator } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const menuItems = [
  { icon: Home, label: "Dashboard", path: "/" },
  { icon: Bot, label: "Financial Assistant", path: "/assistant" },
  { icon: Calculator, label: "Calculator", path: "/calculator" },
  { icon: PieChart, label: "Analytics", path: "/analytics" },
  { icon: Coins, label: "Budget", path: "/budget" },
  { icon: CreditCard, label: "Transactions", path: "/transactions" },
  { icon: Building, label: "Banking", path: "/banking" },
  { icon: Send, label: "Send Money", path: "/send" },
  { icon: Download, label: "Receive", path: "/receive" },
  { icon: Users, label: "Split Bills", path: "/split" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: User, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-6">
        <div className="flex items-center gap-2">
          <Wallet className="h-6 w-6 text-purple-500" />
          <h2 className="text-2xl font-bold text-white">NeoWallet</h2>
        </div>
      </div>
      
      <nav className="flex-1 px-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                    "hover:bg-white/10",
                    isActive ? "bg-white/10 text-white" : "text-gray-400"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 mt-auto">
        <div className="flex items-center gap-3 px-4 py-3">
          <User className="h-8 w-8 rounded-full bg-purple-500/20 p-1 text-purple-500" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Yashwanth</span>
            <span className="text-xs text-gray-400">India</span>
          </div>
        </div>
      </div>
    </div>
  );

  // For mobile screens, render a slidable sidebar
  return (
    <>
      {/* Mobile menu button (visible only on small screens) */}
      <button 
        className="fixed left-4 top-4 z-40 md:hidden p-2 rounded-md bg-background/80 backdrop-blur-sm"
        onClick={() => setOpen(!open)}
      >
        <Menu className="h-6 w-6 text-white" />
      </button>

      {/* Desktop sidebar (hidden on small screens) */}
      <div className="hidden md:block fixed left-0 top-0 h-full w-64 glass-card border-r border-white/10">
        <SidebarContent />
      </div>
      
      {/* Mobile sidebar with sheet component */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="p-0 glass-card border-r border-white/10 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Sidebar;
