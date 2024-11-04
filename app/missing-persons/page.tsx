'use client'

import { useState, useEffect } from "react"
import { Search, UserX, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sidebar } from "@/components/Sidebar"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

export default function MissingPersons() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  const missingPersons = [
    { name: "John Doe", age: 35, lastSeen: "2023-06-15", location: "Cape Town" },
    { name: "Jane Smith", age: 28, lastSeen: "2023-06-14", location: "Johannesburg" },
    { name: "Mike Johnson", age: 42, lastSeen: "2023-06-13", location: "Durban" },
  ]

  return (
    <div className="flex flex-col h-screen bg-[#F3F4F6] overflow-hidden">
      {isMobile && (
        <nav className="bg-[#6d28d9] p-4 flex items-center">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-64 bg-[#6d28d9]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <Sidebar isMobile={true} />
            </SheetContent>
          </Sheet>
        </nav>
      )}
      <div className="flex flex-1 overflow-hidden">
        {!isMobile && <Sidebar isMobile={false} />}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-2xl font-bold mb-6">Missing Persons</h1>
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Input
                    className="pl-10 bg-white"
                    placeholder="Search missing persons..."
                    type="search"
                  />
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {missingPersons.map((person) => (
                  <Card key={person.name}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {person.name}
                      </CardTitle>
                      <UserX className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{person.age} years old</div>
                      <p className="text-xs text-muted-foreground">
                        Last seen: {person.lastSeen} in {person.location}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}