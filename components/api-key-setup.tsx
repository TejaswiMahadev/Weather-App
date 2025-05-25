"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Key, Clock, CheckCircle, Play } from "lucide-react"

interface ApiKeySetupProps {
  onTryDemo: () => void
}

export function ApiKeySetup({ onTryDemo }: ApiKeySetupProps) {
  return (
    <Card className="border-orange-200 bg-orange-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-800">
          <Key className="h-5 w-5" />
          OpenWeatherMap API Key Issue
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
          <p className="text-blue-800 font-semibold mb-2">Try Demo Mode First!</p>
          <p className="text-blue-700 text-sm mb-3">
            Test the app functionality with sample weather data while your API key activates.
          </p>
          <Button onClick={onTryDemo} className="bg-blue-600 hover:bg-blue-700">
            <Play className="h-4 w-4 mr-2" />
            Try Demo Mode
          </Button>
        </div>

        <p className="text-orange-700">
          Your API key might be inactive or invalid. New OpenWeatherMap API keys can take up to 2 hours to activate.
        </p>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div>
              <p className="font-semibold text-orange-800">Get a free API key</p>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Sign Up for API Key
                </a>
              </Button>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div>
              <p className="font-semibold text-orange-800">Copy your 32-character API key</p>
              <p className="text-sm text-orange-600">It should look like: 89c99757eec2d517b2862d2296253f10</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-orange-200 text-orange-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
              3
            </div>
            <div>
              <p className="font-semibold text-orange-800">Update environment variable</p>
              <p className="text-sm text-orange-600">Set OPENWEATHERMAP_API_KEY in your Vercel project</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-800">Wait for activation (up to 2 hours)</p>
              <p className="text-sm text-orange-600">New API keys need time to become active</p>
            </div>
          </div>
        </div>

        <div className="bg-orange-100 p-3 rounded-lg">
          <p className="text-sm text-orange-700">
            <CheckCircle className="h-4 w-4 inline mr-1" />
            The free plan includes 1,000 API calls per day!
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
