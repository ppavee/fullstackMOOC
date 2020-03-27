import React from 'react'

const Person = ({ person, handleRemove }) => {
    return (
        <p>
            {person.name} {person.number}
            <button onClick={() => handleRemove(person.id)} >
                delete
            </button>
        </p>
    )
}

export default Person