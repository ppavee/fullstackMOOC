import React from 'react'
import Bloglist from './Bloglist'
import BlogForm from './BlogForm'
import Togglable from './Togglable'

const Home = () => {
  const blogFormRef = React.createRef()

  return (
    <div>
      <Togglable buttonLabel='create new blog' ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <Bloglist />
    </div>
  )
}

export default Home