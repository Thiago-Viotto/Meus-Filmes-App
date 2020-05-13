import axios from 'axios'

const api = axios.create({
   // baseURL: 'http://10.0.3.2:3001/'
  // baseURL: 'http://localhost:3001/'
  baseURL: 'http://10.0.2.2:3001/'
})

export default api