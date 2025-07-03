import { Logo } from "@/components/Logo/logo";
import { cn } from "@/lib/utils";
import { BookOpen, PlusSquare, ListOrdered } from "lucide-react";
import { Link, useLocation } from "react-router";

const navItems = [
    { name: "All Books", path: "/books", icon: BookOpen },
    { name: "Add Book", path: "/create-book", icon: PlusSquare },
    { name: "Borrow Summary", path: "/borrow-summary", icon: ListOrdered },
];

export default function Navbar() {
    const location = useLocation();

    return (
        <nav className="w-full bg-white dark:bg-gray-950 shadow-sm px-4 py-3 border-b">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="text-xl font-semibold text-primary hover:opacity-80 ">
                    <Logo />
                </Link>
                <ul className="flex items-center gap-6">
                    {navItems.map(({ name, path, icon: Icon }) => {
                        const isActive = location.pathname === path;
                        return (
                            <li key={path}>
                                <Link
                                    to={path}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-primary text-white"
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
        </nav>
    );
}
