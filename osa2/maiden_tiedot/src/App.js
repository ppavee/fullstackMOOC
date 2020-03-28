import React, { useState, useEffect } from 'react'
import countryService from './services/countries'
import Countries from './components/Countries'
import Search from './components/Search'

const App = () => {
    const [countries, setCountries] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        countryService
            .getAll()
            .then(response => {
                setCountries(response.data)
            })
    }, [])

    const handleSearchTermChange = (event) => setSearchTerm(event.target.value)

    const handleCountryClick = (name) => setSearchTerm(name)

    const filteredCountries = countries.filter(country =>
        (!searchTerm || country.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div>
            <Search value={searchTerm} handleChange={handleSearchTermChange} />
            <Countries countries={filteredCountries} handleCountryClick={handleCountryClick} />
        </div>
    )
}

export default App