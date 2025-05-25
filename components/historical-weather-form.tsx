"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, Thermometer, Save, ArrowLeft, MapPin, AlertTriangle } from "lucide-react"

interface HistoricalWeatherFormProps {
  onBack: () => void
  onSaved: () => void
}

export function HistoricalWeatherForm({ onBack, onSaved }: HistoricalWeatherFormProps) {
  const [form, setForm] = useState({
    location: "",
    startDate: "",
    endDate: "",
  })
  const [loading, setLoading] = useState(false)
  const [weatherData, setWeatherData] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [resolvedLocation, setResolvedLocation] = useState<string>("")
  const [isApproximateLocation, setIsApproximateLocation] = useState(false)

  const validateForm = () => {
    if (!form.location.trim()) {
      setError("Location is required")
      return false
    }

    if (!form.startDate || !form.endDate) {
      setError("Both start and end dates are required")
      return false
    }

    const start = new Date(form.startDate)
    const end = new Date(form.endDate)
    const today = new Date()

    if (start > end) {
      setError("Start date must be before end date")
      return false
    }

    if (start > today) {
      setError("Start date cannot be in the future")
      return false
    }

    const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))
    if (daysDiff > 365) {
      setError("Date range cannot exceed 365 days")
      return false
    }

    return true
  }

  const fetchHistoricalWeather = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError(null)
    setWeatherData([])
    setResolvedLocation("")
    setIsApproximateLocation(false)

    try {
      const params = new URLSearchParams({
        location: form.location,
        startDate: form.startDate,
        endDate: form.endDate,
      })

      const response = await fetch(`/api/weather-historical?${params}`)
      const result = await response.json()

      if (response.ok) {
        setWeatherData(result.data)
        setResolvedLocation(result.location)
        setIsApproximateLocation(result.location.includes("Approximate"))
        setForm({ ...form, location: result.location }) // Use resolved location name
      } else {
        setError(result.error || "Failed to fetch weather data")
      }
    } catch (error) {
      console.error("Error fetching historical weather:", error)
      setError("Failed to fetch weather data")
    } finally {
      setLoading(false)
    }
  }

  const saveToDatabase = async () => {
    if (weatherData.length === 0) {
      setError("No weather data to save")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/weather-history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: resolvedLocation || form.location,
          startDate: form.startDate,
          endDate: form.endDate,
          weatherData,
        }),
      })

      const result = await response.json()

      if (response.ok) {
        onSaved()
      } else {
        setError(result.error || "Failed to save weather data")
      }
    } catch (error) {
      console.error("Error saving weather data:", error)
      setError("Failed to save weather data")
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  const popularLocations = [
    "New York",
    "London",
    "Tokyo",
    "Sydney",
    "Paris",
    "Mumbai",
    "Delhi",
    "Hyderabad",
    "Bangalore",
    "Chennai",
    "Los Angeles",
    "Chicago",
    "Berlin",
    "Madrid",
    "Rome",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button onClick={onBack} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Historical Weather Request
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Form */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter any city name..."
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                disabled={loading}
              />
              <div className="mt-2">
                <p className="text-xs text-gray-500 mb-2">Popular locations (click to use):</p>
                <div className="flex flex-wrap gap-1">
                  {popularLocations.map((location) => (
                    <Button
                      key={location}
                      variant="outline"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() => setForm({ ...form, location })}
                      disabled={loading}
                    >
                      {location}
                    </Button>
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 Tip: The system will try to find your location or use approximate data if needed
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  disabled={loading}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  disabled={loading}
                  max={new Date().toISOString().split("T")[0]}
                />
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={fetchHistoricalWeather} disabled={loading}>
                {loading ? "Fetching..." : "Get Weather Data"}
              </Button>
              {weatherData.length > 0 && (
                <Button onClick={saveToDatabase} disabled={loading}>
                  <Save className="h-4 w-4 mr-2" />
                  Save to Database
                </Button>
              )}
            </div>
          </div>

          {/* Resolved Location */}
          {resolvedLocation && (
            <div
              className={`border rounded-lg p-3 ${isApproximateLocation ? "bg-yellow-50 border-yellow-200" : "bg-blue-50 border-blue-200"}`}
            >
              <div className="flex items-center gap-2">
                {isApproximateLocation ? (
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                ) : (
                  <MapPin className="h-4 w-4 text-blue-600" />
                )}
                <p className={`text-sm ${isApproximateLocation ? "text-yellow-800" : "text-blue-800"}`}>
                  <span className="font-semibold">
                    {isApproximateLocation ? "Using approximate location:" : "Location resolved:"}
                  </span>{" "}
                  {resolvedLocation}
                </p>
              </div>
              {isApproximateLocation && (
                <p className="text-xs text-yellow-700 mt-1">
                  Exact location not found, but weather data is still generated for demonstration purposes.
                </p>
              )}
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Weather Data Results */}
          {weatherData.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weather Data Preview</CardTitle>
                <p className="text-sm text-gray-600">
                  {resolvedLocation || form.location} • {formatDate(form.startDate)} - {formatDate(form.endDate)} •{" "}
                  {weatherData.length} days
                </p>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2 max-h-60 overflow-y-auto">
                  {weatherData.map((data, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{formatDate(data.date)}</span>
                        <img
                          src={`https://openweathermap.org/img/wn/${data.weather_icon}@2x.png`}
                          alt={data.weather_description}
                          className="w-8 h-8"
                        />
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="flex items-center gap-1">
                          <Thermometer className="h-3 w-3" />
                          {data.temperature}°C
                        </span>
                        <span className="text-gray-600">{data.humidity}% humidity</span>
                        <span className="text-gray-600 capitalize">{data.weather_description}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
