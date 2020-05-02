const loginReducer = (state = null, action) => {
  switch(action.type) {
  case 'USER_LOG_IN':
    return action.data
  case 'USER_LOG_OUT':
    return null
  default:
    return state
  }
}

export const userLogin = (user) => {
  return {
    type: 'USER_LOG_IN',
    data: user
  }
}

export const userLogout = () => {
  return {
    type: 'USER_LOG_OUT'
  }
}

export default loginReducer