import React from 'react'

const Country = ({ country, handleCountryClick }) => {
    return (
        <div>
            {country.name}
            <button onClick={() => handleCountryClick(country.name)}>show</button>
        </div>
    )
}

export default Country