import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// Placeholder per la Dashboard (la faremo al prossimo step)
const DashboardPlaceholder = () => (
  <div style={{padding: '2rem'}}>
    <h1>Benvenuto nella Dashboard!</h1>
    <p>Qui vedrai la lista delle Issue.</p>
    <button onClick={() => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    }}>Logout</button>
  </div>
);

// Componente per proteggere le rotte (se non sei loggato, ti rimanda al login)
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rotta di default: reindirizza al login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* Rotta protetta: accessibile solo se loggati */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPlaceholder />
            </PrivateRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;