import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personsService from './services/persons'


const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setNewSearchTerm] = useState('')

    useEffect(() => {
        personsService
            .getAll()
            .then(response => {
                setPersons(response.data)
            })
    }, [])

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
            personsService
                .create(newPerson)
                .then(response => {
                    newPerson.id = response.data.id
                    setPersons(persons.concat(newPerson))
                    setNewName('')
                    setNewNumber('')
                })

        }
    }

    const handleRemove = (id) => {
        const personToDelete = persons.find(person => person.id === id)
        if(personToDelete.id > -1 && window.confirm(`Delete ${personToDelete.name}?`)) {
            personsService
                .remove(id)
                .then(response => {
                    setPersons(persons.filter(person => person.id !== id))
                })
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
            <Persons persons={filteredPersons} handleRemove={handleRemove} />
        </div>
    )

}

export default App