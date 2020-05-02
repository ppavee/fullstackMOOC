import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <div>
      <Typography variant='h4' gutterBottom={true} >Blogs</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map(blog =>
              <TableRow key={blog.id} hover={true}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>
                  {blog.author}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Bloglist