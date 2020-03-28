import axios from 'axios'
const baseUrl = 'http://api.weatherstack.com/'
const api_key = process.env.REACT_APP_API_KEY

const getCurrentByCapital = (capital) => {
    return axios.get(`${baseUrl}/current?access_key=${api_key}&query=${capital}`)
}

export default { getCurrentByCapital }