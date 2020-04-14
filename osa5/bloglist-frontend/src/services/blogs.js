import axios from 'axios'
const baseUrl = '/api/blogs'

let token

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const like = async blog => {
  const newBlog = {
    ...blog, likes: blog.likes + 1, user: blog.user
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, newBlog)
  return response.data
}

const remove = async blogId => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(`${baseUrl}/${blogId}`, config)
  return response.data
}

export default { getAll, create, like, remove, setToken }