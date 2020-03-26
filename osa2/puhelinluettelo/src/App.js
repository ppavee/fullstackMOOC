import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName
        }
        const names = persons.map(person => person.name)
        if (names.indexOf(newName) !== -1) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
        }
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson} >
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person =>
                <p key={person.name}>
                    {person.name}
                </p>
            )}
        </div>
    )

}

export default App