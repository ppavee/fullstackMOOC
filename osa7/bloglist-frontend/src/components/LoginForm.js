import React from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import { userLogin } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'
import { TextField, Button, Typography } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    const usernameInput = event.target.Username
    const passwordInput = event.target.Password
    try {
      const username = usernameInput.value
      const password = passwordInput.value
      usernameInput.value = ''
      passwordInput.value = ''
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedInBloglistUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(userLogin(user))
      createNotification(`Welcome ${user.name}`, 'success')
    } catch (exception) {
      createNotification('wrong username or password', 'error')
      usernameInput.value = ''
      passwordInput.value = ''
    }
  }

  const createNotification = (message, type) => {
    dispatch(notificationChange({ message, type }))
  }


  return (
    <div>
      <Typography variant='h2' gutterBottom={true}>log in to application</Typography>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          <TextField label='username'
            type='text'
            name='Username'
            id='login-username'
          />
        </div>
        <div>
          <TextField
            label='password'
            type='password'
            name='Password'
            id='login-password'
          />
        </div>
        <Button
          variant='contained'
          color='primary'
          id='login-button'
          type='submit'
          endIcon={<LockOpenIcon />}>
            Login
        </Button>
      </form>
    </div>
  )
}

export default LoginForm