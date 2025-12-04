import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import IssueService from '../services/IssueService';
import AuthService from '../services/AuthService';
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

    // --- STATI PER LA MODALE DI CANCELLAZIONE ---
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [issueToDelete, setIssueToDelete] = useState(null);

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

    // --- LOGICA CANCELLAZIONE ---
    
    // 1. Chiamata dalla Card: Apre la modale
    const handleDeleteClick = (issueId) => {
        setIssueToDelete(issueId);
        setShowDeleteModal(true);
    };

    // 2. Annulla
    const cancelDelete = () => {
        setShowDeleteModal(false);
        setIssueToDelete(null);
    };

    // 3. Conferma ed esegue
    const confirmDelete = async () => {
        if (!issueToDelete) return;
        
        const currentUser = AuthService.getCurrentUser();
        // Doppio controllo sicurezza client-side
        if (!currentUser || currentUser.ruolo !== 'ADMIN') {
            alert("Non autorizzato.");
            return;
        }

        try {
            await IssueService.delete(issueToDelete, currentUser.id);
            // Rimuoviamo l'issue dalla lista locale per evitare reload inutile
            setIssues(prev => prev.filter(i => i.id !== issueToDelete));
            setShowDeleteModal(false);
            setIssueToDelete(null);
        } catch (err) {
            console.error("Errore cancellazione:", err);
            alert("Errore durante l'eliminazione dell'issue.");
        }
    };

    // --- STILI ---
    const styles = {
        pageWrapper: {
            backgroundColor: '#f8f9fa',
            minHeight: '100vh',
            padding: '2rem 1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
        },
        container: { 
            maxWidth: '1100px',
            margin: '0 auto',
        },
        headerRow: {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '2rem',
        },
        pageTitle: {
            margin: 0,
            fontSize: '2rem',
            color: '#1a202c',
            fontWeight: '700',
            letterSpacing: '-0.025em'
        },
        buttonGroup: { display: 'flex', gap: '12px' },
        createButton: {
            backgroundColor: '#48bb78',
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
        refreshButton: {
            backgroundColor: '#4299e1',
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
        filterBar: { 
            display: 'flex', 
            gap: '1.5rem', 
            marginBottom: '2rem', 
            padding: '1.5rem', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
            gap: '1rem'
        },

        // --- MODALE ---
        modalOverlay: {
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)'
        },
        modalContent: {
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '12px',
            width: '90%',
            maxWidth: '400px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
        },
        modalTitle: {
            marginTop: 0,
            color: '#1a202c',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        modalText: {
            color: '#718096',
            marginBottom: '1.5rem',
            lineHeight: '1.5'
        },
        modalActions: {
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem'
        },
        btnCancel: {
            padding: '0.6rem 1.2rem',
            backgroundColor: '#edf2f7',
            color: '#4a5568',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer'
        },
        btnConfirm: {
            padding: '0.6rem 1.2rem',
            backgroundColor: '#e53e3e',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(229, 62, 62, 0.2)'
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
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

                {/* FILTRI */}
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

                {/* LISTA */}
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
                            <IssueCard 
                                key={issue.id} 
                                issue={issue} 
                                onDelete={handleDeleteClick} // Passiamo la funzione al figlio
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* MODALE DI CONFERMA CANCELLAZIONE */}
            {showDeleteModal && (
                <div style={styles.modalOverlay}>
                    <div style={styles.modalContent}>
                        <h3 style={styles.modalTitle}>Elimina Issue</h3>
                        <p style={styles.modalText}>
                            Sei sicuro di voler eliminare questa segnalazione?<br/>
                            Verranno eliminati anche tutti i commenti associati.
                        </p>
                        <div style={styles.modalActions}>
                            <button 
                                style={styles.btnCancel} 
                                onClick={cancelDelete}
                            >
                                Annulla
                            </button>
                            <button 
                                style={styles.btnConfirm} 
                                onClick={confirmDelete}
                            >
                                Elimina definitivamente
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;