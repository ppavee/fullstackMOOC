import React from 'react'
import '../index.css'
import { removeBlog, likeBlog, updateBlogs } from '../reducers/blogReducer'
import { notificationChange } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { useHistory } from 'react-router-dom'
import { Typography, Link, Button, TextField, List, ListItem } from '@material-ui/core'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state => state.user)
  const history = useHistory()

  if (!blog) {
    return null
  }
  const { title, author, url, likes, user, id, comments } = blog
  const showRemoveButton = (!user || !currentUser)
    ? false
    : (user.username === currentUser.username)

  const addLike = async () => {
    try {
      const returnedBlog = await blogService.like(blog)
      returnedBlog.user = blog.user
      dispatch(likeBlog(id))
      createNotification(`${blog.title} liked`, 'success')
    } catch (exception) {
      createNotification('There was an error while trying to like the blog', 'error')
    }
  }

  const remove = async () => {
    const removeBlogConfirmation = window.confirm(`Remove blog ${title} by ${author}`)
    if (removeBlogConfirmation) {
      try {
        await blogService.remove(id)
        dispatch(removeBlog(id))

        createNotification(`${blog.title} removed`, 'success')
        history.push('/')
      } catch (exception) {
        createNotification('There was an error while trying to remove the blog', 'error')
      }
    }
  }
  const createNotification = (message, type) => {
    dispatch(notificationChange({ message, type }))
  }

  const postComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    if (comment) {
      try {
        const newComment = await blogService.addComment(id, comment)
        blog.comments = blog.comments.concat(newComment)
        dispatch(updateBlogs(blog))
        createNotification('Comment added', 'success')
      } catch (exception) {
        createNotification('There was an error while submitting the comment', 'error')
      }
    }
  }

  return (
    <div>
      <Typography variant='h3' gutterBottom>{title} {author}</Typography>
      <Link href={url}>
        {url}
      </Link>
      <div>
        <Typography variant='body1'>
          likes <span className='blogLikes'>{likes}</span>
          <Button variant='contained' size='small' color='primary' onClick={addLike}>like</Button>
        </Typography>
      </div>
      <div>
        <Typography variant='body1'>
        added by {user.name}
        </Typography>
      </div>
      {
        showRemoveButton &&
        <button onClick={remove}>remove</button>
      }
      <Typography variant='h5' gutterBottom>comments</Typography>
      <form onSubmit={postComment}>
        <TextField
          type='text'
          name='comment'
        />
        <Button variant='contained' size='small' color='primary'  type='submit' >add comment</Button>
      </form>
      <List>
        {comments.map(c =>
          <ListItem key={c.id}>
            <Typography variant='body2'>{c.content}</Typography>
          </ListItem>
        )}
      </List>
    </div>
  )
}


export default Blog
