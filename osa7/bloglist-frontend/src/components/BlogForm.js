import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { changeVisibility } from '../reducers/togglableReducer'
import blogService from '../services/blogs'

import { TextField, Button, Typography } from '@material-ui/core'


const BlogForm = () => {
  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const content = {
      title, author, url
    }
    try {
      const newBlog = await blogService.create(content)

      dispatch(createBlog(newBlog))
      createNotification(`a new blog ${title} by ${author} added`, 'success')
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(changeVisibility(false))
    } catch(exception) {
      createNotification('There was an error while trying to add a new blog', 'error')
    }
  }

  const createNotification = (message, type) => {
    dispatch(notificationChange({ message, type }))
  }

  return (
    <div>
      <Typography variant='subtitle2' gutterBottom={true}>create new</Typography>
      <form onSubmit={addBlog}>
        <div>
          <TextField label='title'
            id='blog-title'
            type='text'
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <TextField label='author'
            id='blog-author'
            type='text'
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          <TextField label='url'
            id='blog-url'
            type='text'
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <Button size='small' variant='contained' color='primary' id='blog-submit' type='submit'>create</Button>
      </form>
    </div>
  )
}


export default BlogForm