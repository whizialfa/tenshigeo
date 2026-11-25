import type { Destination } from "./types";

export const DESTINATIONS: Destination[] = [
  { id: "london", name: "London", country: "United Kingdom", lat: 51.5074, lon: -0.1278, zoom: 12.2 },
  { id: "paris", name: "Paris", country: "France", lat: 48.8566, lon: 2.3522, zoom: 12.4 },
  { id: "new-york", name: "New York", country: "United States", lat: 40.7128, lon: -74.006, zoom: 12.0 },
  { id: "tokyo", name: "Tokyo", country: "Japan", lat: 35.6762, lon: 139.6503, zoom: 11.8 },
  { id: "lagos", name: "Lagos", country: "Nigeria", lat: 6.5244, lon: 3.3792, zoom: 11.6 },
  { id: "abuja", name: "Abuja", country: "Nigeria", lat: 9.0765, lon: 7.3986, zoom: 12.0 },
  { id: "rome", name: "Rome", country: "Italy", lat: 41.9028, lon: 12.4964, zoom: 12.3 },
  { id: "berlin", name: "Berlin", country: "Germany", lat: 52.52, lon: 13.405, zoom: 12.0 },
  { id: "madrid", name: "Madrid", country: "Spain", lat: 40.4168, lon: -3.7038, zoom: 12.1 },
  { id: "amsterdam", name: "Amsterdam", country: "Netherlands", lat: 52.3676, lon: 4.9041, zoom: 12.5 },
  { id: "lisbon", name: "Lisbon", country: "Portugal", lat: 38.7223, lon: -9.1393, zoom: 12.4 },
  { id: "vienna", name: "Vienna", country: "Austria", lat: 48.2082, lon: 16.3738, zoom: 12.2 },
  { id: "sydney", name: "Sydney", country: "Australia", lat: -33.8688, lon: 151.2093, zoom: 11.8 },
  { id: "cape-town", name: "Cape Town", country: "South Africa", lat: -33.9249, lon: 18.4241, zoom: 11.9 },
  { id: "singapore", name: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198, zoom: 11.7 },
  { id: "dubai", name: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708, zoom: 11.5 },
];

export function getDestination(id: string) {
  return DESTINATIONS.find((d) => d.id === id);
}
