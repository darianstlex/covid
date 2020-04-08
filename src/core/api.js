import axios from 'axios';

export const xhr = axios.create({
  baseURL: 'https://api.covid19api.com',
});
