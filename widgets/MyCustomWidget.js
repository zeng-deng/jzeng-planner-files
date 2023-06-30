import React, { useState, useEffect } from 'react';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = 'd6c004d4ae48a21a0fabf9f031c9a7a0'; 

  useEffect(() => {
    // Fetch weather data based on user's location
    const fetchWeatherData = async () => {
      try {
        if (!navigator.geolocation) {
          throw new Error('Geolocation is not supported by your browser');
        }

        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
            );
            
            if (response.ok) {
              const data = await response.json();
              setWeatherData(data);
              setLoading(false);
            } else {
              throw new Error('Unable to fetch weather data');
            }
          },
          (error) => {
            throw new Error(`Geolocation error: ${error.message}`);
          }
        );
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return null;
  }

  const { name, main, weather } = weatherData;
  const temperature = Math.round(main.temp - 273.15); // Convert temperature from Kelvin to Celsius

  return (
    <div>
      <h1>Weather</h1>
      <h2>Place:: {name}</h2>      
      <p>Temperature:: {temperature}°C</p>
      <p>Weather:: {weather[0].description}</p>
    </div>
  );
}

export default Weather;
