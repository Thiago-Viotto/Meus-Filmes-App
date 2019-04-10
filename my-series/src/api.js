import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

// Interface com todas as apis
const apis = {
    loadGenres: () => api.get('genres')
}

export default apis