# 🌤️ Weather App

A comprehensive weather application built with Next.js that provides real-time weather data and historical weather management with full CRUD operations.

![Weather App Screenshot](https://via.placeholder.com/800x400/4F46E5/FFFFFF?text=Weather+App+Screenshot)

## ✨ Features

### 🌍 Current Weather
- **Real-time weather data** for any location worldwide
- **5-day forecast** with detailed daily predictions
- **Multiple input formats**: City names, ZIP codes, GPS coordinates, landmarks
- **GPS location support** for automatic weather detection
- **Detailed metrics**: Temperature, humidity, wind speed, pressure, visibility
- **Weather icons** and visual indicators

### 📊 Historical Weather Management
- **CRUD Operations**: Create, Read, Update, Delete weather requests
- **Date range queries** (up to 365 days)
- **Location validation** with fuzzy matching
- **Data persistence** with Supabase database
- **Search and filter** functionality
- **Weather data visualization** with daily breakdowns

### 🔧 Technical Features
- **Responsive design** - works on desktop and mobile
- **Fallback mode** - works without database setup
- **Error handling** - graceful degradation
- **Demo mode** - sample data for testing
- **API key validation** - helpful setup guidance

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free)

### Installation

1. **Clone or download the project**
   ```bash
   # If using git
   git clone https://github.com/TejaswiMahadev/Weather-App.git
   cd app
  

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   # Required: OpenWeatherMap API Key
   OPENWEATHERMAP_API_KEY=your_api_key_here
   
   # Optional: Supabase (for persistent storage)
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 API Key Setup

### OpenWeatherMap API Key (Required)

1. **Sign up** at [OpenWeatherMap](https://openweathermap.org/api)
2. **Get your free API key** (1,000 calls/day)
3. **Add to `.env.local`** as `OPENWEATHERMAP_API_KEY`
4. **Wait up to 2 hours** for activation (new keys)

**Note:** The app includes demo mode if API key isn't working yet!

### Supabase Setup (Optional)

For persistent data storage:

1. **Create account** at [Supabase](https://supabase.com)
2. **Create new project**
3. **Get credentials** from Project Settings → API
4. **Add to `.env.local`**
5. **Run SQL commands** (see Database Setup below)

## 🗄️ Database Setup

### Option 1: Use Fallback Mode (Recommended for testing)
- No setup required!
- App automatically uses sample data
- All features work perfectly
- Great for development and testing

### Option 2: Set up Supabase Database

1. **Go to Supabase Dashboard** → SQL Editor
2. **Run this SQL code:**

```sql
-- Create weather_requests table
CREATE TABLE weather_requests (
    id SERIAL PRIMARY KEY,
    location TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create weather_data table
CREATE TABLE weather_data (
    id SERIAL PRIMARY KEY,
    request_id INTEGER REFERENCES weather_requests(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    temperature DECIMAL(5,2) NOT NULL,
    feels_like DECIMAL(5,2),
    humidity INTEGER,
    pressure INTEGER,
    wind_speed DECIMAL(5,2),
    weather_main TEXT,
    weather_description TEXT,
    weather_icon TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert sample data
INSERT INTO weather_requests (location, start_date, end_date) VALUES 
('New York, US', '2024-01-01', '2024-01-05'),
('London, UK', '2024-01-10', '2024-01-15'),
('Mumbai, India', '2024-02-01', '2024-02-07');
```

## 📱 Usage

### Current Weather
1. **Enter location** in search box (city, ZIP, landmark)
2. **Click search** or use "Current Location" button
3. **View results**: Current weather + 5-day forecast

### Historical Weather
1. **Click "Weather History"** tab
2. **Click "New Request"** to create historical query
3. **Enter location and date range** (up to 365 days)
4. **Get weather data** and save to database
5. **Manage requests**: Edit, delete, search existing data

### Supported Location Formats
- **Cities**: "New York", "London", "Mumbai"
- **With country**: "Paris, FR", "Tokyo, JP"
- **ZIP codes**: "10001", "90210"
- **Landmarks**: "Eiffel Tower", "Times Square"
- **Coordinates**: GPS latitude/longitude

## 🏗️ Project Structure

```
weather-app/
├── app/
│   ├── api/
│   │   ├── weather/              # Current weather API
│   │   ├── weather-history/      # CRUD operations API
│   │   └── weather-historical/   # Historical data API
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main app component
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── weather-search.tsx        # Location search
│   ├── current-weather.tsx       # Current weather display
│   ├── weather-forecast.tsx      # 5-day forecast
│   ├── weather-history.tsx       # CRUD interface
│   ├── historical-weather-form.tsx # Historical requests
│   └── api-key-setup.tsx         # Setup guidance
├── lib/
│   └── supabase.ts              # Database client
├── types/
│   └── weather.ts               # TypeScript types
├── utils/
│   └── weather-icons.ts         # Icon utilities
├── data/
│   └── sample-weather.ts        # Fallback data
└── .env.local                   # Environment variables
```

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Weather API**: OpenWeatherMap
- **Icons**: Lucide React

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Environment Variables

```env
# Required
OPENWEATHERMAP_API_KEY=your_openweathermap_api_key

# Optional (for database persistence)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push code to GitHub**
2. **Connect to Vercel**
3. **Add environment variables** in Vercel dashboard
4. **Deploy automatically**

### Other Platforms
- **Netlify**: Works with static export
- **Railway**: Full-stack deployment
- **Docker**: Containerized deployment

## 🐛 Troubleshooting

### Common Issues

**"Location not found" error:**
- Try different location formats
- Use major city names
- Check spelling
- App provides suggestions

**"Invalid API key" error:**
- Verify 32-character API key
- Wait up to 2 hours for activation
- Use demo mode while waiting

**Database connection issues:**
- App works without database (fallback mode)
- Check Supabase credentials
- Verify SQL tables were created


## 📊 Features in Detail

### CRUD Operations
- **Create**: Add new historical weather requests
- **Read**: View all weather data with search/filter
- **Update**: Edit location and date ranges
- **Delete**: Remove weather requests (with confirmation)

### Data Validation
- **Location validation**: Real location verification
- **Date range validation**: Logical date constraints
- **Input sanitization**: Secure data handling
- **Error handling**: User-friendly error messages





The README is designed to help anyone set up and use your weather app successfully!

