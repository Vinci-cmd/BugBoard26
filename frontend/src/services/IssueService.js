import api from '../api/axiosConfig';

const IssueService = {
    // Metodo esclusivo per la Dashboard (Studente A)
    getAll: async (filters = {}) => {
        // Costruisce la query string (es. ?stato=TODO&priorita=HIGH)
        const params = new URLSearchParams();
        
        // Aggiunge i parametri solo se sono valorizzati
        if (filters.stato) params.append('stato', filters.stato);
        if (filters.priorita) params.append('priorita', filters.priorita);
        if (filters.tipo) params.append('tipo', filters.tipo);

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
        // Ora che axiosConfig è pulito, basta passare formData.
        // Axios rileverà l'oggetto FormData e imposterà automaticamente:
        // Content-Type: multipart/form-data; boundary=----WebKitFormBoundary...
        const response = await api.post('/issues', formData);
        return response.data;
    },
    
// VERSIONE CORRETTA (Allineata al tuo Backend Java):
    addComment: async (issueId, text) => {
        const response = await api.post(`/issues/${issueId}/comments`, { 
            testo: text 
        });
        return response.data;
    }
};

export default IssueService;