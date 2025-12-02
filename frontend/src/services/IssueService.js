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
    }
};

export default IssueService;