import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../index.css'

const Blog = ({ blog, handleRemove, clickLike }) => {
  const { title, author, url, likes, user } = blog
  const [showAll, setShowAll] = useState(false)

  const buttonLabel = showAll ? 'hide' : 'view'

  const currentUser = JSON.parse(window.localStorage.getItem('loggedInBloglistUser')) || null
  const showRemoveButton = (!user || !currentUser)
    ? false
    : (user.username === currentUser.username)

  const toggleShowAll = () => {
    setShowAll(!showAll)
  }

  const addLike = () => {
    clickLike(blog)
  }

  const removeBlog = () => {
    handleRemove(blog)
  }

  if (showAll) {
    return (
      <div className='blogStyle'>
        <div>
          {title} {author}
          <button onClick={toggleShowAll}>{buttonLabel}</button>
        </div>
        <div>
          {url}
        </div>
        <div>
          likes <span className='blogLikes'>{likes}</span>
          <button onClick={addLike}>like</button>
        </div>
        <div>
          {user.name}
        </div>
        {
          showRemoveButton &&
          <button onClick={removeBlog}>remove</button>
        }
      </div>
    )
  }

  return (
    <div className='blogStyle'>
      {title} {author}
      <button onClick={toggleShowAll}>{buttonLabel}</button>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleRemove: PropTypes.func.isRequired,
  clickLike: PropTypes.func.isRequired
}

export default Blog
