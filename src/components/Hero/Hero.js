import React, { useState } from 'react';

function WeatherApp()
{
    const [city, setCity] = useState('Lahore');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleClick = async () =>
    {
        setError(null); // Clear any previous errors

        if (city)
        {
            try
            {
                const response = await fetch(
                    // fetching data through open API
                    `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=98d46ba8691414e03eeb2224dd084c7a&units=metric`
                );

                if (!response.ok)
                {
                    throw new Error('* Invalid city name *'); // Throw error for invalid input
                }

                const data = await response.json();
                setWeatherData(data);
            } catch (error)
            {
                setError(error.message || 'Something went wrong. Please try again.'); // Handle specific error messages
            }
        } else
        {
            setError('Please enter a city name.');
        }
    };

    return (
        <>
            <div className="container">
                <h3 className="heading text-center">
                    Weather Website Using AJAX
                </h3>
            </div>
            <div className="input-section">
                <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
                <button onClick={handleClick}>Get Weather</button>
                {error && <div className="error">{error}</div>}
            </div>
            {weatherData && (
                <div className="weather-data">
                    <h2>Weather for {weatherData.name}, {weatherData.sys.country}</h2>
                    <h3>   {weatherData.weather[0].main}</h3>
                    <h3>{weatherData.main.temp}°C</h3>
                </div>
            )}
        </>
    );
}

export default WeatherApp;
