import React from "react";
import { useWeather } from "../context/WeatherContext";

export default function ErrorDisplay() {
  const { error } = useWeather();
  if (!error) return null;
  return (
    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur-sm">
      <div className="flex items-center">
        <svg
          className="w-5 h-5 mr-2 text-red-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
        <span className="text-red-100">{error}</span>
      </div>
    </div>
  );
}
