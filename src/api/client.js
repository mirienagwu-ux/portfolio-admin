import axios from 'axios';

// Base URL for the deployed backend (Assignment 2 REST API)
const BASE_URL = 'https://portfolio-backend-1-dr5t.onrender.com/api';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach the auth token (if present) to every outgoing request.
// This satisfies Assignment 4 Part I.7: protected requests must
// include an Authorization header.
client.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
