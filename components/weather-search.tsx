"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Search } from "lucide-react"

interface WeatherSearchProps {
  onSearch: (query: string) => void
  onLocationSearch: () => void
  loading: boolean
}

export function WeatherSearch({ onSearch, onLocationSearch, loading }: WeatherSearchProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter city, ZIP code, or landmark..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !query.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="text-center">
        <Button variant="outline" onClick={onLocationSearch} disabled={loading} className="w-full">
          <MapPin className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
      </div>

      <div className="text-sm text-gray-600 text-center">
        <p>Try: "New York", "10001", "Eiffel Tower", or use GPS</p>
      </div>
    </div>
  )
}
