import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'GET_BLOGS':
    return action.data
  case 'CREATE_BLOG':
    return [ ...state, action.data ]
  case 'REMOVE_BLOG':
    return state.filter(blog => blog.id !== action.data)
  case 'LIKE_BLOG': {
    const blog = state.find(b => b.id === action.data)
    const likedBlog = {
      ...blog, likes: blog.likes + 1
    }
    return state.map(b => b.id !== likedBlog.id ? b : likedBlog)
  }
  case 'UPDATE_BLOGS': {
    const updatedBlog = action.data
    return state.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (newBlog) => {
  return async dispatch => {
    dispatch({
      type: 'CREATE_BLOG',
      data: newBlog
    })
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    dispatch({
      type: 'REMOVE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (id) => {
  return async dispatch => {
    dispatch({
      type: 'LIKE_BLOG',
      data: id
    })
  }
}

export const updateBlogs = (updatedBlog) => {
  return async dispatch => {
    dispatch({
      type: 'UPDATE_BLOGS',
      data: updatedBlog
    })
  }
}

export default blogReducer