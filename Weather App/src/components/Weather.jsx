import React, { useRef, useState } from "react";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import "./Weather.css";

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const inputCountryRef = useRef();

  const allIcons = {
    "01n.png": clear_icon,
    "01d.png": clear_icon,
    "02d.png": clear_icon,
    "02n.png": clear_icon,
    "03d.png": cloud_icon,
    "03n.png": cloud_icon,
    "04d.png": cloud_icon,
    "04n.png": cloud_icon,
    "09d.png": rain_icon,
    "09n.png": rain_icon,
    "10d.png": rain_icon,
    "10n.png": rain_icon,
    "11d.png": drizzle_icon,
    "11n.png": drizzle_icon,
    "13d.png": snow_icon,
    "13n.png": snow_icon,
    "50d.png": snow_icon,
    "50n.png": snow_icon,
  };

  const search = async (city) => {
    if (!city) {
      alert("Please enter a city name!");
      return;
    }

    try {
      setError(null);
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${
          import.meta.env.VITE_APP_API
        }`
      );

      if (!response.ok) {
        throw new Error("City not found");
      }

      let data = await response.json();
      const icon = allIcons[data.weather[0].icon + ".png"] || clear_icon;

      setWeatherData({
        temperature: data.main.temp,
        humidity: data.main.humidity,
        wind: data.wind.speed,
        name: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    }
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search"
          className="cityInput"
          ref={inputCountryRef}
        />
        <img
          src={search_icon}
          alt="Search"
          onClick={() => search(inputCountryRef.current.value)}
        />
      </div>
      {error && <p className="error">{error}</p>}
      {weatherData && (
        <div>
          <img
            src={weatherData.icon}
            alt="Weather Icon"
            className="weather-icon"
          />
          <p className="temp">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.name}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity} %</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed" />
              <div>
                <p>{weatherData.wind} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
