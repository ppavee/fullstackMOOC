import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setNewSearchTerm] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchTermChange = (event) => {
        setNewSearchTerm(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const newPerson = {
            name: newName,
            number: newNumber
        }
        const names = persons.map(person => person.name)
        if (names.indexOf(newName) !== -1) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
        }
    }

    const filteredPersons = persons.filter(person => (!searchTerm || person.name.toLowerCase().includes(searchTerm.toLowerCase())))

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={searchTerm} handleChange={handleSearchTermChange} />
            <h3>Add a new</h3>
            <PersonForm
                handleSubmit={addPerson}
                handleNameChange={handleNameChange}
                handleNumberChange={handleNumberChange}
                nameValue={newName}
                numberValue={newNumber}
            />
            <h3>Numbers</h3>
            <Persons persons={filteredPersons} />
        </div>
    )

}

export default App