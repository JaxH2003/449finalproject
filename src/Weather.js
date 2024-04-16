import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cachedWeather = JSON.parse(localStorage.getItem('cachedWeather'));
        const cachedTime = localStorage.getItem('cachedTime');
        
        if (cachedWeather && cachedTime && Date.now() - Number(cachedTime) < 12 * 60 * 60 * 1000) {
          setWeather(cachedWeather);
          setLoading(false);
          return;
        }

        const response = await fetch("https://api.open-meteo.com/v1/gfs?latitude=42.737&longitude=-84.4839&hourly=temperature_2m");
        const data = await response.json();
        
        if (data && data.hourly && data.hourly.time && data.hourly.temperature_2m) {
          const filteredData = filterDataForDisplay(data.hourly.time, data.hourly.temperature_2m);
          setWeather(filteredData);
          localStorage.setItem('cachedWeather', JSON.stringify(filteredData));
          localStorage.setItem('cachedTime', Date.now());
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
        setLoading(false);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 12 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const filterDataForDisplay = (times, temperatures) => {
    return times.filter((_, index) => index % 12 === 0)
                .map((time, index) => ({ date: time, temperature: temperatures[index * 12] }));
  };

  if (loading) {
    return <p class="text-3xl font-bold mb-4">Loading weather data...</p>;
  }

  return (
    <div>
      <h1 class="text-3xl font-bold mb-4 text-center">Weather Forecast (Every 12 Hours)</h1>
      <ul class="text-2xl mb-4 ml-36 mt-12">
        {weather.map((item, index) => (
          <li key={index}>{`${new Date(item.date).toLocaleTimeString()} - Temperature: ${item.temperature}°C`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;

