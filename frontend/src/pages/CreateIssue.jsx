import { useState } from "react";
import { useNavigate } from "react-router-dom";
// ORA USIAMO I VERI SERVIZI CHE PARLANO COL BACKEND
import IssueService from "../services/IssueService"; 
import AuthService from "../services/AuthService";

const CreateIssue = () => {
    // Stati del form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("BUG"); 
    const [priority, setPriority] = useState("MEDIUM");
    const [file, setFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Recuperiamo l'utente loggato "vero" dal localStorage
        const currentUser = AuthService.getCurrentUser();
        
        // Controllo di sicurezza: se non c'è l'utente, non possiamo creare la issue
        if (!currentUser || !currentUser.id) {
            alert("Errore: Sessione scaduta o utente non trovato. Effettua il login.");
            navigate('/login');
            return;
        }

        const formData = new FormData();

        const issueDto = {
            titolo: title,
            descrizione: description,
            tipo: type,       
            priorita: priority,
            autoreId: currentUser.id // Usiamo l'ID vero dell'utente loggato
        };

        // IMPACCHETTAMENTO JSON
        // Il backend si aspetta una parte chiamata "issue" che è un JSON
        formData.append(
            "issue", 
            new Blob([JSON.stringify(issueDto)], { type: "application/json" }) 
        );
        
        // AGGIUNTA FILE (se presente)
        if (file) {
            formData.append("file", file); 
        }

        try {
            // Chiamata REALE al backend
            await IssueService.create(formData);
            
            alert("Segnalazione inviata con successo! 🚀");
            navigate("/dashboard"); 
        } catch (error) {
            console.error("Errore creazione issue:", error);
            alert("Errore durante l'invio. Controlla che il backend sia attivo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- STILI MODERNI (MATCHING DASHBOARD) ---
    const styles = {
        pageWrapper: {
            backgroundColor: '#f8f9fa', 
            minHeight: '100vh',
            padding: '3rem 1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        container: { 
            maxWidth: '750px', 
            margin: '0 auto' 
        },
        
        formCard: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e2e8f0',
            padding: '2.5rem',
            overflow: 'hidden'
        },
        headerTitle: {
            margin: '0 0 0.5rem 0',
            color: '#1a202c',
            fontSize: '1.75rem',
            fontWeight: '800',
            letterSpacing: '-0.025em'
        },
        headerSubtitle: {
            margin: '0 0 2rem 0',
            color: '#718096',
            fontSize: '0.95rem'
        },
        
        formGroup: { marginBottom: '1.8rem' },
        
        label: {
            display: 'block',
            marginBottom: '0.6rem',
            fontSize: '0.75rem', 
            fontWeight: '700', 
            color: '#718096', 
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
        },
        
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            fontSize: '1rem',
            color: '#2d3748',
            outline: 'none',
            transition: 'border-color 0.2s, box-shadow 0.2s',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        },
        
        textarea: {
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            fontSize: '1rem',
            color: '#2d3748',
            fontFamily: 'inherit',
            minHeight: '140px',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
            backgroundColor: '#fff'
        },
        
        row: {
            display: 'flex',
            gap: '1.5rem',
            marginBottom: '1.8rem',
            flexWrap: 'wrap'
        },
        col: { flex: 1, minWidth: '200px' },
        
        select: {
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            fontSize: '1rem',
            backgroundColor: 'white',
            color: '#2d3748',
            cursor: 'pointer',
            boxSizing: 'border-box',
            appearance: 'none', 
            backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23CBD5E0%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem top 50%',
            backgroundSize: '0.65rem auto',
        },
        
        fileInputContainer: {
            padding: '1.5rem',
            border: '2px dashed #cbd5e0', 
            borderRadius: '8px',
            backgroundColor: '#f7fafc',
            textAlign: 'center',
            transition: 'border-color 0.2s',
            cursor: 'pointer'
        },
        fileHelper: {
            fontSize: '0.85rem',
            color: '#718096',
            marginTop: '0.5rem'
        },

        buttonGroup: {
            display: 'flex',
            gap: '1rem',
            marginTop: '1rem',
            paddingTop: '2rem',
            borderTop: '1px solid #edf2f7',
            justifyContent: 'flex-end' 
        },
        submitBtn: {
            backgroundColor: '#48bb78', 
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s, transform 0.1s',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
        },
        cancelBtn: {
            backgroundColor: 'transparent',
            color: '#718096',
            border: '1px solid #e2e8f0',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s'
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                
                <div style={styles.formCard}>
                    <h2 style={styles.headerTitle}>Nuova Issue</h2>
                    <p style={styles.headerSubtitle}>Compila i dettagli per segnalare un bug o richiedere una feature.</p>
                    
                    <form onSubmit={handleSubmit}>
                        
                        {/* Titolo */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Titolo</label>
                            <input 
                                type="text" 
                                style={styles.input}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Es: Login fallito da mobile..."
                                required 
                                onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                            />
                        </div>

                        {/* Descrizione */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Descrizione</label>
                            <textarea 
                                style={styles.textarea}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Descrivi i passaggi per riprodurre il problema o i dettagli della richiesta..."
                                required
                                onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                            ></textarea>
                        </div>

                        {/* Row per Select Tipo & Priorità */}
                        <div style={styles.row}>
                            <div style={styles.col}>
                                <label style={styles.label}>Tipologia</label>
                                <select 
                                    style={styles.select} 
                                    value={type} 
                                    onChange={(e) => setType(e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                                    onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                                >
                                    <option value="BUG">🐛 Bug</option>
                                    <option value="FEATURE">✨ Feature</option>
                                    <option value="QUESTION">❓ Question</option>
                                    <option value="DOCUMENTATION">📄 Documentation</option>
                                </select>
                            </div>

                            <div style={styles.col}>
                                <label style={styles.label}>Priorità</label>
                                <select 
                                    style={styles.select} 
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value)}
                                    onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                                    onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                                >
                                    <option value="LOW">Low</option>
                                    <option value="MEDIUM">Medium</option>
                                    <option value="HIGH">High</option>
                                    <option value="CRITICAL">Critical</option>
                                </select>
                            </div>
                        </div>

                        {/* Upload File */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Allegato (Opzionale)</label>
                            <div 
                                style={styles.fileInputContainer}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = '#4299e1';
                                    e.currentTarget.style.backgroundColor = '#ebf8ff';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = '#cbd5e0';
                                    e.currentTarget.style.backgroundColor = '#f7fafc';
                                }}
                            >
                                <input 
                                    type="file" 
                                    accept="image/*,.pdf,.txt" 
                                    onChange={handleFileChange} 
                                    style={{width: '100%', cursor: 'pointer'}} 
                                />
                                <div style={styles.fileHelper}>
                                    {file ? `File selezionato: ${file.name}` : "Trascina un file qui o clicca per caricare (Max 5MB)"}
                                </div>
                            </div>
                        </div>

                        {/* Bottoni Azione */}
                        <div style={styles.buttonGroup}>
                            <button 
                                type="button" 
                                style={styles.cancelBtn} 
                                onClick={() => navigate('/dashboard')} 
                                onMouseOver={(e) => e.target.style.backgroundColor = '#f7fafc'}
                                onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                                Annulla
                            </button>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                style={{
                                    ...styles.submitBtn,
                                    backgroundColor: isSubmitting ? '#9ae6b4' : '#48bb78',
                                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                                }}
                                onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#38a169')}
                                onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#48bb78')}
                            >
                                {isSubmitting ? 'Invio in corso...' : 'Crea Issue'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateIssue;