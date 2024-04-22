import React, { useState, useEffect } from 'react';

function Weather() {
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cachedWeather, cachedTime] = getFromLocalStorage(['cachedWeather', 'cachedTime']);

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
          saveToLocalStorage('cachedWeather', filteredData);
          saveToLocalStorage('cachedTime', Date.now());
        }
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
      setLoading(false);
    };

    fetchData();

    const intervalId = setInterval(fetchData, 12 * 60 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const filterDataForDisplay = (times, temperatures) => {
    return times.filter((_, index) => index % 12 === 0)
      .map((time, index) => ({ date: time, temperature: temperatures[index * 12] }));
  };

  const getFromLocalStorage = (keys) => keys.map(key => JSON.parse(localStorage.getItem(key)));
  const saveToLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

  if (loading) {
    return <p class="text-3xl font-bold mb-4">Loading weather data...</p>;
  }

  return (
    <div class="text-center">
      <h2 class="text-3xl font-bold mb-4 ml-4 mt-12">Weather Forecast (Every 12 Hours) + Historical Average Temperatures from 4/22-4/28</h2>
      <ul class="w-1/2 mb-4 ml-36 mt-12 border border-black">
        {weather.map((item, index) => (
          <li key={index} class="px-4 py-2">{`${new Date(item.date).toLocaleString()} - Temperature: ${item.temperature}°C`}</li>
        ))}
      </ul>
    </div>
  );
}

export default Weather;

//chatgbt helped with making the api only show every 12 hours instead of every hour... couldnt figure that out myself..