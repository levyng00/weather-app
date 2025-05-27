import React, { createContext, useContext, useState, useEffect } from "react";
import { useWeatherQuery } from "../hooks/useWeatherQuery";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [city, setCity] = useState(
    () => localStorage.getItem("lastCity") || ""
  );

  const [temperatureUnit, setTemperatureUnit] = useState(
    () => localStorage.getItem("temperatureUnit") || "celsius"
  );

  const {
    data: weather,
    isLoading: loading,
    error,
    refetch,
  } = useWeatherQuery(city);

  useEffect(() => {
    if (weather && weather.city) {
      localStorage.setItem("lastCity", weather.city);
      if (weather.city !== city) {
        setCity(weather.city);
      }
    }
  }, [weather, city]);

  useEffect(() => {
    localStorage.setItem("temperatureUnit", temperatureUnit);
  }, [temperatureUnit]);

  const searchCity = (newCity) => {
    setCity(newCity);
  };

  const toggleTemperatureUnit = () => {
    setTemperatureUnit((prev) =>
      prev === "celsius" ? "fahrenheit" : "celsius"
    );
  };

  const convertTemperature = (tempCelsius) => {
    if (temperatureUnit === "fahrenheit") {
      return Math.round((tempCelsius * 9) / 5 + 32);
    }
    return Math.round(tempCelsius);
  };

  const getTemperatureSymbol = () => {
    return temperatureUnit === "celsius" ? "°C" : "°F";
  };

  const errorMessage = error ? error.message : null;

  return (
    <WeatherContext.Provider
      value={{
        city,
        weather,
        loading,
        error: errorMessage,
        searchCity,
        refetch,
        temperatureUnit,
        toggleTemperatureUnit,
        convertTemperature,
        getTemperatureSymbol,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

export function useWeather() {
  return useContext(WeatherContext);
}
