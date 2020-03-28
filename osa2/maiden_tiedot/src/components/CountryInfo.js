import React from 'react'

const CountryInfo = ({ country }) => {
    return (
        <div>
            <h1>{country.name}</h1>
            <div>
                capital {country.capital} <br />
                population {country.population}
            </div>
            <h2>languages</h2>
            <ul>
                {country.languages.map(language =>
                    <li key={language.iso639_1}>
                        {language.name}
                    </li>
                )}
            </ul>
            <img alt={country.name} width='30%' src={country.flag} />
        </div>
    )
}

export default CountryInfo