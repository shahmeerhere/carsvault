"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"
import { ArrowLeft, Plus, X, Fuel, Settings, Users, Eye, Check, X as XIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// Sample car data (same as catalog)
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
    specs: {
      engine: "3.0L Twin-Turbo I6",
      horsepower: 503,
      torque: 479,
      acceleration: "3.8s",
      topSpeed: "180 mph",
      weight: "3,800 lbs"
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
    specs: {
      engine: "Tri-Motor Electric",
      horsepower: 1020,
      torque: 1050,
      acceleration: "2.1s",
      topSpeed: "200 mph",
      weight: "4,766 lbs"
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
    specs: {
      engine: "3.8L Twin-Turbo H6",
      horsepower: 640,
      torque: 590,
      acceleration: "2.6s",
      topSpeed: "205 mph",
      weight: "3,650 lbs"
    }
  },
  {
    id: 4,
    name: "Mercedes-Benz S-Class",
    brand: "Mercedes-Benz",
    year: 2024,
    price: 115000,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
    type: "Luxury Sedan",
    fuel: "Gasoline",
    transmission: "Automatic",
    seats: 5,
    mileage: "16 city / 24 hwy",
    features: ["MBUX System", "Air Suspension", "Premium Sound", "Massage Seats"],
    isNew: true,
    specs: {
      engine: "3.0L Turbo I6",
      horsepower: 429,
      torque: 384,
      acceleration: "4.8s",
      topSpeed: "155 mph",
      weight: "4,500 lbs"
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

export default function ComparePage() {
  const router = useRouter()
  const [selectedCars, setSelectedCars] = useState([])
  const [showCarSelector, setShowCarSelector] = useState(false)

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)

  const addCarToComparison = (car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car])
    }
  }

  const removeCarFromComparison = (carId) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId))
  }

  const getComparisonValue = (spec, cars) => {
    if (spec === 'price') {
      const prices = cars.map(car => car.price)
      const min = Math.min(...prices)
      const max = Math.max(...prices)
      return { min, max, best: min }
    }
    if (spec === 'horsepower') {
      const values = cars.map(car => car.specs.horsepower)
      const max = Math.max(...values)
      return { max, best: max }
    }
    if (spec === 'acceleration') {
      const values = cars.map(car => parseFloat(car.specs.acceleration))
      const min = Math.min(...values)
      return { min, best: min }
    }
    return null
  }

  const renderSpecComparison = (spec, label, unit = '') => {
    const comparison = getComparisonValue(spec, selectedCars)
    if (!comparison) return null

    return (
      <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
        <div className="font-medium text-gray-700">{label}</div>
        {selectedCars.map((car, index) => {
          let value = ''
          let isBest = false
          
          if (spec === 'price') {
            value = formatPrice(car.price)
            isBest = car.price === comparison.best
          } else if (spec === 'horsepower') {
            value = `${car.specs.horsepower}${unit}`
            isBest = car.specs.horsepower === comparison.best
          } else if (spec === 'acceleration') {
            value = `${car.specs.acceleration}${unit}`
            isBest = parseFloat(car.specs.acceleration) === comparison.best
          }

          return (
            <div key={car.id} className={`text-center ${isBest ? 'text-green-600 font-semibold' : ''}`}>
              {value}
              {isBest && <Check className="w-4 h-4 mx-auto mt-1 text-green-600" />}
            </div>
          )
        })}
      </div>
    )
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
                Comparison
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Compare up to 3 vehicles side by side
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {selectedCars.length === 0 ? (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                  <Plus className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4">No vehicles selected</h3>
                <p className="text-gray-600 mb-6">
                  Add vehicles to compare their specifications, features, and pricing
                </p>
                <Button onClick={() => setShowCarSelector(true)}>
                  Add Vehicles to Compare
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Selected Cars Header */}
              <div className="grid grid-cols-4 gap-4">
                <div className="font-semibold text-gray-700">Vehicle</div>
                {selectedCars.map((car) => (
                  <div key={car.id} className="relative">
                    <Card className="p-4">
                      <div className="relative mb-4">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          variant="secondary"
                          size="icon"
                          className="absolute top-2 right-2 w-6 h-6"
                          onClick={() => removeCarFromComparison(car.id)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                      <h3 className="font-semibold text-sm">{car.name}</h3>
                      <p className="text-xs text-gray-600">{car.brand} • {car.year}</p>
                    </Card>
                  </div>
                ))}
                {selectedCars.length < 3 && (
                  <div className="flex items-center justify-center">
                    <Button
                      variant="outline"
                      onClick={() => setShowCarSelector(true)}
                      className="w-full h-32 border-dashed border-2 border-gray-300 hover:border-gray-400"
                    >
                      <div className="text-center">
                        <Plus className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <span className="text-sm text-gray-600">Add Vehicle</span>
                      </div>
                    </Button>
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Price</div>
                {selectedCars.map((car) => (
                  <div key={car.id} className="text-center">
                    <div className="text-lg font-semibold text-blue-600">
                      {formatPrice(car.price)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Type</div>
                {selectedCars.map((car) => (
                  <div key={car.id} className="text-center">{car.type}</div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Fuel Type</div>
                {selectedCars.map((car) => (
                  <div key={car.id} className="text-center">{car.fuel}</div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Transmission</div>
                {selectedCars.map((car) => (
                  <div key={car.id} className="text-center">{car.transmission}</div>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                <div className="font-medium text-gray-700">Seats</div>
                {selectedCars.map((car) => (
                  <div key={car.id} className="text-center">{car.seats}</div>
                ))}
              </div>

              {/* Performance Specs */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Performance Specifications</h3>
                {renderSpecComparison('horsepower', 'Horsepower', ' hp')}
                {renderSpecComparison('acceleration', '0-60 mph', 's')}
                
                <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                  <div className="font-medium text-gray-700">Top Speed</div>
                  {selectedCars.map((car) => (
                    <div key={car.id} className="text-center">{car.specs.topSpeed}</div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 py-3 border-b border-gray-200">
                  <div className="font-medium text-gray-700">Weight</div>
                  {selectedCars.map((car) => (
                    <div key={car.id} className="text-center">{car.specs.weight}</div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="pt-4">
                <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                <div className="space-y-3">
                  {['Premium Sound', 'Leather Seats', 'Navigation', 'Sunroof', 'Autopilot', 'Air Suspension', 'Sport Chrono', 'Carbon Ceramic Brakes', 'MBUX System', 'Massage Seats', 'Quattro AWD', 'Virtual Cockpit'].map((feature) => (
                    <div key={feature} className="grid grid-cols-4 gap-4 py-2">
                      <div className="font-medium text-gray-700">{feature}</div>
                      {selectedCars.map((car) => (
                        <div key={car.id} className="text-center">
                          {car.features.includes(feature) ? (
                            <Check className="w-5 h-5 mx-auto text-green-600" />
                          ) : (
                            <XIcon className="w-5 h-5 mx-auto text-gray-300" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-center gap-4 pt-8">
                <Button onClick={() => setShowCarSelector(true)}>
                  Add More Vehicles
                </Button>
                <Button variant="outline" onClick={() => setSelectedCars([])}>
                  Clear Comparison
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Car Selector Modal */}
      {showCarSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Select Vehicles to Compare</h2>
                <Button variant="outline" onClick={() => setShowCarSelector(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allCars
                  .filter(car => !selectedCars.find(c => c.id === car.id))
                  .map((car) => (
                    <Card key={car.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            addCarToComparison(car)
                            if (selectedCars.length >= 2) {
                              setShowCarSelector(false)
                            }
                          }}>
                      <div className="flex gap-4">
                        <img
                          src={car.image}
                          alt={car.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{car.name}</h3>
                          <p className="text-sm text-gray-600">{car.brand} • {car.year}</p>
                          <p className="text-sm text-gray-600">{car.type}</p>
                          <p className="font-semibold text-blue-600">{formatPrice(car.price)}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}
