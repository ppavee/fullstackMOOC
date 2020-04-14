import React, { useState } from 'react'

const Blog = ({ blog, handleRemove, clickLike }) => {
  const { title, author, url, likes, user } = blog
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonLabel = showAll ? 'hide' : 'view'

  const currentUser = JSON.parse(window.localStorage.getItem('loggedInBloglistUser')) || null
  const showRemoveButton = user.username === currentUser.username

  const toggleShowAll = () => {
    setShowAll(!showAll)
    console.log(blog)
  }

  const addLike = () => {
    clickLike(blog)
  }

  const removeBlog = () => {
    handleRemove(blog)
  }

  if (showAll) {
    return (
      <div style={blogStyle}>
        <div>
          {title} {author}
           <button onClick={toggleShowAll}>{buttonLabel}</button>
          </div>
          <div>
            {url}
          </div>
          <div>
            likes {likes}
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
    <div style={blogStyle}>
      {title} {author}
       <button onClick={toggleShowAll}>{buttonLabel}</button>
    </div>
  )
}

export default Blog
