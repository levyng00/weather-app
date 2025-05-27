# 🌤️ Weather App

A modern, responsive weather application built with React and Vite, featuring real-time weather data and 6-day forecasts.

## ✨ Features

- 🔍 **Real-time Weather Search** - Search for weather in any city worldwide
- 📊 **6-Day Forecast** - Extended weather predictions with daily summaries
- 🌡️ **Temperature Units** - Toggle between Celsius and Fahrenheit
- 💾 **Persistent Preferences** - Remembers your last searched city and temperature unit
- 📱 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast Performance** - Optimized with caching and efficient state management
- 🎨 **Modern UI** - Clean design with gradient backgrounds and smooth animations

## 🚀 Demo

https://weather-app-smoky-three-68.vercel.app | [GitHub Repository](https://github.com/yourusername/weather-app)

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.1.0
- **Build Tool:** Vite 6.3.5
- **Styling:** TailwindCSS 4.1.7
- **State Management:** React Context API + TanStack React Query 5.77.2
- **API:** OpenWeatherMap API
- **Code Quality:** ESLint with React-specific rules

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Create a .env file in the root directory
   echo "VITE_WEATHER_API_KEY=your_openweathermap_api_key" > .env
   ```



4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── api/
│   └── weatherApi.js          # Weather API integration
├── components/
│   ├── SearchInput.jsx        # City search component
│   ├── WeatherInfo.jsx        # Weather display component
│   └── ErrorDisplay.jsx       # Error handling component
├── context/
│   └── WeatherContext.jsx     # Global state management
├── hooks/
│   └── useWeatherQuery.js     # Custom data fetching hook
├── assets/                    # Static assets
├── App.jsx                    # Main application component
└── main.jsx                   # Application entry point
```

## 🏛️ Architecture

### State Management Strategy

- **React Context API**: Global state for weather data and user preferences
- **TanStack React Query**: Server state management with automatic caching
- **Local Storage**: Persistence for user settings

### Key Design Patterns

- **Component Composition**: Modular, reusable components
- **Custom Hooks**: Abstracted data fetching logic
- **Error Boundaries**: Graceful error handling
- **Responsive Design**: Mobile-first approach

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌟 Key Features Explained

### Smart Caching

- 5-minute cache for weather data
- Background refetching for fresh data
- Optimized API calls to reduce load times

### User Experience

- **Persistent State**: App remembers your last searched city
- **Temperature Toggle**: Instant conversion between °C and °F
- **Loading States**: Smooth loading indicators
- **Error Handling**: User-friendly error messages

### Performance Optimizations

- React Query caching reduces unnecessary API calls
- Efficient component re-renders

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [OpenWeatherMap](https://openweathermap.org/) for providing the weather API
- [React](https://reactjs.org/) team for the amazing framework
- [Vite](https://vitejs.dev/) for the lightning-fast build tool
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS framework

## 📧 Contact

Your Name - [@yourusername](https://twitter.com/yourusername) - your.email@example.com

Project Link: https://weather-app-smoky-three-68.vercel.app
---

⭐ Star this repo if you found it helpful!
