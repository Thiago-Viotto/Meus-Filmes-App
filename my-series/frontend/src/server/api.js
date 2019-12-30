import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3001/'
})

export const loadGenres = () => api.get('genres')
export const saveFilms = (newFilms) => api.post('films', newFilms)
export const loadGenresbyGenrew = (genre) => api.get('films?genre=' + genre)
export const deleteFilms = (id) => api.delete('films/' + id)
export const loadFilmsbyId = (id) => api.get('films/' + id)
export const updateFilms = (films) => api.put('films/' + films.id, films)
export const loadFilmsbyFavorite = () => api.get('films?genre=favorite')

// Interface com todas as apis
const apis = {
    loadGenres: loadGenres,
    saveFilms: saveFilms,
    loadGenresbyGenrew: loadGenresbyGenrew,
    deleteFilms: deleteFilms,
    loadFilmsbyId: loadFilmsbyId,
    updateFilms: updateFilms,
    loadFilmsbyFavorite: loadFilmsbyFavorite
}

export default apis