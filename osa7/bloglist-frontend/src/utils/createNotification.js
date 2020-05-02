import { useDispatch } from 'react-redux'
import { notificationChange } from '../reducers/notificationReducer'

const createNotification = (message, type) => {
  const dispatch = useDispatch()
  return dispatch(notificationChange({ message, type }))
}

export default createNotification