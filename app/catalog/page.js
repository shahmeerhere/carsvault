"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { Search, Filter, Heart, GitCompare, Fuel, Settings, Users, Eye, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

// Sample car data (in a real app, this would come from an API)
const allCars = [
  {
    id: 1,
    name: "BMW M4 Competition",
    brand: "BMW",
    year: 2024,
    price: 89900,
    image: "/bmw.jpeg",
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
    image: "/tesla.jpeg",
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
    image: "por.jpeg",
    type: "Sports Car",
    fuel: "Gasoline",
    transmission: "PDK",
    seats: 2,
    mileage: "15 city / 20 hwy",
    features: ["Sport Chrono", "Carbon Ceramic Brakes", "Premium Audio", "Track Mode"],
    isNew: false
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    year: 2024,
    price: 115000,
    image: "/merc.jpeg",
    type: "Luxury Sedan",
    fuel: "Gasoline",
    transmission: "Automatic",
    seats: 5,
    mileage: "16 city / 24 hwy",
    features: ["MBUX System", "Air Suspension", "Premium Sound", "Massage Seats"],
    isNew: true
  },
  {
    id: 5,
    name: "Audi RS6 Avant",
    brand: "Audi",
    year: 2023,
    price: 125000,
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
    type: "Wagon",
    fuel: "Gasoline",
    transmission: "Automatic",
    seats: 5,
    mileage: "13 city / 19 hwy",
    features: ["Quattro AWD", "Sport Suspension", "Premium Interior", "Virtual Cockpit"],
    isNew: false
  },
  {
    id: 6,
    name: "Lamborghini Huracán",
    brand: "Lamborghini",
    year: 2024,
    price: 250000,
    image: "/lambo.jpeg",
    type: "Supercar",
    fuel: "Gasoline",
    transmission: "Automatic",
    seats: 2,
    mileage: "13 city / 18 hwy",
    features: ["ALA System", "Carbon Fiber", "Launch Control", "Track Mode"],
    isNew: true
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

export default function CatalogPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [priceRange, setPriceRange] = useState([0, 300000])

  const brands = [...new Set(allCars.map(car => car.brand))]
  const types = [...new Set(allCars.map(car => car.type))]

  const filteredCars = allCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesBrand = !selectedBrand || car.brand === selectedBrand
    const matchesType = !selectedType || car.type === selectedType
    const matchesPrice = car.price >= priceRange[0] && car.price <= priceRange[1]
    
    return matchesSearch && matchesBrand && matchesType && matchesPrice
  })

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)

  const handleViewDetails = (carId) => {
    router.push(`/car/${carId}`)
  }

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
            
            <h1 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                Vehicle
              </span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Catalog
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Explore our complete collection of premium vehicles
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-1/4">
              <Card className="p-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Filters</h3>
                
                {/* Search */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search vehicles..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Brand</label>
                  <select
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Brands</option>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>{brand}</option>
                    ))}
                  </select>
                </div>

                {/* Type Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Vehicle Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Types</option>
                    {types.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="300000"
                    step="10000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedBrand("")
                    setSelectedType("")
                    setPriceRange([0, 300000])
                  }}
                  className="w-full"
                >
                  Clear Filters
                </Button>
              </Card>
            </div>

            {/* Results */}
            <div className="lg:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <p className="text-black">
                  Showing {filteredCars.length} of {allCars.length} vehicles
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-black">Sort by:</span>
                  <select className="p-2 border border-gray-300 rounded-lg">
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Year: Newest First</option>
                    <option>Brand: A to Z</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCars.map((car) => (
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
                        <Button variant="secondary" size="icon" className="w-8 h-8">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="secondary" size="icon" className="w-8 h-8">
                          <GitCompare className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{car.name}</h3>
                      <p className="text-gray-600 mb-4">{car.brand} • {car.type}</p>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Fuel className="w-4 h-4 text-gray-500" />
                          <span>{car.fuel}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span>{car.transmission}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span>{car.seats} seats</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-gray-500" />
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

                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-blue-600">
                          {formatPrice(car.price)}
                        </div>
                        <Button onClick={() => handleViewDetails(car.id)}>
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredCars.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSearchTerm("")
                      setSelectedBrand("")
                      setSelectedType("")
                      setPriceRange([0, 300000])
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
