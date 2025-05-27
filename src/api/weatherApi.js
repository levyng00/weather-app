// weatherApi.js
const API_KEY = "bde8ec78aa57f46bd678d78ef13a008e"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

export async function getWeatherByCity(city) {
  try {
    const [weatherResponse, forecastResponse] = await Promise.all([
      fetch(
        `${BASE_URL}?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      ),
      fetch(
        `${FORECAST_URL}?q=${encodeURIComponent(
          city
        )}&appid=${API_KEY}&units=metric`
      ),
    ]);

    if (!weatherResponse.ok) {
      if (weatherResponse.status === 404) {
        throw new Error("City not found");
      }
      throw new Error("Failed to fetch weather data");
    }

    const weatherData = await weatherResponse.json();
    const forecastData = await forecastResponse.json();

    // Process forecast data to get daily forecasts
    const dailyForecasts = processForecastData(forecastData.list);

    return {
      city: weatherData.name,
      temperature: weatherData.main.temp,
      humidity: weatherData.main.humidity,
      windSpeed: weatherData.wind.speed,
      condition: weatherData.weather[0].main,
      icon: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      description: weatherData.weather[0].description,
      forecast: dailyForecasts,
    };
  } catch (error) {
    throw new Error(error.message || "Network error");
  }
}

function processForecastData(forecastList) {
  // Group forecasts by date and get one forecast per day (around noon)
  const dailyForecasts = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000);
    const dateKey = date.toDateString();
    const hour = date.getHours();

    // Take the forecast closest to noon (12:00) for each day
    if (
      !dailyForecasts[dateKey] ||
      Math.abs(hour - 12) < Math.abs(dailyForecasts[dateKey].hour - 12)
    ) {
      dailyForecasts[dateKey] = {
        date: date,
        hour: hour,
        temp: Math.round(item.main.temp),
        condition: item.weather[0].main,
        icon: item.weather[0].icon,
        day: date.toLocaleDateString("en-US", { weekday: "short" }),
      };
    }
  });

  // Convert to array and take first 6 days
  return Object.values(dailyForecasts).slice(0, 6);
}
