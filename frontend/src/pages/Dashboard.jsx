import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- 1. Importiamo l'hook per navigare
import IssueService from '../services/IssueService';
import IssueCard from '../components/IssueCard';

const Dashboard = () => {
    const navigate = useNavigate(); // <--- 2. Inizializziamo la navigazione
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Stati per i filtri
    const [filters, setFilters] = useState({
        stato: '',
        priorita: '',
        tipo: ''
    });

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const data = await IssueService.getAll(filters);
            setIssues(data);
            setError(null);
        } catch (err) {
            console.error("Errore caricamento:", err);
            setError("Impossibile caricare le issue. Controlla che il backend sia attivo.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIssues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]); 

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const styles = {
        pageWrapper: {
            backgroundColor: '#f4f6f9',
            minHeight: 'calc(100vh - 80px)',
            padding: '2rem 1rem'
        },
        container: { 
            maxWidth: '1000px',
            margin: '0 auto',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        },
        headerRow: {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #e9ecef',
            paddingBottom: '1rem'
        },
        pageTitle: {
            margin: 0,
            fontSize: '2rem',
            color: '#2c3e50',
            fontFamily: '"Georgia", serif',
            fontWeight: 'bold'
        },
        // Gruppo di bottoni in alto a destra
        buttonGroup: {
            display: 'flex',
            gap: '10px'
        },
        // Stile per il bottone "Nuova Issue"
        createButton: {
            backgroundColor: '#28a745', // Verde successo
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        },
        refreshButton: {
            backgroundColor: 'white',
            border: '1px solid #2c3e50',
            color: '#2c3e50',
            padding: '0.6rem 1.2rem',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
        },
        filterBar: { 
            display: 'flex', gap: '1rem', marginBottom: '2rem', padding: '1.5rem', 
            backgroundColor: '#ffffff', borderRadius: '6px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e0e0e0', flexWrap: 'wrap' 
        },
        label: { display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#6c757d', marginBottom: '0.3rem', textTransform: 'uppercase' },
        selectGroup: { flex: 1, minWidth: '200px' },
        select: { width: '100%', padding: '0.7rem', borderRadius: '4px', border: '1px solid #ced4da', backgroundColor: '#f8f9fa', fontSize: '1rem', color: '#495057', outline: 'none', cursor: 'pointer' },
        loadingState: { textAlign: 'center', padding: '3rem', color: '#6c757d', fontSize: '1.2rem' },
        emptyState: { textAlign: 'center', padding: '4rem 2rem', backgroundColor: 'white', borderRadius: '8px', border: '1px dashed #ced4da', color: '#6c757d' },
        errorMsg: { padding: '1rem', backgroundColor: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '4px', marginBottom: '1rem' }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                {/* Intestazione Pagina */}
                <div style={styles.headerRow}>
                    <h1 style={styles.pageTitle}>Dashboard Issue</h1>
                    
                    <div style={styles.buttonGroup}>
                        {/* 3. BOTTONE NUOVA ISSUE AGGIUNTO */}
                        <button 
                            onClick={() => navigate('/create')}
                            style={styles.createButton}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                        >
                            <span>➕</span> Nuova Issue
                        </button>

                        <button 
                            onClick={fetchIssues} 
                            style={styles.refreshButton}
                            onMouseOver={(e) => { e.target.style.backgroundColor = '#2c3e50'; e.target.style.color = 'white'; }}
                            onMouseOut={(e) => { e.target.style.backgroundColor = 'white'; e.target.style.color = '#2c3e50'; }}
                        >
                            <span>🔄</span> Aggiorna
                        </button>
                    </div>
                </div>

                {/* BARRA DEI FILTRI */}
                <div style={styles.filterBar}>
                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Filtra per Stato</label>
                        <select name="stato" style={styles.select} onChange={handleFilterChange}>
                            <option value="">Tutti gli Stati</option>
                            <option value="TODO">To Do</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>

                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Priorità</label>
                        <select name="priorita" style={styles.select} onChange={handleFilterChange}>
                            <option value="">Tutte le Priorità</option>
                            <option value="LOW">Bassa</option>
                            <option value="MEDIUM">Media</option>
                            <option value="HIGH">Alta</option>
                        </select>
                    </div>

                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Tipologia</label>
                        <select name="tipo" style={styles.select} onChange={handleFilterChange}>
                            <option value="">Tutti i Tipi</option>
                            <option value="BUG">Bug</option>
                            <option value="FEATURE">Feature</option>
                            <option value="QUESTION">Question</option>
                        </select>
                    </div>
                </div>

                {/* LISTA O MESSAGGI DI STATO */}
                {loading ? (
                    <div style={styles.loadingState}>
                        <p>Caricamento dati in corso...</p>
                    </div>
                ) : error ? (
                    <div style={styles.errorMsg}>
                        <strong>Errore:</strong> {error}
                    </div>
                ) : issues.length === 0 ? (
                    <div style={styles.emptyState}>
                        <h3>Nessuna issue trovata</h3>
                        <p>Prova a modificare i filtri o crea una nuova issue.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {issues.map(issue => (
                            // IssueCard gestisce già il click per andare al dettaglio
                            <IssueCard key={issue.id} issue={issue} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;