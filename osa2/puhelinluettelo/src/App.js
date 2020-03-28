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
        const names = persons.map(person => person.name)
        const indexOfPerson = names.indexOf(newName)
        if (indexOfPerson !== -1) {
            if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
                const oldPerson = persons[indexOfPerson]
                const newPerson = {...oldPerson, number: newNumber}
                personsService
                    .put(newPerson)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== newPerson.id ? person : newPerson))
                    })
            }
        } else {
            const newPerson = {
                name: newName,
                number: newNumber
            }
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