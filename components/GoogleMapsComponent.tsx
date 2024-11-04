'use client'

import { useEffect, useRef, useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from 'next/image'

// Extend the global Window interface to include Google Maps types
declare global {
  interface Window {
    initMap?: () => void;
    google: typeof google;
  }
}

export default function GoogleMapsComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Function to load the Google Maps API script
    const loadGoogleMaps = () => {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        initMap()
        return
      }

      // Check if the script is already being loaded
      if (document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]')) {
        return
      }

      // Create and append the Google Maps script
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&callback=initMap`
      script.async = true
      script.defer = true
      script.onerror = () => setError('Failed to load Google Maps API')
      document.head.appendChild(script)
    }

    // Function to initialize the map
    const initMap = () => {
      if (!mapRef.current) return

      try {
        // Create a new Google Map instance
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -26.205647, lng: 28.0337185 }, // Coordinates for Johannesburg, South Africa
          zoom: 16,
        })

        // Add a circle to represent the map radius
        new window.google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map,
          center: { lat: -26.205647, lng: 28.0337185 },
          radius: 2000, // 2km radius
        })
      } catch (err) {
        handleMapError(err)
      }
    }

    // Function to handle map initialization errors
    const handleMapError = (err: unknown) => {
      if (err instanceof Error) {
        if (err.message.includes('BillingNotEnabledMapError')) {
          setError('Google Maps API billing is not enabled for this project.')
        } else {
          setError(`An error occurred while loading the map: ${err.message}`)
        }
      } else {
        setError('An unknown error occurred while loading the map.')
      }
      console.error('Google Maps error:', err)
    }

    // Assign initMap to window object for the callback
    window.initMap = initMap
    loadGoogleMaps()

    // Cleanup function
    return () => {
      if (window.initMap) {
        delete window.initMap
      }
    }
  }, [])

  // Render error state if there's an error
  if (error) {
    return (
      <div className="h-full w-full rounded-lg bg-gray-100 flex flex-col items-center justify-center p-6">
        <Alert variant="destructive" className="mb-4 max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        <div className="text-center max-w-md">
          <p className="mb-4">To resolve this issue, please follow these steps:</p>
          <ol className="list-decimal text-left mb-4 pl-4">
            <li>Go to the Google Cloud Console</li>
            <li>Select your project</li>
            <li>Enable billing for the project</li>
            <li>Enable the Google Maps JavaScript API</li>
            <li>Ensure your API key has the necessary permissions</li>
            <li>Check your API key restrictions (if any)</li>
            <li>Verify that the NEXT_PUBLIC_GOOGLE_MAPS_API_KEY environment variable is set correctly</li>
          </ol>
          <Button asChild className="mb-2 w-full">
            <a href="https://console.cloud.google.com/project/_/billing/enable" target="_blank" rel="noopener noreferrer">
              Enable Billing
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href="https://developers.google.com/maps/documentation/javascript/error-messages#billing-not-enabled-map-error" target="_blank" rel="noopener noreferrer">
              Learn More
            </a>
          </Button>
        </div>
        <div className="mt-8 p-4 bg-white rounded-lg shadow-md max-w-md w-full">
          <h3 className="text-lg font-semibold mb-2">Placeholder Map</h3>
          <div className="w-full h-64 bg-gray-300 flex items-center justify-center rounded">
            <Image
              src="/placeholder.svg?height=256&width=384"
              alt="Placeholder Map"
              width={384}
              height={256}
              className="rounded"
            />
          </div>
        </div>
      </div>
    )
  }

  // Render the map container
  return <div ref={mapRef} className="h-full w-full rounded-lg" />
}