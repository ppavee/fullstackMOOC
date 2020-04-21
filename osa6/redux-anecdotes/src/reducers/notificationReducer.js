const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

// export const setNotification = (message) => {
//   return {
//     type: 'SET_NOTIFICATION',
//     notification: message
//   }
// }

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: message
    })
    setTimeout(() => dispatch(removeNotification()), time*1000)
  }
}

export default notificationReducer