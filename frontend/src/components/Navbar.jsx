import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [hoverIndex, setHoverIndex] = useState(null); // Per gestire l'hover sui link
    
    // Controlliamo se l'utente è loggato
    const isAuth = AuthService.isAuthenticated(); 
    const user = AuthService.getCurrentUser();

    // Se non sei loggato, la navbar non appare
    if (!isAuth) return null; 

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.8rem 2rem',
            backgroundColor: '#2c3e50', // Blu scuro istituzionale
            borderBottom: '3px solid #c5a059', // Linea dorata "Accademica"
            color: 'white',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            fontFamily: '"Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        },
        brandContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
        },
        brandText: {
            fontSize: '1.4rem',
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: '"Georgia", serif', // Font serif per autorità
            letterSpacing: '0.5px'
        },
        brandIcon: {
            fontSize: '1.5rem',
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.3))'
        },
        links: {
            display: 'flex',
            gap: '2rem',
            alignItems: 'center'
        },
        link: (index) => ({
            color: hoverIndex === index ? '#c5a059' : '#e0e0e0', // Diventa dorato all'hover
            textDecoration: 'none',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'color 0.2s ease',
            cursor: 'pointer'
        }),
        userSection: {
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Sfondo semitrasparente
            padding: '0.4rem 1rem',
            borderRadius: '50px', // Forma a pillola
            border: '1px solid rgba(255,255,255,0.2)',
            marginLeft: '1.5rem'
        },
        userName: {
            marginRight: '1rem',
            fontSize: '0.9rem',
            color: '#f8f9fa',
            fontWeight: '500'
        },
        logoutButton: {
            padding: '0.3rem 0.8rem',
            backgroundColor: 'transparent',
            color: '#ff6b6b', // Rosso pastello
            border: '1px solid #ff6b6b',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.8rem',
            transition: 'all 0.2s'
        }
    };

    return (
        <nav style={styles.nav}>
            {/* Logo / Nome App */}
            <Link to="/dashboard" style={styles.brandContainer}>
                <span style={styles.brandIcon}>🐞</span>
                <span style={styles.brandText}>BugBoard<span style={{color:'#c5a059'}}>26</span></span>
            </Link>

            {/* Area Navigazione */}
            <div style={styles.links}>
                <Link 
                    to="/dashboard" 
                    style={styles.link(0)}
                    onMouseEnter={() => setHoverIndex(0)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    Dashboard
                </Link>
                
                <Link 
                    to="/create" 
                    style={styles.link(1)}
                    onMouseEnter={() => setHoverIndex(1)}
                    onMouseLeave={() => setHoverIndex(null)}
                >
                    Nuova Issue
                </Link>
                
                {/* Sezione Utente a Pillola */}
                <div style={styles.userSection}>
                    <span style={styles.userName}>
                        {user?.nomeCompleto || 'Studente'}
                    </span>
                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutButton}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#ff6b6b';
                            e.target.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#ff6b6b';
                        }}
                    >
                        ESCI
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;