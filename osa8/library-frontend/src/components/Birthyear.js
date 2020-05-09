import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_BIRTHYEAR } from '../queries'

const Birthyear = ({ options, setError }) => {
  const [selectedOption, setSelectedOption] = useState(options[0].value)
  const [born, setBorn] = useState('')

  const [editBirthyear] = useMutation(EDIT_BIRTHYEAR, {
    onError: (error) => {
      setError("Age must be an integer")
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    if(selectedOption === 'default') {
      setError('Please select an author to edit')
    } else {
      editBirthyear({ variables: { name: selectedOption, setBornTo: Number(born) } })
      setBorn('')
    }
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          <select value={selectedOption} onChange={(event) => setSelectedOption(event.target.value)}>
            {options.map(opt => 
              <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>
        <div>
          born <input value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Birthyear