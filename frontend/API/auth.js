import axios from 'axios'
const api = 'http://localhost:3001/auth/login'
export default {login : (data) => axios.post(`${api}`,data)}