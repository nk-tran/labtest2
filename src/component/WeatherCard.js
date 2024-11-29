import React from "react";
import "../styles/WeatherCard.css";

const WeatherCard = ({ day, date, location, temperature, description, details, forecast }) => {
    return (
        <div className="weather-card">
            <div className="main-section" style={{ backgroundImage: `url('/assets/image.png')` }}>
                <div className="date-info">
                    <h2>{day}</h2>
                    <p>{date}</p>
                    <p>{location}</p>
                </div>
                <div className="temp-info">
                    <h1>{temperature}°C</h1>
                    <p>{description}</p>
                </div>
            </div>
            <div className="details-section">
                <div className="details">
                    {details.map((item, index) => (
                        <p key={index}>
                            <strong>{item.label}:</strong> {item.value}
                        </p>
                    ))}
                </div>
                <div className="forecast">
                    {forecast.map((day, index) => (
                        <div key={index} className="forecast-day">
                            <p>{day.day}</p>
                            <img src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`} alt={day.description} />
                            <p>{day.temp}°C</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;