import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';

// Aggiungiamo la prop "onDelete"
const IssueCard = ({ issue, onDelete }) => {
    const currentUser = AuthService.getCurrentUser();
    const isAdmin = currentUser?.ruolo === 'ADMIN';

// Definiamo il "Tema" della card in base al Tipo
    const getThemeColor = (type) => {
        switch (type) {
            case 'BUG':
                // Rosso (Stile HIGH)
                return { border: '#fc8181', bg: '#fff5f5', text: '#c53030' }; 
            case 'FEATURE':
                // Verde (Stile LOW)
                return { border: '#68d391', bg: '#f0fff4', text: '#2f855a' }; 
            case 'QUESTION':
                // Blu (Stile MEDIUM)
                return { border: '#63b3ed', bg: '#ebf8ff', text: '#2b6cb0' }; 
            case 'DOCUMENTATION':
                // Arancione (Nuovo stile)
                return { border: '#f6ad55', bg: '#fffaf0', text: '#c05621' }; 
            default:
                // Grigio (Default)
                return { border: '#cbd5e0', bg: '#edf2f7', text: '#4a5568' }; 
        }
    };

    const theme = getThemeColor(issue.tipo);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'TODO': return { bg: '#feebc8', text: '#744210' };
            case 'IN_PROGRESS': return { bg: '#bee3f8', text: '#2c5282' };
            case 'DONE': return { bg: '#c6f6d5', text: '#276749' };
            default: return { bg: '#e2e8f0', text: '#4a5568' };
        }
    };

    const statusStyle = getStatusStyle(issue.stato);

    const getTypeIcon = (type) => {
        switch (type) {
            case 'BUG': return '🐛';
            case 'FEATURE': return '✨';
            case 'QUESTION': return '❓';
            default: return '📄';
        }
    };

    const styles = {
        card: {
            display: 'block',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            border: '1px solid #e2e8f0',
            borderLeft: `5px solid ${theme.border}`,
            marginBottom: '1.2rem',
            textDecoration: 'none',
            color: 'inherit',
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            overflow: 'hidden',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            position: 'relative' // Necessario per posizionare elementi assoluti se volessimo
        },
        contentPadding: { padding: '1.2rem 1.5rem' },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.8rem',
        },
        titleRow: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: 1
        },
        title: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2d3748',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        statusBadge: {
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
            padding: '0.25rem 0.75rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '700',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
        },
        description: {
            fontSize: '0.95rem',
            color: '#718096',
            lineHeight: '1.6',
            margin: 0,
            minHeight: '20px'
        },
        // Footer grigio chiaro
        footer: {
            backgroundColor: '#f7fafc',
            borderTop: '1px solid #edf2f7',
            padding: '0.8rem 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#718096'
        },
        metaGroup: { display: 'flex', alignItems: 'center', gap: '6px' },
        metaLabel: { fontWeight: '500' },
        colorBadge: {
            backgroundColor: theme.bg,
            color: theme.text,
            border: `1px solid ${theme.border}`, // <--- AGGIUNTO IL BORDICINO QUI
            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '700',
            fontSize: '0.75rem',
            textTransform: 'uppercase'
        },
priorityBadge: {
            // Sfondo: Viola (Critical) -> Rosso (High) -> Blu (Medium) -> Verde (Low) -> Grigio (Default)
            backgroundColor: issue.priorita === 'CRITICAL' ? '#e9d8fd' : 
                             issue.priorita === 'HIGH' ? '#fff5f5' : 
                             issue.priorita === 'MEDIUM' ? '#ebf8ff' : 
                             issue.priorita === 'LOW' ? '#f0fff4' : '#edf2f7',
            
            // Testo: Viola scuro -> Rosso scuro -> Blu scuro -> Verde scuro -> Grigio scuro
            color: issue.priorita === 'CRITICAL' ? '#44337a' : 
                   issue.priorita === 'HIGH' ? '#c53030' : 
                   issue.priorita === 'MEDIUM' ? '#2b6cb0' : 
                   issue.priorita === 'LOW' ? '#2f855a' : '#4a5568',
            
            // Bordo coordinato
            border: `1px solid ${
                issue.priorita === 'CRITICAL' ? '#b794f4' : 
                issue.priorita === 'HIGH' ? '#fc8181' : 
                issue.priorita === 'MEDIUM' ? '#63b3ed' : 
                issue.priorita === 'LOW' ? '#68d391' : '#cbd5e0'
            }`,

            padding: '2px 8px',
            borderRadius: '4px',
            fontWeight: '700',
            fontSize: '0.75rem',
            textTransform: 'uppercase'
        },
        // STILE BOTTONE ELIMINA
        deleteBtn: {
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
            padding: '4px 8px',
            borderRadius: '4px',
            marginLeft: '10px',
            color: '#e53e3e',
            display: 'flex',
            alignItems: 'center',
            transition: 'background 0.2s'
        }
    };

    return (
        <Link 
            to={`/issue/${issue.id}`} 
            style={styles.card}
            onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
            }}
            onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.02)';
            }}
        >
            <div style={styles.contentPadding}>
                <div style={styles.header}>
                    <div style={styles.titleRow}>
                        {/* Icona e Titolo */}
                        <div style={styles.title}>
                            <span>{getTypeIcon(issue.tipo)}</span>
                            {issue.titolo}
                        </div>
                    </div>

                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <span style={styles.statusBadge}>{issue.stato}</span>
                        
                        {/* CESTINO - VISIBILE SOLO AGLI ADMIN */}
                        {isAdmin && (
                            <button
                                style={styles.deleteBtn}
                                onClick={(e) => {
                                    e.preventDefault(); // Impedisce di aprire il link (IssueDetail)
                                    e.stopPropagation(); // Ferma la propagazione
                                    onDelete(issue.id); // Chiama la funzione passata dal padre
                                }}
                                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                title="Elimina Issue"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                </div>

                <p style={styles.description}>
                    {issue.descrizione 
                        ? (issue.descrizione.length > 100 ? issue.descrizione.substring(0, 100) + '...' : issue.descrizione) 
                        : 'Nessuna descrizione.'}
                </p>
            </div>

            <div style={styles.footer}>
                <div style={styles.metaGroup}>
                    <span style={styles.metaLabel}>Tipo:</span>
                    <span style={styles.colorBadge}>{issue.tipo}</span>
                </div>
                <div style={styles.metaGroup}>
                    <span style={styles.metaLabel}>Priorità:</span>
                    <span style={styles.priorityBadge}>{issue.priorita}</span>
                </div>
                <div style={styles.metaGroup}>
                    <span style={styles.metaLabel}>Autore:</span> 
                    <span>{issue.autore?.nomeCompleto || 'N/D'}</span>
                </div>
            </div>
        </Link>
    );
};

export default IssueCard;