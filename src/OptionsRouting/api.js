import axios from 'axios';

const api = axios.create({
  baseURL: 'https://accutebanking.thetalisman.co.zw'
});

export default api;


export const baseURL = 'https://accutebanking.thetalisman.co.zw';
