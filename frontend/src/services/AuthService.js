import api from '../api/axiosConfig';

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            if (response.data && response.data.id) {
                // Token fittizio basato sull'ID (come da tua implementazione attuale)
                const fakeToken = `basic-token-user-${response.data.id}`;
                localStorage.setItem('token', fakeToken);
                localStorage.setItem('user', JSON.stringify(response.data)); 
            }
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login'; 
    },

    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        if (userStr) return JSON.parse(userStr);
        return null;
    },
    
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // --- NUOVO METODO PER CREARE UTENTI (Admin Only) ---
    createUser: async (userData, adminId) => {
        // Chiama: POST /api/auth/create-user?adminId=1
        const response = await api.post(`/auth/create-user?adminId=${adminId}`, userData);
        return response.data;
    }
};

export default AuthService;