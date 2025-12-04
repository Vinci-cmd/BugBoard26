import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueService from '../services/IssueService';
import IssueCard from '../components/IssueCard';

const Dashboard = () => {
    const navigate = useNavigate();
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

    // --- STILI AGGIORNATI PER MATCHARE IL DESIGN ---
    const styles = {
        pageWrapper: {
            backgroundColor: '#f8f9fa', // Grigio molto chiaro, moderno
            minHeight: '100vh',
            padding: '2rem 1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        container: { 
            maxWidth: '1100px', // Leggermente più largo
            margin: '0 auto',
        },
        headerRow: {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
            paddingBottom: '0', // Rimosso il bordo inferiore, ora è più pulito
        },
        pageTitle: {
            margin: 0,
            fontSize: '2rem',
            color: '#1a202c', // Quasi nero
            fontWeight: '700',
            letterSpacing: '-0.025em'
        },
        buttonGroup: {
            display: 'flex',
            gap: '12px'
        },
        // Bottone Verde (Create)
        createButton: {
            backgroundColor: '#48bb78', // Un verde più "soft" e moderno
            color: 'white',
            border: 'none',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'background-color 0.2s'
        },
        // Bottone Blu (Refresh - Aggiornato per essere blu pieno come nell'immagine)
        refreshButton: {
            backgroundColor: '#4299e1', // Blu solido
            border: 'none',
            color: 'white',
            padding: '0.6rem 1.2rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.95rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'background-color 0.2s'
        },
        // Card bianca per i filtri
        filterBar: { 
            display: 'flex', 
            gap: '1.5rem', 
            marginBottom: '2rem', 
            padding: '1.5rem', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', // Angoli più arrotondati
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // Ombra moderna
            border: '1px solid #e2e8f0',
            flexWrap: 'wrap',
            alignItems: 'flex-end'
        },
        selectGroup: { 
            flex: 1, 
            minWidth: '200px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
        },
        label: { 
            fontSize: '0.75rem', 
            fontWeight: '700', 
            color: '#718096', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        select: { 
            width: '100%', 
            padding: '0.6rem', 
            borderRadius: '6px', 
            border: '1px solid #cbd5e0', 
            backgroundColor: '#fff', 
            fontSize: '0.95rem', 
            color: '#2d3748', 
            outline: 'none',
            transition: 'border-color 0.2s'
        },
        // Stati di caricamento
        loadingState: { textAlign: 'center', padding: '4rem', color: '#718096' },
        emptyState: { 
            textAlign: 'center', 
            padding: '4rem 2rem', 
            backgroundColor: 'white', 
            borderRadius: '12px', 
            border: '1px dashed #cbd5e0', 
            color: '#718096' 
        },
        errorMsg: { 
            padding: '1rem', 
            backgroundColor: '#fff5f5', 
            color: '#c53030', 
            border: '1px solid #feb2b2', 
            borderRadius: '6px', 
            marginBottom: '1rem' 
        },
        listContainer: {
            display: 'flex', 
            flexDirection: 'column', 
            gap: '1rem' // Spazio tra le card aumentato leggermente
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                {/* Intestazione Pagina */}
                <div style={styles.headerRow}>
                    <h1 style={styles.pageTitle}>Dashboard Issue</h1>
                    
                    <div style={styles.buttonGroup}>
                        <button 
                            onClick={() => navigate('/create')}
                            style={styles.createButton}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#38a169'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#48bb78'}
                        >
                            <span>+</span> Nuova Issue
                        </button>

                        <button 
                            onClick={fetchIssues} 
                            style={styles.refreshButton}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#3182ce'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#4299e1'}
                        >
                            <span>↻</span> Aggiorna
                        </button>
                    </div>
                </div>

                {/* BARRA DEI FILTRI */}
                <div style={styles.filterBar}>
                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Stato</label>
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
                            <option value="LOW">Low</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High</option>
                            <option value="CRITICAL">Critical</option>
                        </select>
                    </div>

                    <div style={styles.selectGroup}>
                        <label style={styles.label}>Tipologia</label>
                        <select name="tipo" style={styles.select} onChange={handleFilterChange}>
                            <option value="">Tutti i Tipi</option>
                            <option value="BUG">Bug</option>
                            <option value="FEATURE">Feature</option>
                            <option value="QUESTION">Question</option>
                            <option value="DOCUMENTATION">Documentation</option>
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
                    <div style={styles.listContainer}>
                        {issues.map(issue => (
                            <IssueCard key={issue.id} issue={issue} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;