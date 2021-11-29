import axios from 'axios';

const baseURL = 'https://moovy-mf.herokuapp.com';

export const ApiService = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});
