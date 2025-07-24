import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8082'
});

export default api;


export const baseURL = 'http://localhost:8082';
