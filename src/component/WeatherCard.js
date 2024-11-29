import React from "react";
import "./WeatherCard.css";

const WeatherCard = ({ day, date, location, temperature, description, details = [], icon }) => {
    return (
        <div className="weather-card">
            <div className="main-section">
                <div className="date-info">
                    <h2>{day}</h2>
                    <p>{date}</p>
                    <p>{location}</p>
                </div>
                <div className="temp-info">
                    <h1>{temperature}°C</h1>
                    <img
                        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt={`Weather icon for ${description}`}
                        className="weather-icon"
                    />
                    <p>{description}</p>
                </div>
            </div>

            <div className="details-section">
                {details.length > 0 ? (
                    <div className="details">
                        {details.map((item, index) => (
                            <p key={index}>
                                <strong>{item.label}:</strong> {item.value}
                            </p>
                        ))}
                    </div>
                ) : (
                    <p>No additional details available.</p>
                )}
            </div>
        </div>
    );
};

export default WeatherCard;
