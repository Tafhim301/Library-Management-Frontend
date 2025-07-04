// components/Footer.tsx

import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";
import { Facebook, Twitter, Github, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
      
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm text-muted-foreground">
       
          <div>
            <h2 className="text-lg font-bold text-primary">LibraryApp</h2>
            <p className="mt-2 text-xs text-muted-foreground">
              A minimalist library management system built with React & ShadCN.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" aria-label="Facebook" className="hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="https://github.com/Tafhim301" aria-label="GitHub" className="hover:text-primary">
                <Github className="h-5 w-5" />
              </a>
              <a href="mailto:tafhimul301@gmail.com" className="hover:text-primary">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="hover:text-primary transition-colors">
                  All Books
                </Link>
              </li>
              <li>
                <Link to="/add-book" className="hover:text-primary transition-colors">
                  Add Book
                </Link>
              </li>
              <li>
                <Link to="/borrow-summary" className="hover:text-primary transition-colors">
                  Borrow Summary
                </Link>
              </li>
            </ul>
          </div>

          {/* Support or Info */}
          <div>
            <h3 className="text-sm font-semibold mb-2 text-foreground">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LibraryApp. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://github.com/Tafhim301"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary"
            >
              Tafhimul Islam
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
