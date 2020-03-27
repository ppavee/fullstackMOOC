import React from 'react'
import Country from './Country'
import CountryInfo from './CountryInfo'

const Countries = ({countries}) => {
    if(countries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if(countries.length === 1) {
        return (
            <div>
                <CountryInfo country={countries[0]} />
            </div>
        )
    }

    return (
        <div>
            {countries.map(country => 
                <Country key={country.numericCode} country={country} />
            )}
        </div>
    )
}

export default Countries