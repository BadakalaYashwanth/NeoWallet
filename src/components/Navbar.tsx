
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Wallet, User, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Transactions", path: "/transactions" },
    { label: "Send Money", path: "/send" },
    { label: "Analytics", path: "/analytics" },
];

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
            <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

                {/* Logo Section */}
                <div className="flex items-center gap-2">
                    <Link to="/" className="flex items-center gap-2 text-primary hover:opacity-90 transition-opacity">
                        <Wallet className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold tracking-tight text-primary">NeoWallet</span>
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                location.pathname === item.path
                                    ? "text-primary font-semibold border-b-2 border-accent pb-1"
                                    : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Right Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <Bell className="h-5 w-5" />
                    </Button>
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold rounded-full px-6">
                        Get Started
                    </Button>
                </div>

                {/* Mobile Menu Trigger */}
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-primary">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 mt-8">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        onClick={() => setIsOpen(false)}
                                        className={cn(
                                            "text-lg font-medium transition-colors hover:text-primary",
                                            location.pathname === item.path
                                                ? "text-primary font-bold"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                <div className="h-px bg-border my-2" />
                                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-lg font-medium text-muted-foreground hover:text-primary">
                                    <User className="h-5 w-5" />
                                    Profile
                                </Link>
                                <Button className="bg-accent text-accent-foreground w-full mt-4">
                                    Get Started
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
