import api from '../api/axiosConfig';

const IssueService = {
    // Per Studente A (Dashboard)
    getAll: async (filters = {}) => {
        // filters sarà tipo { stato: 'OPEN', tipo: 'BUG' }
        const params = new URLSearchParams(filters);
        const response = await api.get(`/issues?${params.toString()}`);
        return response.data;
    },

    // Per Studente B (Dettaglio + Commenti)
    getById: async (id) => {
        const response = await api.get(`/issues/${id}`);
        return response.data;
    },

    // Per Studente B (Creazione con Immagine)
    create: async (formData) => {
        // Nota: qui passiamo formData, non un oggetto JSON semplice
        const response = await api.post('/issues', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Per Studente B (Commenti)
    addComment: async (issueId, text) => {
        const response = await api.post(`/comments?issueId=${issueId}`, { testo: text });
        return response.data;
    }
};

export default IssueService;