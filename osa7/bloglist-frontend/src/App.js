import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Users from './components/Users'
import UserInfo from './components/UserInfo'
import Blog from './components/Blog'

import { useDispatch, useSelector } from 'react-redux'
import { notificationChange } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { userLogout, userLogin } from './reducers/userReducer'
import { Switch, Route, Link, useRouteMatch, useHistory } from 'react-router-dom'
import { initializeUsers } from './reducers/usersReducer'

import './index.css'
import Container from '@material-ui/core/Container'
import { Toolbar, Button, AppBar, Typography } from '@material-ui/core'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const blogs = useSelector(state => state.blogs)

  const matchUser = useRouteMatch('/users/:id')
  const userForRouting = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogForRouting = matchBlog
    ? blogs.find(b => b.id === matchBlog.params.id)
    : null

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      dispatch(userLogin(loggedUser))
      blogService.setToken(loggedUser.token)
    }
  }, [dispatch])

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInBloglistUser')
    dispatch(userLogout())
    createNotification('Logout successful', 'success')
    history.push('/')
  }

  const createNotification = (message, type) => {
    dispatch(notificationChange({ message, type }))
  }

  if (user === null) {
    return (
      <Container>
        <LoginForm />
      </Container>
    )
  }

  return (
    <Container>
      <AppBar position='static'>
        <Toolbar>
          <Button color='inherit' component={Link} to='/'>
            blogs
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            users
          </Button>
          <div className='navbar-login'>
            <em>{user.name} logged in</em>
            <Button color='inherit' onClick={handleLogout}>log out</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Typography variant='h2' gutterBottom={true}>blog app</Typography>
      <Notification />
      <Switch>
        <Route path='/users/:id'>
          <UserInfo user={userForRouting} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog blog={blogForRouting} />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Container>
  )
}

export default App