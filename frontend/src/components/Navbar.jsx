import { Link, useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [hoverIndex, setHoverIndex] = useState(null);
    
    const isAuth = AuthService.isAuthenticated(); 
    const user = AuthService.getCurrentUser();

    if (!isAuth) return null; 

    const handleLogout = () => {
        AuthService.logout();
        navigate('/login');
    };

    // Genera un avatar con le iniziali (servizio gratuito ui-avatars)
    // Se user.nomeCompleto non c'è, usa "User"
    const avatarUrl = `https://ui-avatars.com/api/?name=${user?.nomeCompleto || 'User'}&background=0D8ABC&color=fff&rounded=true&size=40`;

    const styles = {
        nav: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.7rem 2rem', // Altezza ridotta per eleganza
            backgroundColor: '#ffffff', // Sfondo bianco pulito
            borderBottom: '1px solid #e2e8f0', // Linea sottile grigia
            boxShadow: '0 2px 4px rgba(0,0,0,0.02)', // Ombra impercettibile
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        },
        // Sezione Sinistra (Logo)
        brandContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textDecoration: 'none'
        },
        brandIcon: {
            fontSize: '1.8rem',
            lineHeight: '1',
            filter: 'hue-rotate(320deg)' // Un piccolo tocco per cambiare colore all'emoji se vuoi
        },
        brandText: {
            fontSize: '1.3rem',
            fontWeight: '800', // Molto bold
            color: '#1a202c', // Grigio scuro quasi nero
            letterSpacing: '-0.5px'
        },
        brandHighlight: {
            color: '#718096' // Colore secondario per il "26"
        },
        
        // Sezione Destra (Links + User)
        rightSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '2.5rem'
        },
        links: {
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
        },
        link: (index) => ({
            color: hoverIndex === index ? '#2b6cb0' : '#4a5568', // Da grigio a blu
            textDecoration: 'none',
            fontSize: '0.95rem',
            fontWeight: '600',
            transition: 'color 0.2s ease',
            cursor: 'pointer',
            paddingBottom: hoverIndex === index ? '2px' : '2px',
            borderBottom: hoverIndex === index ? '2px solid #2b6cb0' : '2px solid transparent' // Sottolineatura animata
        }),

        // Profilo Utente
        userSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingLeft: '1.5rem',
            borderLeft: '1px solid #edf2f7' // Separatore verticale
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        avatar: {
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            objectFit: 'cover'
        },
        userName: {
            fontSize: '0.9rem',
            color: '#2d3748',
            fontWeight: '600',
            maxWidth: '150px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        logoutButton: {
            padding: '0.4rem 0.8rem',
            backgroundColor: 'transparent',
            color: '#e53e3e', // Rosso
            border: '1px solid #fed7d7',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: '0.75rem',
            marginLeft: '10px',
            transition: 'all 0.2s',
            textTransform: 'uppercase'
        }
    };

    return (
        <nav style={styles.nav}>
            {/* Logo / Nome App */}
            <Link to="/dashboard" style={styles.brandContainer}>
                <span style={styles.brandIcon}>🐞</span>
                <span style={styles.brandText}>
                    BugBoard<span style={styles.brandHighlight}>26</span>
                </span>
            </Link>

            <div style={styles.rightSection}>
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

                    {/* NUOVO LINK: Visibile solo agli ADMIN */}
                    {user && user.ruolo === 'ADMIN' && (
                        <Link 
                            to="/create-user" 
                            style={{...styles.link(2), color: '#805ad5'}} // Un colore viola distintivo per azioni admin
                            onMouseEnter={() => setHoverIndex(2)}
                            onMouseLeave={() => setHoverIndex(null)}
                        >
                            Gestione Utenti
                        </Link>
                    )}
                </div>
                
                {/* Sezione Utente con Avatar */}
                <div style={styles.userSection}>
                    <div style={styles.userInfo}>
                        <img 
                            src={avatarUrl} 
                            alt="Avatar" 
                            style={styles.avatar} 
                            onError={(e) => {e.target.style.display='none'}} // Fallback se l'img fallisce
                        />
                        <span style={styles.userName}>
                            {user?.nomeCompleto || 'Amministratore'}
                        </span>
                    </div>

                    <button 
                        onClick={handleLogout} 
                        style={styles.logoutButton}
                        onMouseOver={(e) => {
                            e.target.style.backgroundColor = '#fff5f5';
                            e.target.style.borderColor = '#e53e3e';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.borderColor = '#fed7d7';
                        }}
                    >
                        Esci
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;