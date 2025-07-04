import { Logo } from "@/components/Logo/Logo";
import { cn } from "@/lib/utils";
import { BookOpen, PlusSquare, ListOrdered, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import { ModeToggle } from "@/components/mode-toggler";

const navItems = [
    { name: "All Books", path: "/books", icon: BookOpen },
    { name: "Add Book", path: "/create-book", icon: PlusSquare },
    { name: "Borrow Summary", path: "/borrow-summary", icon: ListOrdered },
];

export default function Navbar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleNavLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className="w-full bg-white dark:bg-gray-950 shadow-sm px-4 py-3 border-b">
            <div className=" mx-auto flex items-center justify-between">

                <Link to="/" className="text-xl font-semibold text-primary hover:opacity-80 " onClick={handleNavLinkClick}>
                    <Logo />
                </Link>


                <div className="md:hidden">
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-700 dark:text-gray-500 hover:text-primary dark:hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                        aria-label="Toggle navigation menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>


                <div className="flex gap-6">
                    <ModeToggle />
                    <ul className="hidden md:flex items-center gap-6">
                        {navItems.map(({ name, path, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={cn(
                                            "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-white dark:bg-secondary"
                                                : "text-muted-foreground hover:text-primary"
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            {isMobileMenuOpen && (
                <div className="md:hidden mt-4 pb-2">
                    <ul className="flex flex-col gap-2">
                        {navItems.map(({ name, path, icon: Icon }) => {
                            const isActive = location.pathname === path;
                            return (
                                <li key={path}>
                                    <Link
                                        to={path}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-3 rounded-md text-base font-medium transition-colors",
                                            isActive
                                                ? "bg-primary text-white"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary dark:hover:text-primary"
                                        )}
                                        onClick={handleNavLinkClick}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{name}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </nav>
    );
}