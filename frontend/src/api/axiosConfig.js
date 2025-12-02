import axios from 'axios';

// Crea un'istanza di axios con l'URL base del tuo backend
const api = axios.create({
    baseURL: 'http://localhost:8080/api', // Assicurati che il backend sia sulla porta 8080
    headers: {
        'Content-Type': 'application/json',
    }
});

// Questo "interceptor" aggiunge automaticamente il token a ogni richiesta
// così non devi farlo a mano ogni volta
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;