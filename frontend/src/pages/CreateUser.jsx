import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const CreateUser = () => {
    const navigate = useNavigate();
    
    // Stati del form
    const [formData, setFormData] = useState({
        nomeCompleto: '',
        email: '',
        password: '',
        ruolo: 'USER' // Default
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsSubmitting(true);

        const currentUser = AuthService.getCurrentUser();
        
        // Controllo di sicurezza lato client
        if (!currentUser || currentUser.ruolo !== 'ADMIN') {
            setError("Non hai i permessi per questa operazione.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Chiamata al servizio passando i dati e l'ID dell'admin
            await AuthService.createUser(formData, currentUser.id);
            setSuccess(`Utente ${formData.nomeCompleto} creato con successo!`);
            // Reset form
            setFormData({ nomeCompleto: '', email: '', password: '', ruolo: 'USER' });
        } catch (err) {
            console.error("Errore creazione utente:", err);
            const msg = err.response?.data || "Errore durante la creazione.";
            setError(msg);
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- STILI UNIFORMATI (Design System BugBoard) ---
    const styles = {
        pageWrapper: {
            backgroundColor: '#f8f9fa', // Grigio coerente con Login/Dashboard
            minHeight: '100vh',
            padding: '3rem 1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        container: { 
            maxWidth: '600px', 
            margin: '0 auto' 
        },
        // Bottone "Indietro" stilizzato
        backButton: {
            background: 'none',
            border: 'none',
            color: '#718096',
            fontSize: '0.9rem',
            cursor: 'pointer',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '600',
            padding: '0'
        },
        // Card principale
        card: {
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0',
            padding: '2.5rem'
        },
        header: {
            marginBottom: '2rem',
            textAlign: 'center'
        },
        title: {
            margin: '0 0 0.5rem 0',
            color: '#1a202c',
            fontSize: '1.75rem',
            fontWeight: '800',
            letterSpacing: '-0.025em'
        },
        subtitle: {
            margin: 0,
            color: '#718096',
            fontSize: '0.95rem'
        },
        // Gruppi form
        formGroup: { marginBottom: '1.5rem' },
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
        select: {
            width: '100%',
            padding: '0.75rem 1rem',
            borderRadius: '6px',
            border: '1px solid #cbd5e0',
            fontSize: '1rem',
            color: '#2d3748',
            outline: 'none',
            backgroundColor: 'white',
            boxSizing: 'border-box',
            cursor: 'pointer'
        },
        // Bottone principale (Viola/Blu scuro per distinguersi dalla creazione issue)
        button: {
            width: '100%',
            padding: '0.85rem',
            backgroundColor: '#805ad5', // Viola (tema Admin)
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginTop: '1rem',
            transition: 'background-color 0.2s',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        },
        // Box messaggi
        msgBox: (type) => ({
            padding: '1rem',
            borderRadius: '8px',
            marginBottom: '1.5rem',
            backgroundColor: type === 'error' ? '#fff5f5' : '#f0fff4',
            color: type === 'error' ? '#c53030' : '#2f855a',
            border: `1px solid ${type === 'error' ? '#feb2b2' : '#9ae6b4'}`,
            textAlign: 'center',
            fontSize: '0.95rem',
            fontWeight: '500'
        })
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.container}>
                
                {/* Bottone Indietro */}
                <button 
                    onClick={() => navigate('/dashboard')}
                    style={styles.backButton}
                    onMouseOver={(e) => e.target.style.color = '#2d3748'}
                    onMouseOut={(e) => e.target.style.color = '#718096'}
                >
                    &larr; Torna alla Dashboard
                </button>

                <div style={styles.card}>
                    <div style={styles.header}>
                        <h2 style={styles.title}>Crea Nuovo Utente</h2>
                        <p style={styles.subtitle}>Aggiungi un membro al team (Richiede privilegi Admin)</p>
                    </div>

                    {error && <div style={styles.msgBox('error')}>{error}</div>}
                    {success && <div style={styles.msgBox('success')}>{success}</div>}

                    <form onSubmit={handleSubmit}>
                        
                        {/* Nome Completo */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Nome Completo</label>
                            <input 
                                type="text" 
                                name="nomeCompleto" 
                                value={formData.nomeCompleto} 
                                onChange={handleChange}
                                required 
                                style={styles.input} 
                                placeholder="Es. Mario Rossi"
                                onFocus={(e) => e.target.style.borderColor = '#805ad5'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                            />
                        </div>

                        {/* Email */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Email Aziendale</label>
                            <input 
                                type="email" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange}
                                required 
                                style={styles.input} 
                                placeholder="mario@bugboard.com"
                                onFocus={(e) => e.target.style.borderColor = '#805ad5'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                            />
                        </div>

                        {/* Password */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Password Iniziale</label>
                            <input 
                                type="password" 
                                name="password" 
                                value={formData.password} 
                                onChange={handleChange}
                                required 
                                style={styles.input} 
                                placeholder="••••••••"
                                onFocus={(e) => e.target.style.borderColor = '#805ad5'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                            />
                        </div>

                        {/* Ruolo */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>Ruolo & Permessi</label>
                            <select 
                                name="ruolo" 
                                value={formData.ruolo} 
                                onChange={handleChange}
                                style={styles.select}
                                onFocus={(e) => e.target.style.borderColor = '#805ad5'}
                                onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                            >
                                <option value="USER">User (Sviluppatore - Standard)</option>
                                <option value="ADMIN">Admin (Gestore - Accesso Completo)</option>
                            </select>
                        </div>

                        {/* Submit */}
                        <button 
                            type="submit" 
                            style={styles.button} 
                            disabled={isSubmitting}
                            onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#6b46c1')}
                            onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#805ad5')}
                        >
                            {isSubmitting ? 'Creazione in corso...' : 'Crea Utente'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;