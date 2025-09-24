"use client"

import { Search, GitCompare, Shield, Award, Zap, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const features = [
  {
    icon: Search,
    title: "Advanced Search",
    description: "Find your perfect vehicle with powerful filters and intelligent search algorithms"
  },
  {
    icon: GitCompare,
    title: "Car Comparison",
    description: "Compare vehicles side-by-side with detailed specifications and pricing"
  },
  {
    icon: Shield,
    title: "Verified Listings",
    description: "All vehicles are thoroughly inspected and verified for authenticity"
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Curated selection of premium vehicles from trusted dealers nationwide"
  },
  {
    icon: Zap,
    title: "Instant Recommendations",
    description: "AI-powered recommendations based on your preferences and budget"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated support team to guide you through your car buying journey"
  }
]

const Features = () => {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="bg-premium-gradient bg-clip-text text-transparent">SupaMotors?</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of car shopping with our cutting-edge platform designed for automotive enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group glass-effect hover:premium-shadow smooth-transition border-border/50 hover:border-primary/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-premium-gradient rounded-2xl flex items-center justify-center group-hover:scale-110 smooth-transition">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-4 group-hover:text-primary smooth-transition">
                  {feature.title}
                </h3>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
