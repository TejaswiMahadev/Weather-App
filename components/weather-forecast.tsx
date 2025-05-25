import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/types/weather"
import { getWeatherIcon, formatDate } from "@/utils/weather-icons"

interface WeatherForecastProps {
  data: WeatherData["forecast"]
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  // Group forecast data by day (take one entry per day, preferably around noon)
  const dailyForecasts = data.list
    .filter((item, index) => {
      const hour = new Date(item.dt * 1000).getHours()
      return hour >= 11 && hour <= 13 // Around noon for better representation
    })
    .slice(0, 5) // Take first 5 days

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dailyForecasts.map((day, index) => (
            <div key={day.dt} className="text-center p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="font-semibold text-sm mb-2">{index === 0 ? "Today" : formatDate(day.dt)}</div>
              <img
                src={getWeatherIcon(day.weather[0].icon) || "/placeholder.svg"}
                alt={day.weather[0].description}
                className="w-12 h-12 mx-auto mb-2"
              />
              <div className="text-sm text-gray-600 capitalize mb-2">{day.weather[0].description}</div>
              <div className="space-y-1">
                <div className="font-bold text-lg">{Math.round(day.main.temp)}°C</div>
                <div className="text-xs text-gray-500">
                  H: {Math.round(day.main.temp_max)}° L: {Math.round(day.main.temp_min)}°
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
