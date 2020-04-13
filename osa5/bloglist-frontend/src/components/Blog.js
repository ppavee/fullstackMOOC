import React, { useState } from 'react'

const Blog = ({ blog, clickLike }) => {
  const { title, author, url, likes } = blog
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const buttonLabel = showAll ? 'hide' : 'view'

  const toggleShowAll = () => {
    setShowAll(!showAll)
    
  }

  const addLike = () => {
    clickLike(blog)
    console.log(blog.user.name)
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
            {blog.user.name}
          </div>
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
