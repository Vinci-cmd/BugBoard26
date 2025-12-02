import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    // RIMOSSO: headers: { 'Content-Type': 'application/json' }
    // Lasciamo che Axios decida il Content-Type in base ai dati che inviamo
});

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