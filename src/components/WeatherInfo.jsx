import React from "react";
import { useWeather } from "../context/WeatherContext";

const getWeatherIcon = (condition, isDay = true) => {
  const iconMap = {
    clear: isDay ? "☀️" : "🌙",
    clouds: "☁️",
    rain: "🌧️",
    snow: "❄️",
    thunderstorm: "⛈️",
    drizzle: "🌦️",
    mist: "🌫️",
    fog: "🌫️",
  };

  const conditionLower = condition?.toLowerCase() || "";
  for (const [key, icon] of Object.entries(iconMap)) {
    if (conditionLower.includes(key)) return icon;
  }
  return isDay ? "☀️" : "🌙";
};

export default function WeatherInfo() {
  const {
    weather,
    temperatureUnit,
    toggleTemperatureUnit,
    convertTemperature,
    getTemperatureSymbol,
  } = useWeather();

  if (!weather) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🌤️</div>
        <p className="text-white/70 text-lg">
          Search for a city to see weather
        </p>
      </div>
    );
  }

  const currentTime = new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const currentHour = new Date().getHours();

  const getTimePeriod = (hour) => {
    if (hour >= 6 && hour < 12) {
      return "day";
    } else if (hour >= 12 && hour < 18) {
      return "afternoon";
    } else {
      return "night";
    }
  };

  const timePeriod = getTimePeriod(currentHour);

  const isDay = timePeriod === "day";
  const isAfternoon = timePeriod === "afternoon";
  const isNight = timePeriod === "night";

  const isDayTime = isDay || isAfternoon;

  const getCurrentDate = () => {
    const now = new Date();
    const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
    const day = now.getDate();

    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${dayName} ${day}${getOrdinalSuffix(day)}`;
  };

  const forecastData = weather.forecast || [];
  const weatherIcon = getWeatherIcon(weather.condition, isDayTime);

  return (
    <div className="text-center max-w-7xl mx-auto  p-4">
      <div className="flex justify-between items-start mb-8">
        <div className="text-left">
          <h1 className="lg:text-2xl font-light text-lg">Weather Insights</h1>
        </div>
        <div className="text-right">
          <div className="text-lg font-light lg:text-2xl">{weather.city}</div>
          <div className="text-sm text-white/70">{currentTime}</div>
        </div>
      </div>

      {/* Temperature Unit Toggle Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={toggleTemperatureUnit}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg backdrop-blur-sm border border-white/30 transition-colors duration-200 text-sm font-medium"
        >
          Switch to {temperatureUnit === "celsius" ? "°F" : "°C"}
        </button>
      </div>

      <div className="mb-8">
        <div className="text-8xl mb-4">{weatherIcon}</div>
      </div>

      <div className="flex flex-col lg:flex-row gap-14 lg:bg-amber-50/10 lg:rounded-xl lg:p-2">
        <div className="flex  flex-[0.3]  relative  ml-6 lg:ml-0 ">
          <div className="w-full flex items- justify-center flex-col flex-1  ">
            <p>WEATHER</p>
            <div className="text-6xl font-light bg">
              {convertTemperature(weather.temperature)}
              {getTemperatureSymbol()}
            </div>
            <div className="text-lg text-white/90">{getCurrentDate()}</div>
          </div>

          <div className="text-left ml-10  flex-1 flex flex-col  justify-center">
            <div className="text-7xl">{weatherIcon}</div>
            <div className="text-sm text-white/70">
              {weather.windSpeed}mph / {convertTemperature(weather.temperature)}
              {getTemperatureSymbol()}
            </div>
          </div>
          <div className="h-full w-[2px] bg-gray-200 absolute -right-11 hidden lg:block"></div>
        </div>
        <div className="flex-[0.7] bg-amber-50/10 p-2 rounded-xl lg:p-0 lg:rounded-none lg:bg-transparent">
          <div className="grid grid-cols-6  h-full">
            {forecastData.map((day, index) => (
              <div
                className="flex  items-center justify-center  relative "
                key={index}
              >
                <div className="text-center  flex flex-col h-full justify-evenly">
                  <div className="text-sm text-white/70 mb-2 lg:text-lg">
                    {day.day}
                  </div>
                  <div className="text-2xl mb-2">
                    {getWeatherIcon(day.condition, true)}
                  </div>
                  <div className="lg:text-lg font-medium text-sm">
                    {convertTemperature(day.temp)}
                    {getTemperatureSymbol()}
                  </div>
                </div>
                {index !== forecastData.length - 1 && (
                  <div className="h-full w-[2px] bg-gray-200 absolute right-0 hidden lg:block"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// {index !== forecastData.length - 1 && (
//   <div className="h-full w-[2px] bg-gray-200"></div>
// )}
