"use client";

import { Car, Search, GitCompare, Heart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground hover:text-primary smooth-transition">Home</a>
            <a href="/catalog" className="text-foreground hover:text-primary smooth-transition">Catalog</a>
            <a href="/compare" className="text-foreground hover:text-primary smooth-transition">Compare</a>
            <a href="/favorites" className="text-foreground hover:text-primary smooth-transition">Favorites</a>
          </div>

          {/* Icons + Mobile Menu Toggle */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-accent"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-t px-4 py-4 space-y-4 shadow-lg">
          <a href="/" className="block text-foreground hover:text-primary">Home</a>
          <a href="/catalog" className="block text-foreground hover:text-primary">Catalog</a>
          <a href="/compare" className="block text-foreground hover:text-primary">Compare</a>
          <a href="/favorites" className="block text-foreground hover:text-primary">Favorites</a>
          <div className="flex flex-col space-y-3 pt-3 border-t">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Search className="w-4 h-4 mr-2" /> Search
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <GitCompare className="w-4 h-4 mr-2" /> Compare
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Heart className="w-4 h-4 mr-2" /> Favorites
            </Button>
            <Button variant="outline" size="sm" className="w-full">
              <User className="w-4 h-4 mr-2" /> Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
