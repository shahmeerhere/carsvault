import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SUPA MOTORS - Premium Car Marketplace | Find Your Dream Car',
  description: 'Premium Car Marketplace | Find Your Dream Car Discover premium vehicles with advanced search, detailed comparisons, and expert recommendations. Your ultimate car buying destination.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </body>
    </html>
  )
}
