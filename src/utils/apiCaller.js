import axios from 'axios';

export const apiCaller = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApiCaller = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});
