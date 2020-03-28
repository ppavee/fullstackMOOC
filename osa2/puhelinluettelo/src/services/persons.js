import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const put = updatedObject => {
    return axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject)
}

const remove = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, remove, put}
