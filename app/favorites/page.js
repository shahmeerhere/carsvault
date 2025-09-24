"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ArrowLeft, Heart, GitCompare, Eye, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Sample car data (same as other pages)
const allCars = [
  {
    id: 1,
    name: "BMW M4 Competition",
    brand: "BMW",
    year: 2024,
    price: 89900,
    image: "https://images.unsplash.com/photo-1617814077999-5c064b2f6afb?auto=format&fit=crop&w=800&q=80",
    type: "Coupe",
    fuel: "Gasoline",
    transmission: "Automatic",
    seats: 4,
    mileage: "12 city / 18 hwy",
    features: ["Premium Sound", "Leather Seats", "Navigation", "Sunroof"],
    isNew: true
  },
  {
    id: 2,
    name: "Tesla Model S Plaid",
    brand: "Tesla",
    year: 2024,
    price: 94990,
    image: "https://images.unsplash.com/photo-1619767886558-efdc5a14db25?auto=format&fit=crop&w=800&q=80",
    type: "Sedan",
    fuel: "Electric",
    transmission: "Automatic",
    seats: 5,
    mileage: "396 mi range",
    features: ["Autopilot", "Premium Interior", "Supercharging", "Air Suspension"],
    isNew: true
  },
  {
    id: 3,
    name: "Porsche 911 Turbo S",
    brand: "Porsche",
    year: 2023,
    price: 207000,
    image: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=800&q=80",
    type: "Sports Car",
    fuel: "Gasoline",
    transmission: "PDK",
    seats: 2,
    mileage: "15 city / 20 hwy",
    features: ["Sport Chrono", "Carbon Ceramic Brakes", "Premium Audio", "Track Mode"],
    isNew: false
  }
]

const Badge = ({ children, className = "", variant = "default" }) => {
  const variants = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border border-gray-300 text-gray-700"
  }
  return (
    <span className={`px-2 py-1 text-xs rounded-md ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}

export default function FavoritesPage() {
  const router = useRouter()
  const [favoriteCars, setFavoriteCars] = useState([])

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteCars')
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites)
      const favorites = allCars.filter(car => favoriteIds.includes(car.id))
      setFavoriteCars(favorites)
    } else {
      // For demo purposes, add some default favorites
      setFavoriteCars([allCars[0], allCars[1]])
    }
  }, [])

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)

  const removeFromFavorites = (carId) => {
    const updatedFavorites = favoriteCars.filter(car => car.id !== carId)
    setFavoriteCars(updatedFavorites)
    
    // Update localStorage
    const favoriteIds = updatedFavorites.map(car => car.id)
    localStorage.setItem('favoriteCars', JSON.stringify(favoriteIds))
  }

  const addToComparison = (carId) => {
    // In a real app, this would add to a comparison state/context
    // For now, we'll just show an alert
    alert(`Added car ${carId} to comparison!`)
  }

  const handleViewDetails = (carId) => {
    router.push(`/car/${carId}`)
  }

  const handleContactDealer = (car) => {
    // In a real app, this would open a contact form or redirect to dealer
    alert(`Contacting dealer for ${car.name}...`)
  }

  const totalValue = favoriteCars.reduce((sum, car) => sum + car.price, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center gap-4 mb-6">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.push("/")}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">
                  <span className="bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                    My
                  </span>{" "}
                  <span className="bg-gradient-to-r from-pink-500 to-red-600 bg-clip-text text-transparent">
                    Favorites
                  </span>
                </h1>
                <p className="text-gray-600 text-lg">
                  Your saved vehicles and wishlist
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card className="p-4">
                <div className="text-2xl font-bold text-blue-600">{favoriteCars.length}</div>
                <div className="text-sm text-gray-600">Saved Vehicles</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-green-600">{formatPrice(totalValue)}</div>
                <div className="text-sm text-gray-600">Total Value</div>
              </Card>
              <Card className="p-4">
                <div className="text-2xl font-bold text-purple-600">
                  {favoriteCars.filter(car => car.isNew).length}
                </div>
                <div className="text-sm text-gray-600">New Vehicles</div>
              </Card>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {favoriteCars.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Heart className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">No favorites yet</h3>
                <p className="text-gray-600 mb-6">
                  Start exploring our catalog and save vehicles you're interested in
                </p>
                <Button onClick={() => router.push("/catalog")}>
                  Browse Vehicles
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Actions Bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">
                    {favoriteCars.length} Saved Vehicle{favoriteCars.length !== 1 ? 's' : ''}
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => router.push("/compare")}
                    className="flex items-center gap-2"
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare Selected
                  </Button>
                  <Button 
                    onClick={() => router.push("/catalog")}
                    className="flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Browse More
                  </Button>
                </div>
              </div>

              {/* Favorites Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteCars.map((car) => (
                  <Card key={car.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={car.image}
                        alt={`${car.brand} ${car.name}`}
                        className="w-full h-48 object-cover"
                      />
                      
                      <div className="absolute top-4 left-4 flex gap-2">
                        {car.isNew && <Badge>New</Badge>}
                        <Badge variant="secondary">{car.year}</Badge>
                      </div>

                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="w-8 h-8 bg-white/90 hover:bg-white"
                          onClick={() => removeFromFavorites(car.id)}
                        >
                          <Heart className="w-4 h-4 text-red-600 fill-current" />
                        </Button>
                        <Button 
                          variant="secondary" 
                          size="icon" 
                          className="w-8 h-8 bg-white/90 hover:bg-white"
                          onClick={() => addToComparison(car.id)}
                        >
                          <GitCompare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                      <p className="text-gray-600 mb-4">{car.brand} • {car.type}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Fuel:</span>
                          <span>{car.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Transmission:</span>
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Seats:</span>
                          <span>{car.seats}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-gray-500">Mileage:</span>
                          <span>{car.mileage}</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {car.features.slice(0, 3).map((feature) => (
                          <Badge key={feature} variant="outline">{feature}</Badge>
                        ))}
                        {car.features.length > 3 && (
                          <Badge variant="outline">+{car.features.length - 3} more</Badge>
                        )}
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(car.price)}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => handleViewDetails(car.id)}
                          className="flex-1"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button 
                          onClick={() => handleContactDealer(car)}
                          className="flex-1"
                        >
                          Contact Dealer
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button 
                    variant="outline" 
                    onClick={() => router.push("/compare")}
                    className="flex items-center justify-center gap-2"
                  >
                    <GitCompare className="w-4 h-4" />
                    Compare All
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      const allIds = favoriteCars.map(car => car.id)
                      localStorage.setItem('favoriteCars', JSON.stringify(allIds))
                      alert('Favorites exported successfully!')
                    }}
                    className="flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Export List
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (confirm('Are you sure you want to clear all favorites?')) {
                        setFavoriteCars([])
                        localStorage.removeItem('favoriteCars')
                      }
                    }}
                    className="flex items-center justify-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                    Clear All
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
