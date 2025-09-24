"use client";

import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
  const quickLinks = [
    "Browse Cars", "Advanced Search", "Compare Vehicles", 
    "Financing Options", "Trade-In Value", "Dealer Network"
  ];

  const supportLinks = [
    "Help Center", "Contact Us", "Vehicle History", 
    "Warranty Info", "Service Centers", "Customer Reviews"
  ];

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-premium-gradient rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">SupaMotors</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Your premier destination for luxury and premium vehicles. We connect you with the finest cars and trusted dealers nationwide.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <Button key={idx} size="icon" variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-3">
              {quickLinks.map(link => (
                <a key={link} href="#" className="block text-muted-foreground hover:text-primary smooth-transition">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Support Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-3">
              {supportLinks.map(link => (
                <a key={link} href="#" className="block text-muted-foreground hover:text-primary smooth-transition">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">info@supamotors.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">1-800-SUPA-MOTORS</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <span className="text-muted-foreground">Nationwide Locations</span>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for the latest deals and automotive news.
              </p>
              <div className="flex space-x-2">
                <Input placeholder="Enter your email" className="flex-1" />
                <Button className="bg-primary hover:bg-primary/90">Subscribe</Button>
              </div>
            </div>
          </div>

        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground text-sm">© 2024 SupaMotors. All rights reserved.</div>
          <div className="flex space-x-6 text-sm">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(link => (
              <a key={link} href="#" className="text-muted-foreground hover:text-primary smooth-transition">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
