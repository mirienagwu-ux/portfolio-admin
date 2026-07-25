import axios from 'axios';

// Base URL for the deployed backend (Assignment 2 REST API)
const BASE_URL = 'https://portfolio-backend-1-dr5t.onrender.com/api';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
