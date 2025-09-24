"use client";

import { Car, Search, GitCompare, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-premium-gradient rounded-lg">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">SupaMotors</span>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary smooth-transition">Home</a>
            <a href="/catalog" className="text-foreground hover:text-primary smooth-transition">Catalog</a>
            <a href="/compare" className="text-foreground hover:text-primary smooth-transition">Compare</a>
            <a href="/favorites" className="text-foreground hover:text-primary smooth-transition">Favorites</a>
          </div>

          {/* Icons / Sign In */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <GitCompare className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground hover:text-primary">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="sm" className="text-foreground border-border hover:bg-accent">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </div>

        </div>
      </div>
    </nav>
  );
}
