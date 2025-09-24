"use client";

import { Search, Filter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function Hero() {
  const heroStats = [
    { value: "10,000+", label: "Premium Vehicles" },
    { value: "50+", label: "Trusted Dealers" },
    { value: "99%", label: "Customer Satisfaction" },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/hero-car.jpg"
          alt="Premium luxury car"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-card/80 to-muted/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Discover Your{" "}
            <span className="bg-premium-gradient bg-clip-text text-transparent">
              Dream Car
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in">
            Explore premium vehicles with advanced search, detailed comparisons, and expert recommendations
          </p>

          <div className="max-w-2xl mx-auto mb-8 animate-slide-up">
            <Card className="glass-effect p-2">
              <div className="flex items-center space-x-2">
                <div className="flex-1 flex items-center space-x-2">
                  <Search className="w-5 h-5 text-muted-foreground ml-3" />
                  <Input
                    placeholder="Search by make, model, or year..."
                    className="border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>
                <Button size="icon" className="bg-primary hover:bg-primary/90">
                  <Filter className="w-5 h-5" />
                </Button>
                <Button className="bg-premium-gradient hover:opacity-90 premium-glow animate-glow-pulse">
                  Search
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto animate-slide-up">
            {heroStats.map((stat) => (
              <Card
                key={stat.label}
                className="glass-effect p-6 text-center hover:premium-shadow smooth-transition"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-pulse delay-1000" />
    </section>
  );
}
