import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { WeatherData } from "@/types/weather"
import { getWeatherIcon } from "@/utils/weather-icons"
import { Thermometer, Droplets, Wind, Eye, Gauge } from "lucide-react"

interface CurrentWeatherProps {
  data: WeatherData["current"]
}

export function CurrentWeather({ data }: CurrentWeatherProps) {
  const weather = data.weather[0]

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {data.name}, {data.sys.country}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main weather display */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-4">
            <img
              src={getWeatherIcon(weather.icon) || "/placeholder.svg"}
              alt={weather.description}
              className="w-20 h-20"
            />
            <div>
              <div className="text-5xl font-bold">{Math.round(data.main.temp)}°C</div>
              <div className="text-lg text-gray-600 capitalize">{weather.description}</div>
            </div>
          </div>
          <div className="text-lg text-gray-600">Feels like {Math.round(data.main.feels_like)}°C</div>
        </div>

        {/* Weather details grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Thermometer className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Feels Like</div>
              <div className="font-semibold">{Math.round(data.main.feels_like)}°C</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Humidity</div>
              <div className="font-semibold">{data.main.humidity}%</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Wind className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Wind Speed</div>
              <div className="font-semibold">{Math.round(data.wind.speed * 3.6)} km/h</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Eye className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Visibility</div>
              <div className="font-semibold">{Math.round(data.visibility / 1000)} km</div>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
            <Gauge className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-gray-600">Pressure</div>
              <div className="font-semibold">{data.main.pressure} hPa</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
