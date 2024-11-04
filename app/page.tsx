'use client'

import { useState, useEffect } from "react"
import { ChevronRight, Lock, AlertTriangle, Shield, CloudRain, MapPin, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Sidebar } from "@/components/Sidebar"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import dynamic from 'next/dynamic'

const GoogleMapsComponent = dynamic(() => import('@/components/GoogleMapsComponent'), {
  ssr: false,
  loading: () => <p>Loading Map...</p>
})

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const statsCards = [
    { title: "Active Missing Persons", value: 12, change: "+2", icon: Lock, color: "text-purple-100" },
    { title: "Weather Alerts", value: 3, change: "2 high severity", icon: AlertTriangle, color: "text-purple-100" },
    { title: "Active Crime Zones", value: 8, change: "3 high risk areas", icon: Shield, color: "text-purple-100" },
  ]

  const recentAlerts = [
    { title: "Heavy Rain Warning", description: "Cape Town - Duration: 6 hours", icon: CloudRain, color: "text-purple-100", link: "/weather-alerts" },
    { title: "Road Closure", description: "N1 Highway - Construction Work", icon: MapPin, color: "text-purple-100", link: "/road-closures" },
    { title: "New Crime Zone Reported", description: "Johannesburg Central", icon: Shield, color: "text-purple-100", link: "/crime-zones" },
  ]

  return (
    <div className="flex flex-col h-screen bg-white overflow-hidden">
      {isMobile && (
        <nav className="bg-[#6d28d9] p-4 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-[#6d28d9]">
              <Sidebar isMobile={true} />
            </SheetContent>
          </Sheet>
        </nav>
      )}
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar isMobile={false} />}
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-white">
          <div className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
                <h1 className="text-3xl font-bold text-gray-900">Safety Alert System</h1>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-full md:w-[180px] bg-white text-gray-900 border-gray-300">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="cape-town">Cape Town</SelectItem>
                    <SelectItem value="johannesburg">Johannesburg</SelectItem>
                    <SelectItem value="durban">Durban</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mb-6">
                {statsCards.map((card, index) => (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="bg-[#6d28d9] text-white hover:bg-[#5b21b6] transition-colors duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                        <card.icon className={`w-4 h-4 ${card.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                        <p className="text-xs text-purple-200">{card.change}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Map View */}
              <Card className="mb-6 border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Alert Map</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] rounded-lg overflow-hidden">
                    <GoogleMapsComponent />
                  </div>
                </CardContent>
              </Card>

              {/* Recent Alerts */}
              <Card className="mb-6 border border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-gray-900">Recent Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAlerts.map((alert, index) => (
                      <motion.div
                        key={alert.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 rounded-lg bg-[#6d28d9] text-white hover:bg-[#5b21b6] transition-colors duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <alert.icon className={`w-6 h-6 ${alert.color}`} />
                          <div>
                            <h3 className="font-medium">{alert.title}</h3>
                            <p className="text-sm text-purple-200">{alert.description}</p>
                          </div>
                        </div>
                        <Link href={alert.link} passHref>
                          <Button variant="secondary" size="sm" className="group bg-white text-[#6d28d9] hover:bg-gray-100">
                            View Details
                            <ChevronRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                          </Button>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}