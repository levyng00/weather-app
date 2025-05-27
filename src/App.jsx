import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WeatherProvider } from "./context/WeatherContext";
import SearchInput from "./components/SearchInput";
import WeatherInfo from "./components/WeatherInfo";
import ErrorDisplay from "./components/ErrorDisplay";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherProvider>
        <div className="min-h-screen bg-gradient-to-b from-[#394a79] via-[#7a839f] to-[#6f7954] text-white p-8 ">
          <div className="max-w-7xl mx-auto">
            <SearchInput />
            <ErrorDisplay />
            <WeatherInfo />
          </div>
        </div>
      </WeatherProvider>
    </QueryClientProvider>
  );
}
