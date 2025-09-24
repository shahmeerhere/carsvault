"use client"
import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ArrowLeft, Heart, GitCompare, Eye, Phone, Mail, MapPin, Fuel, Settings, Users, Calendar, Star } from "lucide-react"
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
    isNew: true,
    description: "The BMW M4 Competition represents the pinnacle of performance and luxury. With its powerful twin-turbo inline-6 engine and precision handling, this coupe delivers an exhilarating driving experience.",
    specs: {
      engine: "3.0L Twin-Turbo I6",
      horsepower: 503,
      torque: 479,
      acceleration: "3.8s",
      topSpeed: "180 mph",
      weight: "3,800 lbs",
      fuelCapacity: "15.6 gal"
    },
    dealer: {
      name: "BMW of Beverly Hills",
      rating: 4.8,
      phone: "(310) 555-0123",
      email: "sales@bmwbeverlyhills.com",
      address: "123 Rodeo Drive, Beverly Hills, CA 90210"
    }
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
    isNew: true,
    description: "The Tesla Model S Plaid redefines electric performance with its tri-motor setup delivering unprecedented acceleration and range. Experience the future of automotive technology.",
    specs: {
      engine: "Tri-Motor Electric",
      horsepower: 1020,
      torque: 1050,
      acceleration: "2.1s",
      topSpeed: "200 mph",
      weight: "4,766 lbs",
      fuelCapacity: "N/A (Electric)"
    },
    dealer: {
      name: "Tesla Showroom LA",
      rating: 4.9,
      phone: "(323) 555-0456",
      email: "la@tesla.com",
      address: "456 Sunset Blvd, West Hollywood, CA 90069"
    }
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
    isNew: false,
    description: "The Porsche 911 Turbo S combines legendary performance with everyday usability. This iconic sports car delivers blistering acceleration and precision handling.",
    specs: {
      engine: "3.8L Twin-Turbo H6",
      horsepower: 640,
      torque: 590,
      acceleration: "2.6s",
      topSpeed: "205 mph",
      weight: "3,650 lbs",
      fuelCapacity: "16.9 gal"
    },
    dealer: {
      name: "Porsche Center Manhattan",
      rating: 4.7,
      phone: "(212) 555-0789",
      email: "info@porschemanhattan.com",
      address: "789 11th Ave, New York, NY 10019"
    }
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

export default function CarDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const [selectedImage, setSelectedImage] = useState(0)

  const carId = parseInt(params.id)
  const car = allCars.find(c => c.id === carId)

  if (!car) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="pt-20 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
            <p className="text-gray-600 mb-6">The vehicle you're looking for doesn't exist.</p>
            <Button onClick={() => router.push("/catalog")}>
              Browse All Vehicles
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, this would update localStorage or API
  }

  const handleContactDealer = () => {
    alert(`Contacting ${car.dealer.name} about ${car.name}...`)
  }

  const handleScheduleTestDrive = () => {
    alert(`Scheduling test drive for ${car.name}...`)
  }

  // Generate additional images for gallery (in real app, these would come from API)
  const carImages = [
    car.image,
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1549317336-206569e8475c?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="pt-20">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center gap-4 mb-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
            </div>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{car.name}</h1>
                <p className="text-gray-600 text-lg">{car.brand} • {car.year} • {car.type}</p>
              </div>
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline"
                  onClick={toggleFavorite}
                  className={`flex items-center gap-2 ${isFavorite ? 'text-red-600' : ''}`}
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => router.push("/compare")}
                  className="flex items-center gap-2"
                >
                  <GitCompare className="w-4 h-4" />
                  Compare
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={carImages[selectedImage]}
                    alt={car.name}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {car.isNew && <Badge>New</Badge>}
                    <Badge variant="secondary">{car.year}</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex gap-2 overflow-x-auto">
                    {carImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index ? 'border-blue-500' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${car.name} view ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed">{car.description}</p>
              </Card>

              {/* Specifications */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Specifications</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Engine</span>
                      <span className="font-medium">{car.specs.engine}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Horsepower</span>
                      <span className="font-medium">{car.specs.horsepower} hp</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Torque</span>
                      <span className="font-medium">{car.specs.torque} lb-ft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">0-60 mph</span>
                      <span className="font-medium">{car.specs.acceleration}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Top Speed</span>
                      <span className="font-medium">{car.specs.topSpeed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight</span>
                      <span className="font-medium">{car.specs.weight}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel Capacity</span>
                      <span className="font-medium">{car.specs.fuelCapacity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Transmission</span>
                      <span className="font-medium">{car.transmission}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Features */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {car.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Price & Actions */}
              <Card className="p-6">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatPrice(car.price)}
                  </div>
                  <p className="text-gray-600">Asking Price</p>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={handleContactDealer}
                    className="w-full"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Contact Dealer
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleScheduleTestDrive}
                    className="w-full"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Test Drive
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => router.push("/compare")}
                    className="w-full"
                  >
                    <GitCompare className="w-4 h-4 mr-2" />
                    Add to Comparison
                  </Button>
                </div>
              </Card>

              {/* Dealer Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Dealer Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">{car.dealer.name}</h4>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{car.dealer.rating}/5.0</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{car.dealer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{car.dealer.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{car.dealer.address}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Specs */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Specs</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Fuel className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Fuel Type</div>
                      <div className="font-medium">{car.fuel}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Transmission</div>
                      <div className="font-medium">{car.transmission}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Seating</div>
                      <div className="font-medium">{car.seats} seats</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Eye className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="text-sm text-gray-600">Mileage</div>
                      <div className="font-medium">{car.mileage}</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
