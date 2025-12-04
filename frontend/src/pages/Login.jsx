import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);
        
        try {
            await AuthService.login(email, password);
            // Se il login ha successo, vai alla Dashboard
            navigate('/dashboard'); 
        } catch (err) {
            console.error("Errore login:", err);
            setError("Credenziali non valide. Riprova.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- STILI MODERNI UNIFORMATI ---
    const styles = {
        pageWrapper: {
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#f8f9fa', // Grigio moderno (come Dashboard)
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        card: {
            padding: '2.5rem', 
            backgroundColor: '#ffffff', 
            borderRadius: '12px', // Angoli più morbidi
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)', // Ombra più profonda
            width: '100%',
            maxWidth: '400px', // Leggermente più largo per respiro
            border: '1px solid #e2e8f0'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        brandIcon: {
            fontSize: '3rem',
            marginBottom: '0.5rem',
            display: 'block'
        },
        title: {
            margin: 0,
            fontSize: '1.5rem',
            color: '#1a202c',
            fontWeight: '800',
            letterSpacing: '-0.025em'
        },
        subtitle: {
            color: '#718096',
            fontSize: '0.95rem',
            marginTop: '0.5rem'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: '600',
            color: '#4a5568'
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
        button: {
            width: '100%',
            padding: '0.85rem',
            backgroundColor: '#4299e1', // Blu solido (come pulsante refresh)
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: '600',
            transition: 'background-color 0.2s',
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        errorBox: {
            backgroundColor: '#fff5f5',
            color: '#c53030',
            padding: '0.75rem',
            borderRadius: '6px',
            fontSize: '0.9rem',
            marginBottom: '1.5rem',
            border: '1px solid #feb2b2',
            textAlign: 'center'
        },
        footer: {
            marginTop: '2rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            color: '#718096'
        }
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.card}>
                
                <div style={styles.header}>
                    <span style={styles.brandIcon}>🐞</span>
                    <h2 style={styles.title}>BugBoard26</h2>
                    <p style={styles.subtitle}>Accedi per gestire le tue issue</p>
                </div>
                
                {error && <div style={styles.errorBox}>{error}</div>}
                
                <form onSubmit={handleLogin}>
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Email</label>
                        <input 
                            type="email" 
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="nome@esempio.com"
                            required
                            onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                            onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                        />
                    </div>
                    
                    <div style={styles.formGroup}>
                        <label style={styles.label}>Password</label>
                        <input 
                            type="password" 
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            onFocus={(e) => e.target.style.borderColor = '#4299e1'}
                            onBlur={(e) => e.target.style.borderColor = '#cbd5e0'}
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={styles.button}
                        disabled={isSubmitting}
                        onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#3182ce')}
                        onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#4299e1')}
                    >
                        {isSubmitting ? 'Accesso in corso...' : 'Accedi'}
                    </button>
                </form>

                <div style={styles.footer}>
                    &copy; 2025 BugBoard Team - Ingegneria del Software
                </div>
            </div>
        </div>
    );
};

export default Login;