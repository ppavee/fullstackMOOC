import anecdotesService from '../services/anecdotes'
import anecdotes from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

//const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE_ANECDOTE':
      const votedAnecdote = action.data
      return state.map(anecdote => anecdote.id !== votedAnecdote.id 
        ? anecdote 
        : votedAnecdote)
    case 'ADD_ANECDOTE':
     // const newAnecdote = asObject(action.data)
      return [ ...state, action.data ]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const votedAnecdote = await anecdotesService.updateVotes(anecdote)
    dispatch({
      type: 'VOTE_ANECDOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default anecdoteReducer