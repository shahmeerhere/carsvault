"use client"
import { useEffect } from "react"
import Navigation from "@/components/Navigation"
import Hero from "@/components/Hero"
import FeaturedCars from "@/components/FeaturedCars"
import Features from "@/components/Features"
import Footer from "@/components/Footer"

export default function Home() {
  useEffect(() => {
    document.title = "AutoVault - Premium Car Marketplace | Find Your Dream Car"

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.content =
        "Discover premium vehicles with advanced search, detailed comparisons, and expert recommendations. Your ultimate car buying destination."
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <FeaturedCars />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
