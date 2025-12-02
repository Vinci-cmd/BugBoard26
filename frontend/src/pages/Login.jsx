import { useState } from 'react';
import AuthService from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            await AuthService.login(email, password);
            // Se il login ha successo, vai alla Dashboard
            navigate('/dashboard'); 
        } catch (err) {
            console.error("Errore login:", err);
            setError("Credenziali non valide. Riprova.");
        }
    };

    // Stile CSS "inline" semplice per iniziare velocemente
    const styles = {
        container: {
            display: 'flex', justifyContent: 'center', alignItems: 'center', 
            height: '100vh', backgroundColor: '#f0f2f5'
        },
        card: {
            padding: '2rem', backgroundColor: 'white', borderRadius: '8px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '300px'
        },
        input: {
            width: '100%', padding: '0.5rem', marginBottom: '1rem', 
            borderRadius: '4px', border: '1px solid #ccc'
        },
        button: {
            width: '100%', padding: '0.7rem', backgroundColor: '#007bff', 
            color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'
        },
        error: { color: 'red', fontSize: '0.8rem', marginBottom: '1rem' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={{textAlign: 'center', marginBottom: '1.5rem'}}>BugBoard Login</h2>
                
                {error && <p style={styles.error}>{error}</p>}
                
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email</label>
                        <input 
                            type="text" 
                            style={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password</label>
                        <input 
                            type="password" 
                            style={styles.input}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>Accedi</button>
                </form>
            </div>
        </div>
    );
};

export default Login;