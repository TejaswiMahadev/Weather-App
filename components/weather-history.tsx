"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Thermometer, Edit, Trash2, Plus, Search, HardDrive } from "lucide-react"
import type { WeatherRequestWithData } from "@/lib/supabase"

interface WeatherHistoryProps {
  onCreateNew: () => void
}

export function WeatherHistory({ onCreateNew }: WeatherHistoryProps) {
  const [requests, setRequests] = useState<WeatherRequestWithData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchLocation, setSearchLocation] = useState("")
  const [editingId, setEditingId] = useState<number | null>(null)
  const [usingMemoryStorage, setUsingMemoryStorage] = useState(false)
  const [editForm, setEditForm] = useState({
    location: "",
    start_date: "",
    end_date: "",
  })

  useEffect(() => {
    fetchWeatherHistory()
  }, [])

  const fetchWeatherHistory = async (location?: string) => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (location) params.append("location", location)

      const response = await fetch(`/api/weather-history?${params}`)
      const result = await response.json()

      if (response.ok) {
        setRequests(result.data || [])
        setUsingMemoryStorage(result.usingMemoryStorage || false)
      } else {
        console.error("Failed to fetch weather history:", result.error)
      }
    } catch (error) {
      console.error("Error fetching weather history:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    fetchWeatherHistory(searchLocation)
  }

  const handleEdit = (request: WeatherRequestWithData) => {
    setEditingId(request.id)
    setEditForm({
      location: request.location,
      start_date: request.start_date,
      end_date: request.end_date,
    })
  }

  const handleUpdate = async () => {
    if (!editingId) return

    try {
      const response = await fetch(`/api/weather-history/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: editForm.location,
          startDate: editForm.start_date,
          endDate: editForm.end_date,
        }),
      })

      if (response.ok) {
        setEditingId(null)
        fetchWeatherHistory()
      } else {
        const result = await response.json()
        alert(`Error updating: ${result.error}`)
      }
    } catch (error) {
      console.error("Error updating weather request:", error)
      alert("Failed to update weather request")
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this weather request?")) return

    try {
      const response = await fetch(`/api/weather-history/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchWeatherHistory()
      } else {
        const result = await response.json()
        alert(`Error deleting: ${result.error}`)
      }
    } catch (error) {
      console.error("Error deleting weather request:", error)
      alert("Failed to delete weather request")
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const getAverageTemp = (weatherData: any[]) => {
    if (!weatherData || weatherData.length === 0) return "N/A"
    const avg = weatherData.reduce((sum, data) => sum + data.temperature, 0) / weatherData.length
    return `${Math.round(avg * 10) / 10}°C`
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weather History
            {usingMemoryStorage && (
              <Badge variant="outline" className="ml-2">
                <HardDrive className="h-3 w-3 mr-1" />
                Demo Mode
              </Badge>
            )}
          </CardTitle>
          {usingMemoryStorage && (
            <p className="text-sm text-gray-600">
              Using sample data - database tables are being set up. New requests will be stored temporarily.
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Create */}
          <div className="flex gap-2">
            <Input
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} variant="outline">
              <Search className="h-4 w-4" />
            </Button>
            <Button onClick={onCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              New Request
            </Button>
          </div>

          {/* Storage Status */}
          {usingMemoryStorage && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-blue-600" />
                <p className="text-blue-800 text-sm">
                  <span className="font-semibold">Demo Mode:</span> Using sample data and temporary storage. Database
                  setup in progress.
                </p>
              </div>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading weather history...</p>
            </div>
          )}

          {/* Weather Requests */}
          {!loading && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Calendar className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No weather requests found</p>
                  <Button onClick={onCreateNew} className="mt-2">
                    Create your first request
                  </Button>
                </div>
              ) : (
                requests.map((request) => (
                  <Card key={request.id} className="border-l-4 border-l-blue-500">
                    <CardContent className="p-4">
                      {editingId === request.id ? (
                        // Edit form
                        <div className="space-y-3">
                          <div>
                            <Label htmlFor="location">Location</Label>
                            <Input
                              id="location"
                              value={editForm.location}
                              onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <Label htmlFor="start_date">Start Date</Label>
                              <Input
                                id="start_date"
                                type="date"
                                value={editForm.start_date}
                                onChange={(e) => setEditForm({ ...editForm, start_date: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="end_date">End Date</Label>
                              <Input
                                id="end_date"
                                type="date"
                                value={editForm.end_date}
                                onChange={(e) => setEditForm({ ...editForm, end_date: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={handleUpdate} size="sm">
                              Save
                            </Button>
                            <Button onClick={() => setEditingId(null)} variant="outline" size="sm">
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        // Display view
                        <div className="flex justify-between items-start">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="font-semibold">{request.location}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <span>
                                {formatDate(request.start_date)} - {formatDate(request.end_date)}
                              </span>
                              <Badge variant="secondary">
                                <Thermometer className="h-3 w-3 mr-1" />
                                Avg: {getAverageTemp(request.weather_data)}
                              </Badge>
                              <Badge variant="outline">{request.weather_data?.length || 0} days</Badge>
                            </div>
                            <div className="text-xs text-gray-500">Created: {formatDate(request.created_at)}</div>
                          </div>
                          <div className="flex gap-2">
                            <Button onClick={() => handleEdit(request)} variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(request.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
