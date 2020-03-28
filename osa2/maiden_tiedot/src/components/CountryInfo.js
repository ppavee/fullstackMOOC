import React, { useEffect, useState } from 'react'
import weatherService from '../services/weather'
import WeatherInfo from './WeatherInfo'


const CountryInfo = ({ country }) => {
    const [currentWeather, setCurrentWeather] = useState({})

    useEffect(() => {
        weatherService
            .getCurrentByCapital(country.capital)
            .then(response => {
                setCurrentWeather(response.data.current)
            })
            //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                capital {country.capital} <br />
                population {country.population}
            </div>
            <h2>Spoken languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img alt={country.name} width='30%' src={country.flag} />
            <h2>Weather in {country.capital}</h2>
            <WeatherInfo weatherInfo={currentWeather} />
        </div>
    )
}

export default CountryInfo