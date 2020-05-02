let timeoutId

const notificationReducer = (state = {}, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data
  case 'REMOVE_NOTIFICATION':
    return {}
  default:
    return state
  }
}

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export const notificationChange = (notification) => {
  if(timeoutId) {
    clearTimeout(timeoutId)
  }
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: notification
    })
    timeoutId = setTimeout(() => dispatch(removeNotification()), 5000)
  }
}

export default notificationReducer