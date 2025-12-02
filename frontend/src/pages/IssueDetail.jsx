import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IssueService from "../services/IssueService";

const IssueDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchIssue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchIssue = async () => {
    try {
      const data = await IssueService.getById(id);
      setIssue(data);
    } catch (err) {
      console.error("Errore recupero issue:", err);
      setError("Impossibile caricare la segnalazione.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await IssueService.addComment(id, newComment);
      await fetchIssue(); // Ricarica per mostrare il nuovo commento
      setNewComment(""); 
    } catch (err) {
      alert("Errore nell'invio del commento");
    }
  };

  // --- STILI UNIVERSITARI/ENTERPRISE ---
  const styles = {
    pageWrapper: {
        backgroundColor: '#f4f6f9',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem 1rem',
        fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
    },
    container: { maxWidth: '900px', margin: '0 auto' },
    
    // Bottone Indietro
    backButton: {
        background: 'none',
        border: 'none',
        color: '#6c757d',
        fontSize: '0.95rem',
        cursor: 'pointer',
        marginBottom: '1rem',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontWeight: '500'
    },

    // Card Principale
    mainCard: {
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #e0e0e0',
        marginBottom: '2rem',
        overflow: 'hidden'
    },
    header: {
        padding: '1.5rem 2rem',
        borderBottom: '1px solid #eee',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        margin: 0,
        color: '#2c3e50',
        fontFamily: '"Georgia", serif',
        fontSize: '1.8rem'
    },
    // Badge Priorità dinamico
    priorityBadge: (prio) => {
        const colors = {
            CRITICAL: { bg: '#dc3545', text: 'white' },
            HIGH: { bg: '#ffc107', text: '#212529' }, // Giallo
            MEDIUM: { bg: '#17a2b8', text: 'white' }, // Azzurro
            LOW: { bg: '#6c757d', text: 'white' }     // Grigio
        };
        const style = colors[prio] || colors.LOW;
        return {
            backgroundColor: style.bg,
            color: style.text,
            padding: '0.4rem 0.8rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            textTransform: 'uppercase'
        };
    },

    body: { padding: '2rem' },
    
    // Riga Metadati (Stato, Tipo, Autore)
    metaRow: {
        display: 'flex',
        gap: '2rem',
        paddingBottom: '1.5rem',
        borderBottom: '1px solid #f0f0f0',
        marginBottom: '1.5rem',
        color: '#555',
        fontSize: '0.95rem'
    },
    metaLabel: { fontWeight: '600', color: '#2c3e50', marginRight: '5px' },

    sectionTitle: {
        fontSize: '1.1rem',
        color: '#2c3e50',
        marginBottom: '0.8rem',
        fontWeight: '600'
    },
    descriptionBox: {
        backgroundColor: '#f8f9fa',
        padding: '1.5rem',
        borderRadius: '4px',
        border: '1px solid #e9ecef',
        lineHeight: '1.6',
        color: '#333'
    },
    
    attachmentBox: {
        marginTop: '1.5rem',
        padding: '1rem',
        border: '1px dashed #2c3e50',
        backgroundColor: '#f0f4f8',
        borderRadius: '4px',
        display: 'inline-block'
    },
    link: { color: '#007bff', textDecoration: 'none', fontWeight: '500' },

    // Sezione Commenti
    commentsSection: { marginTop: '3rem' },
    commentList: { marginBottom: '2rem' },
    commentItem: {
        backgroundColor: 'white',
        border: '1px solid #e0e0e0',
        borderRadius: '6px',
        padding: '1.2rem',
        marginBottom: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
    },
    commentHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.5rem',
        fontSize: '0.9rem',
        borderBottom: '1px solid #f5f5f5',
        paddingBottom: '0.5rem'
    },
    authorName: { fontWeight: 'bold', color: '#2c3e50' },
    timestamp: { color: '#999' },
    commentText: { margin: 0, color: '#444', lineHeight: '1.5' },

    // Form
    formCard: {
        backgroundColor: '#fff',
        padding: '1.5rem',
        borderRadius: '6px',
        border: '1px solid #ddd'
    },
    textArea: {
        width: '100%',
        padding: '1rem',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        minHeight: '100px',
        fontFamily: 'inherit',
        fontSize: '1rem',
        marginBottom: '1rem',
        resize: 'vertical'
    },
    submitBtn: {
        backgroundColor: '#2c3e50',
        color: 'white',
        border: 'none',
        padding: '0.8rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '0.9rem',
        transition: 'background 0.2s'
    }
  };

  if (loading) return <div style={{textAlign:'center', padding:'3rem', color:'#666'}}>Caricamento dati...</div>;
  if (error) return <div style={{textAlign:'center', padding:'3rem', color:'#dc3545'}}>{error}</div>;
  if (!issue) return <div style={{textAlign:'center', padding:'3rem'}}>Issue non trovata.</div>;

  return (
    <div style={styles.pageWrapper}>
        <div style={styles.container}>
            
            {/* Bottone Indietro */}
            <button style={styles.backButton} onClick={() => navigate(-1)}>
                <span>&larr;</span> Torna alla Dashboard
            </button>

            {/* CARD DETTAGLIO */}
            <div style={styles.mainCard}>
                <div style={styles.header}>
                    <h1 style={styles.title}>#{issue.id} - {issue.titolo}</h1>
                    <span style={styles.priorityBadge(issue.priorita)}>
                        {issue.priorita}
                    </span>
                </div>
                
                <div style={styles.body}>
                    {/* Metadati */}
                    <div style={styles.metaRow}>
                        <div><span style={styles.metaLabel}>Stato:</span> {issue.stato}</div>
                        <div><span style={styles.metaLabel}>Tipo:</span> {issue.tipo}</div>
                        {/* CORREZIONE NOME AUTORE */}
                        <div>
                            <span style={styles.metaLabel}>Autore:</span> 
                            {issue.autore ? `${issue.autore.nome} ${issue.autore.cognome}` : "N/D"}
                        </div>
                    </div>

                    {/* Descrizione */}
                    <h3 style={styles.sectionTitle}>Descrizione</h3>
                    <div style={styles.descriptionBox}>
                        {issue.descrizione}
                    </div>

                    {/* Allegato */}
                    {issue.percorsoAllegato && (
                        <div style={styles.attachmentBox}>
                            <strong>📎 Allegato: </strong>
                            <a 
                                href={`http://localhost:8080/uploads/${issue.percorsoAllegato.split('\\').pop().split('/').pop()}`} 
                                target="_blank" 
                                rel="noreferrer"
                                style={styles.link}
                            >
                                Visualizza file
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* SEZIONE COMMENTI */}
            <div style={styles.commentsSection}>
                {/* CORREZIONE: 'comments' invece di 'commenti' */}
                <h3 style={{...styles.sectionTitle, borderBottom: '2px solid #c5a059', display: 'inline-block', paddingBottom:'5px'}}>
                    Commenti ({issue.comments ? issue.comments.length : 0})
                </h3>

                <div style={styles.commentList}>
                    {/* CORREZIONE: 'comments' invece di 'commenti' */}
                    {issue.comments && issue.comments.length > 0 ? (
                        issue.comments.map((c) => (
                            <div key={c.id} style={styles.commentItem}>
                                <div style={styles.commentHeader}>
                                    <span style={styles.authorName}>
                                        {/* CORREZIONE NOME AUTORE NEL COMMENTO */}
                                        {c.autore ? `${c.autore.nome} ${c.autore.cognome}` : "Utente"}
                                    </span>
                                    <span style={styles.timestamp}>
                                        {/* CORREZIONE DATA: 'dataOra' invece di 'dataCreazione' */}
                                        {new Date(c.dataOra).toLocaleString()}
                                    </span>
                                </div>
                                <p style={styles.commentText}>{c.testo}</p>
                            </div>
                        ))
                    ) : (
                        <p style={{color: '#888', fontStyle: 'italic'}}>Nessun commento presente. Scrivi tu il primo!</p>
                    )}
                </div>

                {/* FORM NUOVO COMMENTO */}
                <div style={styles.formCard}>
                    <h4 style={{marginTop: 0, color: '#555'}}>Aggiungi un commento</h4>
                    <form onSubmit={handleAddComment}>
                        <textarea
                            style={styles.textArea}
                            rows="3"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Scrivi qui il tuo messaggio..."
                            required
                        ></textarea>
                        <button 
                            type="submit" 
                            style={styles.submitBtn}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#1a252f'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
                        >
                            Pubblica Commento
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </div>
  );
};

export default IssueDetail;