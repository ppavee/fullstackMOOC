import React from 'react'

const Search = ({ value, handleChange }) => {
    return (
        <div>
            find countries
            <input value={value} onChange={handleChange} />
        </div>
    )
}

export default Search