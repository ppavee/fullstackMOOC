import React from 'react'

const WeatherInfo = ({weatherInfo}) => {
    return (
        <div>
            <p><b>temperature: </b>{weatherInfo.temperature} Celcius</p>
            <img alt={weatherInfo.weather_description} src={weatherInfo.weather_icons} />
            <p><b>wind: </b>{weatherInfo.wind_speed} mph direction {weatherInfo.wind_dir}</p>
        </div>
    )
}

export default WeatherInfo