import axios from 'axios';

const api = axios.create({
  baseURL: 'https://distinguished-happiness-production.up.railway.app'
});

export default api;
