import { redis } from '../data-access/redis-connection'
const API_KEY = process.env.WEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'
const TEN_MINUTES = 1000 * 60 * 10 // in milliseconds

const resultsCache: Record<string, { lastFetch: number; data: unknown }> = {}
function getCacheEntry(key: string) {
  return resultsCache[key]
}
function setCacheEntry(key: string, data: unknown) {
  resultsCache[key] = { lastFetch: Date.now(), data }
}
function isDataStale(lastFetch: number) {
  return Date.now() - lastFetch > TEN_MINUTES
}

interface FetchWeatherDataParams {
  lat: number
  lon: number
  units: 'standard' | 'metric' | 'imperial'
}

export async function fetchWeatherData({
  lat,
  lon,
  units,
}: FetchWeatherDataParams) {
  const queryString = `lat=${lat}&lon=${lon}&units=${units}`

  const cacheEntry = await redis.get(queryString)
  if (cacheEntry) return JSON.parse(cacheEntry)

  const response = await fetch(`${BASE_URL}?${queryString}&appid=${API_KEY}`)
  const data = await response.text() // avoid an unnecessary extra JSON.stringify
  await redis.set(queryString, data, { PX: TEN_MINUTES }) // The PX option sets the expiry time
  return JSON.parse(data)
}


export async function getGeoCoordsForPostalCode(
  postalCode: string,
  countryCode: string,
) {
  const url = `http://api.openweathermap.org/geo/1.0/zip?zip=${postalCode},${countryCode}&appid=${API_KEY}`
  const response = await fetch(url)
  const data = response.json()
  return data
}