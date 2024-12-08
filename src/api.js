// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Используем порт 3000 по умолчанию

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
