export const sampleWeatherData = {
  current: {
    name: "New York",
    sys: {
      country: "US",
    },
    main: {
      temp: 22,
      feels_like: 25,
      humidity: 65,
      pressure: 1013,
    },
    weather: [
      {
        main: "Clear",
        description: "clear sky",
        icon: "01d",
      },
    ],
    wind: {
      speed: 3.5,
      deg: 230,
    },
    visibility: 10000,
  },
  forecast: {
    list: [
      {
        dt: Math.floor(Date.now() / 1000),
        main: { temp: 22, temp_min: 18, temp_max: 25 },
        weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
        dt_txt: new Date().toISOString(),
      },
      {
        dt: Math.floor(Date.now() / 1000) + 86400,
        main: { temp: 24, temp_min: 20, temp_max: 27 },
        weather: [{ main: "Clouds", description: "few clouds", icon: "02d" }],
        dt_txt: new Date(Date.now() + 86400000).toISOString(),
      },
      {
        dt: Math.floor(Date.now() / 1000) + 172800,
        main: { temp: 19, temp_min: 15, temp_max: 22 },
        weather: [{ main: "Rain", description: "light rain", icon: "10d" }],
        dt_txt: new Date(Date.now() + 172800000).toISOString(),
      },
      {
        dt: Math.floor(Date.now() / 1000) + 259200,
        main: { temp: 21, temp_min: 17, temp_max: 24 },
        weather: [{ main: "Clouds", description: "scattered clouds", icon: "03d" }],
        dt_txt: new Date(Date.now() + 259200000).toISOString(),
      },
      {
        dt: Math.floor(Date.now() / 1000) + 345600,
        main: { temp: 26, temp_min: 22, temp_max: 29 },
        weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
        dt_txt: new Date(Date.now() + 345600000).toISOString(),
      },
    ],
  },
}

export const sampleLocations = [
  { name: "New York, US", temp: 22, weather: "Clear", icon: "01d" },
  { name: "London, UK", temp: 15, weather: "Clouds", icon: "04d" },
  { name: "Tokyo, JP", temp: 28, weather: "Rain", icon: "10d" },
  { name: "Sydney, AU", temp: 18, weather: "Clear", icon: "01d" },
  { name: "Paris, FR", temp: 20, weather: "Clouds", icon: "02d" },
]
