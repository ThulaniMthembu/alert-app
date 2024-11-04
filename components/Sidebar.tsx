'use client'

import { useState, useEffect } from "react"
import { Bell, Lock, MapPin, AlertTriangle, Shield, ChevronLeft, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarProps {
  isMobile: boolean
}

export function Sidebar({ isMobile }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false)
      } else {
        setIsSidebarOpen(true)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const navItems = [
    { href: "/", icon: Bell, label: "Dashboard" },
    { href: "/missing-persons", icon: Lock, label: "Missing Persons" },
    { href: "/weather-alerts", icon: AlertTriangle, label: "Weather Alerts" },
    { href: "/road-closures", icon: MapPin, label: "Road Closures" },
    { href: "/crime-zones", icon: Shield, label: "Crime Zones" },
  ]

  return (
    <aside className={`${isMobile ? 'w-full' : isSidebarOpen ? 'w-64' : 'w-20'} bg-[#6d28d9] text-white flex flex-col transition-all duration-300`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className={`text-lg font-medium ${isMobile || isSidebarOpen ? '' : 'hidden'}`}>Welcome, Dev Majxr!</h2>
          {!isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-white">
              <ChevronLeft className={`h-6 w-6 transition-transform ${isSidebarOpen ? '' : 'rotate-180'}`} />
            </Button>
          )}
        </div>
        {/* Profile Section */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="Dev Majxr" />
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
          <div className={isMobile || isSidebarOpen ? '' : 'hidden'}>
            <p className="text-sm font-medium">Dev Majxr</p>
            <p className="text-xs text-gray-300">dev@majxr.com</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-2">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`flex items-center px-3 py-2 text-sm rounded-lg hover:bg-white/10 ${
              pathname === item.href ? 'bg-white/20' : ''
            } ${isMobile || isSidebarOpen ? '' : 'justify-center'}`}
          >
            <item.icon className={`w-5 h-5 ${isMobile || isSidebarOpen ? 'mr-3' : ''}`} />
            {(isMobile || isSidebarOpen) && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
      <div className="p-4">
        <Link 
          href="/settings" 
          className={`flex items-center px-3 py-2 text-sm rounded-lg hover:bg-white/10 mb-2 ${
            isMobile || isSidebarOpen ? '' : 'justify-center'
          }`}
        >
          <Settings className={`w-5 h-5 ${isMobile || isSidebarOpen ? 'mr-3' : ''}`} />
          {(isMobile || isSidebarOpen) && <span>Settings</span>}
        </Link>
        <Button 
          variant="ghost" 
          className={`w-full flex items-center px-3 py-2 text-sm rounded-lg hover:bg-white/10 ${
            isMobile || isSidebarOpen ? 'justify-start' : 'justify-center'
          }`}
        >
          <LogOut className={`w-5 h-5 ${isMobile || isSidebarOpen ? 'mr-3' : ''}`} />
          {(isMobile || isSidebarOpen) && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  )
}