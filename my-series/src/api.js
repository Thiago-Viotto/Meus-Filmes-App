import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

export const loadGenres = () => api.get('genres')
export const saveSeries = (newSeries) => api.post('series',newSeries)
export const loadGenresbyGenrew = (genre) => api.get('series?genre='+genre)

// Interface com todas as apis
const apis = {
    loadGenres: loadGenres,
    saveSeries: saveSeries,
    loadGenresbyGenrew: loadGenresbyGenrew
}

export default apis