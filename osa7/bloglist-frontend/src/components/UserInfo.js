import React from 'react'
import { Typography, List, ListItem } from '@material-ui/core'

const UserInfo = ({ user }) => {
  if(!user) {
    return null
  }
  return (
    <div>
      <Typography variant='h6' gutterBottom>{user.name}</Typography>
      <Typography variant='body2' gutterBottom>added blogs</Typography>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <Typography variant='body2'>{blog.title}</Typography>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default UserInfo