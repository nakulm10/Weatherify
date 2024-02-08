import React, { useState, useEffect } from "react";
import clouds from "./clouds.png";
import "./City.css";
import axios from "axios";
import { FaTemperatureFull } from "react-icons/fa6";
import { FaWater } from "react-icons/fa";
import { GiWaterDrop } from "react-icons/gi";
import { WiBarometer } from "react-icons/wi";
function City() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;

            fetchWeatherData(latitude, longitude);
          },
          (error) => {
            console.error("Error fetching location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: "ba071e969e383d516c8fd183a3d5639d",
              units: "metric",
            },
          }
        );

        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    getLocation();
  }, []);

  return (
    <>
      <div className="weather-data">
        <div className="city">
          <img src={clouds} alt="Clouds" />
          <div className="cityname">
            {weatherData && <h2>{weatherData.name}</h2>}
          </div>
        </div>
        <div className="details">
          {weatherData && (
            <>
              <div className="col">
                <div>
                  <FaTemperatureFull className="icon" />
                  <h2 className="Temperature">{weatherData.main.temp}°C</h2>
                  <h3>Temperature</h3>
                </div>
              </div>
              <div className="col">
                <div>
                  <FaWater className="icon" />
                  <h2 className="Wind-Speed">{weatherData.wind.speed} km/h</h2>
                  <h3>Wind Speed</h3>
                </div>
              </div>
              <div className="col">
                <div>
                  <WiBarometer className="icon" />
                  <h2 className="Pressure">{weatherData.main.pressure} mb</h2>
                  <h3>Pressure</h3>
                </div>
              </div>
              <div className="col">
                <div>
                  <GiWaterDrop className="icon" />
                  <h2 className="Humidity">{weatherData.main.humidity}%</h2>
                  <h3>Humidity</h3>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default City;
