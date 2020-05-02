import React from 'react'
import Userlist from './Userlist'
import { Typography } from '@material-ui/core'

const Users = () => {
  return (
    <div>
      <Typography variant='h4' gutterBottom >Users</Typography>
      <Userlist />
    </div>
  )
}

export default Users