import React from 'react'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.inputAttr.value,
      author: author.inputAttr.value,
      info: info.inputAttr.value,
      votes: 0
    })
  }

  const handleReset = (e) => {
    e.preventDefault()
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' {...content.inputAttr} />
        </div>
        <div>
          author
          <input name='author' {...author.inputAttr} />
        </div>
        <div>
          url for more info
          <input name='info'{...info.inputAttr} />
        </div>
        <button>create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

export default CreateNew