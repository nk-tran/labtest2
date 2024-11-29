import React, { useState, useEffect } from "react";
import axios from "axios";
import WeatherCard from "./component/WeatherCard";
import './App.css';

function App() {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('Toronto');
    const [inputCity, setInputCity] = useState('');
    const API_KEY = '8828b96f5fda4b56e77e89cab4e9caf6';


    useEffect(() => {
        axios
            .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`)
            .then((response) => setWeather(response.data))
            .catch((error) => console.error(error));
    }, [city]);


    if (!weather) {
        return <div>Loading...</div>;
    }


    const handleSearchChange = (e) => {
        setInputCity(e.target.value);
    };


    const handleSearch = () => {
        if (inputCity.trim() !== "") {
            setCity(inputCity);
            setInputCity('');
        }
    };


    const details = [
        { label: "Humidity", value: `${weather.main.humidity}%` },
        { label: "Wind", value: `${weather.wind.speed} km/h` },
        { label: "Pressure", value: `${weather.main.pressure} hPa` },
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
                icon={weather.weather[0].icon}
                temperature={Math.round(weather.main.temp - 273.15)}
                description={weather.weather[0].description}
                details={details}
            />
        </div>
    );
}

export default App;
