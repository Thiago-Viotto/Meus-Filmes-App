import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

export const loadGenres = () => api.get('genres')
export const saveSeries = (newSeries) => api.post('series',newSeries)
export const loadGenresbyGenrew = (genre) => api.get('series?genre='+genre)
export const deleteSeries = (id) => api.delete('series/'+id)
export const loadSeriesbyId = (id) => api.get('series/'+id)
export const updateSeries = (series) => api.put('series/'+series.id,series)

// Interface com todas as apis
const apis = {
    loadGenres: loadGenres,
    saveSeries: saveSeries,
    loadGenresbyGenrew: loadGenresbyGenrew,
    deleteSeries: deleteSeries,
    loadSeriesbyId: loadSeriesbyId,
    updateSeries:updateSeries
}

export default apis