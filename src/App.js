import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./component/WeatherCard"; // Ensure you import WeatherCard component
import './App.css';

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Toronto');
    const [inputCity, setInputCity] = useState(''); // For the search input
    const API_KEY = '8828b96f5fda4b56e77e89cab4e9caf6';

    // Fetch weather data using useEffect hook
    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then((response) => setWeather(response.data))
            .catch((error) => console.error(error));
    }, [city]);

    // Check if weather data is available
    if (!weather) {
        return <div>Loading...</div>;
    }

    // Function to handle search input change
    const handleSearchChange = (e) => {
        setInputCity(e.target.value);
    };

    // Function to handle search
    const handleSearch = () => {
        if (inputCity.trim() !== "") {
            setCity(inputCity); // Update city state to trigger API call
            setInputCity(''); // Clear the input field after search
        }
    };

    // Details and forecast for the WeatherCard
    const details = [
        { label: "Humidity", value: `${weather.main.humidity}%` },
        { label: "Wind", value: `${weather.wind.speed} km/h` },
        { label: "Air Pressure", value: `${weather.main.pressure} hPa` },
        { label: "Max Temp", value: `${Math.round(weather.main.temp_max - 273.15)}°C` },
        { label: "Min Temp", value: `${Math.round(weather.main.temp_min - 273.15)}°C` },
    ];

    const forecast = [
        { day: "Mon", icon: "01d", temp: 27, description: "Sunny" },
        { day: "Tue", icon: "02d", temp: 23, description: "Cloudy" },
        { day: "Wed", icon: "03d", temp: 27, description: "Cloudy" },
        { day: "Thu", icon: "01d", temp: 31, description: "Sunny" },
        { day: "Fri", icon: "01d", temp: 32, description: "Sunny" },
    ];

    return (
        <div className="App">
            <div className="search-box">
                <input
                    type="text"
                    value={inputCity}
                    onChange={handleSearchChange}
                    placeholder="Enter city"
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <WeatherCard
                day="Today"
                date={new Date().toLocaleDateString()}
                location={weather.name}
                temperature={Math.round(weather.main.temp - 273.15)} // Convert from Kelvin to Celsius
                description={weather.weather[0].description}
                details={details}
                forecast={forecast}
            />
        </div>
    );
}

export default App;
