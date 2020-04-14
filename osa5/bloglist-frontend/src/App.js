import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const blogFormRef = React.createRef()

  const sortBlogsByLikes = (blogs) => {
    return blogs.sort((b1, b2) => {
      return (b1.likes === b2.likes)
        ? 0
        : -(b1.likes - b2.likes)
    })
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogsByLikes(blogs))
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setSuccessMessage(`Welcome ${user.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    setUser(null)
    setSuccessMessage('Logout successful')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }

  const addBlog = newBlog => {
    blogFormRef.current.toggleVisibility()
    try {
      blogService
        .create(newBlog)
        .then(returnedBlog => {
          returnedBlog = { ...returnedBlog, user: {
            id: returnedBlog.user,
            name: user.name,
            username: user.username
          }}
          setBlogs(sortBlogsByLikes(blogs.concat(returnedBlog)))
        })
      setSuccessMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('There was an error while trying to add a new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLike = blog => {
    try {
      blogService
        .like(blog)
        .then(returnedBlog => {
          returnedBlog.user = blog.user
          setBlogs(sortBlogsByLikes(blogs.map(b => b.id !== returnedBlog.id ? b : returnedBlog)))
        })
      setSuccessMessage(`${blog.title} liked`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('There was an error while trying to like the blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const removeBlog = (blog) => {
    const removeBlogConfirmation = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
    if (removeBlogConfirmation) {
      try {
        blogService.remove(blog.id)
          .then(response => {
            setBlogs(sortBlogsByLikes(blogs.filter(b => b.id !== blog.id)))
          })

        setSuccessMessage(`${blog.title} removed`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      } catch (exception) {
        setErrorMessage('There was an error while trying to remove the blog')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }
  }

  const loginForm = () => {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={errorMessage} cssClass='error' />
        <Notification message={successMessage} cssClass='success' />
        <form onSubmit={handleLogin}>
          <div>
            username
        <input
              type='text'
              value={username}
              onChange={handleUsernameChange}
              name='Username'
            />
          </div>
          <div>
            password
        <input
              type='password'
              value={password}
              onChange={handlePasswordChange}
              name='Password'
            />
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  if (user === null) {
    return loginForm()
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} cssClass='error' />
      <Notification message={successMessage} cssClass='success' />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>log out</button>
      </p>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleRemove={removeBlog} clickLike={addLike} />
      )}
    </div>
  )
}

export default App