import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const User = ({ user }) => {
  return (
    <TableRow hover={true}>
      <TableCell>
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </TableCell>
      <TableCell>
        {user.blogs.length}
      </TableCell>
    </TableRow>
  )
}

const Userlist = () => {
  const users = useSelector(state => state.users)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              User
            </TableCell>
            <TableCell>
              <strong>blogs created</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user =>

            <User key={user.id} user={user} />
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Userlist