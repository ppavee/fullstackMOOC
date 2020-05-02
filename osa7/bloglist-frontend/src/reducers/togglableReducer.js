const togglableReducer = (state = false, action) => {
  switch(action.type) {
  case 'TOGGLE_VISIBILITY':
    return action.data
  default:
    return state
  }
}

export const changeVisibility = (value) => {
  return {
    type: 'TOGGLE_VISIBILITY',
    data: value
  }
}

export default togglableReducer