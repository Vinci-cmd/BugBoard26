import api from '../api/axiosConfig';

const AuthService = {
    login: async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            
            // MODIFICA CRITICA:
            // Il backend restituisce l'utente (response.data) ma non un campo 'token'.
            // Se riceviamo dati (cioè l'utente), consideriamo il login valido.
            if (response.data && response.data.id) {
                // Creiamo un "fake token" usando l'ID dell'utente per soddisfare la PrivateRoute
                // In futuro qui salveremo il vero JWT
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
    }
};

export default AuthService;