const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'CHANGE_FILTER':
      return action.filter
    default:
      return state
  }
}

export const toggleFilter = (filter) => {
  return {
    type: 'CHANGE_FILTER',
    filter,
  }
}

export default filterReducer