import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueService from "../services/IssueService"; 
import AuthService from "../services/AuthService";

const CreateIssue = () => {
  // Stati del form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("BUG"); 
  const [priority, setPriority] = useState("MEDIUM");
  const [file, setFile] = useState(null);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();

    // Recuperiamo l'utente loggato "vero"
    const currentUser = AuthService.getCurrentUser();
    const realUserId = currentUser ? currentUser.id : 1; // Fallback a 1 se qualcosa va storto

    const formData = new FormData();

    const issueDto = {
        titolo: title,
        descrizione: description,
        tipo: type,       
        priorita: priority,
        autoreId: realUserId // <--- ORA È DINAMICO!
    };

    // 2. IMPACCHETTAMENTO JSON
// CreateIssue.jsx - Riga ~35
    formData.append(
        "issue", 
        new Blob([JSON.stringify(issueDto)], { type: "application/json" }) 
    );
    
    // 3. AGGIUNTA FILE
    if (file) {
      formData.append("file", file); 
    }

    try {
      await IssueService.create(formData);
      alert("Segnalazione inviata con successo!");
      navigate("/"); // Torna alla dashboard
    } catch (error) {
      console.error("Errore creazione issue:", error);
      alert("Errore durante l'invio. Controlla la console.");
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
    container: { maxWidth: '800px', margin: '0 auto' },
    
    formCard: {
        backgroundColor: 'white',
        borderRadius: '6px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        border: '1px solid #e0e0e0',
        padding: '2.5rem'
    },
    headerTitle: {
        margin: '0 0 2rem 0',
        color: '#2c3e50',
        fontFamily: '"Georgia", serif',
        fontSize: '1.8rem',
        borderBottom: '2px solid #f0f0f0',
        paddingBottom: '1rem'
    },
    formGroup: { marginBottom: '1.5rem' },
    
    label: {
        display: 'block',
        marginBottom: '0.5rem',
        fontWeight: '600',
        color: '#2c3e50',
        fontSize: '0.95rem'
    },
    
    input: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        fontSize: '1rem',
        fontFamily: 'inherit',
        outline: 'none',
        transition: 'border-color 0.2s',
        boxSizing: 'border-box' // Importante per non sforare la larghezza
    },
    
    textarea: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        fontSize: '1rem',
        fontFamily: 'inherit',
        minHeight: '120px',
        resize: 'vertical',
        outline: 'none',
        boxSizing: 'border-box'
    },
    
    row: {
        display: 'flex',
        gap: '1.5rem',
        marginBottom: '1.5rem'
    },
    col: { flex: 1 },
    
    select: {
        width: '100%',
        padding: '0.8rem',
        borderRadius: '4px',
        border: '1px solid #ced4da',
        fontSize: '1rem',
        backgroundColor: 'white',
        cursor: 'pointer',
        boxSizing: 'border-box'
    },
    
    fileInputContainer: {
        padding: '1rem',
        border: '1px dashed #ced4da',
        borderRadius: '4px',
        backgroundColor: '#f8f9fa'
    },
    fileHelper: {
        fontSize: '0.85rem',
        color: '#6c757d',
        marginTop: '0.5rem'
    },

    buttonGroup: {
        display: 'flex',
        gap: '1rem',
        marginTop: '2rem',
        paddingTop: '1.5rem',
        borderTop: '1px solid #f0f0f0'
    },
    submitBtn: {
        backgroundColor: '#2c3e50', // Blu Istituzionale
        color: 'white',
        border: 'none',
        padding: '0.8rem 2rem',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s',
        flex: 1
    },
    cancelBtn: {
        backgroundColor: 'white',
        color: '#6c757d',
        border: '1px solid #ced4da',
        padding: '0.8rem 2rem',
        borderRadius: '4px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s'
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        
        <div style={styles.formCard}>
          <h2 style={styles.headerTitle}>Nuova Segnalazione</h2>
          
          <form onSubmit={handleSubmit}>
            
            {/* Titolo */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Titolo</label>
              <input 
                type="text" 
                style={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Es: Errore nel login..."
                required 
              />
            </div>

            {/* Descrizione */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Descrizione</label>
              <textarea 
                style={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descrivi dettagliatamente il problema..."
                required
              ></textarea>
            </div>

            {/* Row per Select Tipo & Priorità */}
            <div style={styles.row}>
              <div style={styles.col}>
                <label style={styles.label}>Tipologia</label>
                <select style={styles.select} value={type} onChange={(e) => setType(e.target.value)}>
                  <option value="BUG">Bug</option>
                  <option value="FEATURE">Nuova Funzionalità</option>
                  <option value="QUESTION">Domanda</option>
                  <option value="DOCUMENTATION">Documentazione</option>
                </select>
              </div>

              <div style={styles.col}>
                <label style={styles.label}>Priorità</label>
                <select style={styles.select} value={priority} onChange={(e) => setPriority(e.target.value)}>
                  <option value="LOW">Bassa</option>
                  <option value="MEDIUM">Media</option>
                  <option value="HIGH">Alta</option>
                  <option value="CRITICAL">Critica</option>
                </select>
              </div>
            </div>

            {/* Upload File */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Allegato (Opzionale)</label>
              <div style={styles.fileInputContainer}>
                <input 
                  type="file" 
                  accept="image/*,.pdf,.txt" 
                  onChange={handleFileChange} 
                  style={{width: '100%'}}
                />
                <div style={styles.fileHelper}>Formati accettati: Immagini, PDF, TXT.</div>
              </div>
            </div>

            {/* Bottoni Azione */}
            <div style={styles.buttonGroup}>
                {/* Bottone Annulla prima, per usabilità (meno accidentale invio) o dopo a seconda preferenza */}
                <button 
                    type="button" 
                    style={styles.cancelBtn} 
                    onClick={() => navigate('/')}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                    onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                >
                    Annulla
                </button>

                <button 
                    type="submit" 
                    style={styles.submitBtn}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#1a252f'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#2c3e50'}
                >
                    Crea Segnalazione
                </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIssue;