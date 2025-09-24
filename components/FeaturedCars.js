"use client"

import { Heart, Eye, GitCompare, Fuel, Settings, Users } from "lucide-react"

const Card = ({ children, className = "", ...props }) => (
  <div
    className={`rounded-2xl border border-gray-200 bg-white shadow-md hover:shadow-xl transition ${className}`}
    {...props}
  >
    {children}
  </div>
)

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
)

const CardFooter = ({ children, className = "" }) => (
  <div className={`p-6 border-t bg-gray-50 ${className}`}>{children}</div>
)

const Button = ({ children, className = "", variant = "default", ...props }) => {
  const base = "px-4 py-2 rounded-lg text-sm font-medium transition w-full"
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 shadow",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    secondary: "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

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


const featuredCars = [
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
  }
]

// ✅ Main Component
const FeaturedCars = () => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Featured
            </span>{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              Vehicles
            </span>

          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our handpicked selection of premium vehicles from the world&apos;s most prestigious brands.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <Card key={car.id} className="overflow-hidden">
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.brand} ${car.name}`}
                  className="w-full h-52 object-cover"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  {car.isNew && <Badge>New</Badge>}
                  <Badge variant="secondary">{car.year}</Badge>
                </div>

                {/* Buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button variant="secondary" className="w-8 h-8 flex items-center justify-center p-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" className="w-8 h-8 flex items-center justify-center p-0">
                    <GitCompare className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent>
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-600">{car.brand} • {car.type}</p>

                {/* Specs */}
                <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
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

                {/* Features */}
                <div className="flex flex-wrap gap-1 mt-4">
                  {car.features.slice(0, 3).map((feature) => (
                    <Badge key={feature} variant="outline">{feature}</Badge>
                  ))}
                  {car.features.length > 3 && (
                    <Badge variant="outline">+{car.features.length - 3} more</Badge>
                  )}
                </div>

                {/* Price */}
                <div className="text-2xl font-bold text-blue-600 mt-4">
                  {formatPrice(car.price)}
                </div>
              </CardContent>

              <CardFooter>
                <div className="flex gap-3 w-full">
                  <Button variant="outline">View Details</Button>
                  <Button>Contact Dealer</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="outline" className="px-6 py-3 w-auto">
            View All Vehicles <Eye className="w-4 h-4 ml-2 inline" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default FeaturedCars
