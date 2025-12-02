import { Link } from 'react-router-dom';

const IssueCard = ({ issue }) => {

    // Helper per i colori dei badge (Stile più "pastello/professionale")
    const getStatusStyle = (status) => {
        switch(status) {
            case 'TODO': 
                return { bg: '#fff3cd', text: '#856404', border: '#ffeeba' }; // Giallo accademico
            case 'IN_PROGRESS': 
                return { bg: '#d1ecf1', text: '#0c5460', border: '#bee5eb' }; // Azzurro neutro
            case 'DONE': 
                return { bg: '#d4edda', text: '#155724', border: '#c3e6cb' }; // Verde successo
            default: 
                return { bg: '#e2e3e5', text: '#383d41', border: '#d6d8db' }; // Grigio
        }
    };

    const statusStyle = getStatusStyle(issue.stato);

    // Mappa icone per tipo (Unicode, così non devi installare nulla)
    const getTypeIcon = (type) => {
        switch(type) {
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
            border: '1px solid #e0e0e0',
            borderLeft: `5px solid ${statusStyle.text}`, // Bordo colorato a sinistra
            borderRadius: '4px', // Angoli meno arrotondati, più "seri"
            padding: '1.2rem',
            marginBottom: '1rem',
            textDecoration: 'none',
            color: '#333',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s ease-in-out',
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.8rem',
            borderBottom: '1px solid #f0f0f0',
            paddingBottom: '0.5rem'
        },
        title: {
            margin: 0,
            fontSize: '1.1rem',
            fontWeight: '600',
            color: '#2c3e50' // Blu scuro "istituzionale"
        },
        badge: {
            padding: '0.25rem 0.6rem',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
            border: `1px solid ${statusStyle.border}`
        },
        description: {
            fontSize: '0.95rem',
            color: '#555',
            lineHeight: '1.5',
            margin: '0 0 1rem 0'
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.85rem',
            color: '#777',
            backgroundColor: '#f9f9f9',
            margin: '-1.2rem -1.2rem -1.2rem -1.2rem', // Hack per estendere il footer ai bordi
            padding: '0.8rem 1.2rem',
            marginTop: '1rem',
            borderTop: '1px solid #eee'
        },
        metaItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        }
    };

    return (
        <Link to={`/issue/${issue.id}`} style={styles.card}>
            {/* INTESTAZIONE: Titolo e Stato */}
            <div style={styles.header}>
                <h3 style={styles.title}>
                    <span style={{marginRight: '8px'}}>{getTypeIcon(issue.tipo)}</span>
                    {issue.titolo}
                </h3>
                <span style={styles.badge}>{issue.stato}</span>
            </div>

            {/* CORPO: Descrizione */}
            <p style={styles.description}>
                {issue.descrizione ? issue.descrizione.substring(0, 120) + (issue.descrizione.length > 120 ? '...' : '') : 'Nessuna descrizione disponibile.'}
            </p>

            {/* PIÈ DI PAGINA: Metadati stile "tabella" */}
            <div style={styles.footer}>
                <div style={styles.metaItem}>
                    <span>Tipo:</span>
                    <strong style={{color: '#333'}}>{issue.tipo}</strong>
                </div>
                <div style={styles.metaItem}>
                    <span>Priorità:</span>
                    <strong style={{
                        color: issue.priorita === 'HIGH' ? '#dc3545' : 'inherit'
                    }}>
                        {issue.priorita}
                    </strong>
                </div>
                <div style={styles.metaItem}>
                    <span>Autore:</span> 
                    <span>{issue.autore?.nomeCompleto || 'N/D'}</span>
                </div>
            </div>
        </Link>
    );
};

export default IssueCard;