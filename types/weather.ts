export interface WeatherData {
  current: {
    name: string
    sys: {
      country: string
    }
    main: {
      temp: number
      feels_like: number
      humidity: number
      pressure: number
    }
    weather: Array<{
      main: string
      description: string
      icon: string
    }>
    wind: {
      speed: number
      deg: number
    }
    visibility: number
  }
  forecast: {
    list: Array<{
      dt: number
      main: {
        temp: number
        temp_min: number
        temp_max: number
      }
      weather: Array<{
        main: string
        description: string
        icon: string
      }>
      dt_txt: string
    }>
  }
}
