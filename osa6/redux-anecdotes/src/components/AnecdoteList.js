import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, votes, handleClick }) => {
  const dispatch = useDispatch()
  const handleVote = () => {
    dispatch(voteAnecdote(anecdote.id))

    dispatch(setNotification(`you voted '${anecdote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const filteredAnecdotes = useSelector(({ anecdotes, filter }) => {
    const filteredList = anecdotes.filter(a => {
      return filter === '' 
        || a.content.toLowerCase().includes(filter.toLowerCase())
    })
    return filteredList.sort((a, b) => {
      return a.votes === b.votes
        ? 0
        : -(a.votes - b.votes)
    })
  })


  return (
    <div>
      {filteredAnecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
        />
      )}
    </div>
  )

}

export default AnecdoteList