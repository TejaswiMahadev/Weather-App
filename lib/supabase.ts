import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface WeatherRequest {
  id: number
  location: string
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface WeatherData {
  id: number
  request_id: number
  date: string
  temperature: number
  feels_like?: number
  humidity?: number
  pressure?: number
  wind_speed?: number
  weather_main?: string
  weather_description?: string
  weather_icon?: string
  created_at: string
  updated_at: string
}

export interface WeatherRequestWithData extends WeatherRequest {
  weather_data: WeatherData[]
}
