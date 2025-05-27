import { useQuery } from "@tanstack/react-query";
import { getWeatherByCity } from "../api/weatherApi";

export function useWeatherQuery(city, enabled = true) {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: () => getWeatherByCity(city),
    enabled: enabled && !!city,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchIntervalInBackground: false,
    retry: (failureCount, error) => {
      if (error.message === "City not found") {
        return false;
      }
      return failureCount < 3;
    },
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
