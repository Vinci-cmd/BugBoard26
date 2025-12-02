import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

// --- IMPORT DEI COMPONENTI REALI ---
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateIssue from './pages/CreateIssue'; // File del Collega (Student B)
import IssueDetail from './pages/IssueDetail'; // File del Collega (Student B)

// Componente per proteggere le rotte (se non sei loggato, ti rimanda al login)
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      {/* La Navbar appare sempre se sei loggato */}
      <Navbar />

      <Routes>
        {/* Rotta di default: reindirizza alla dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/login" element={<Login />} />
        
        {/* --- ROTTE PROTETTE --- */}
        
        {/* Dashboard (Studente A) */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        {/* Creazione Nuova Issue (Studente B) */}
        {/* Nota: Usiamo "/create" perché è quello che chiama il bottone nella Dashboard */}
        <Route 
          path="/create" 
          element={
            <PrivateRoute>
              <CreateIssue />
            </PrivateRoute>
          } 
        />

        {/* Dettaglio Issue (Studente B) */}
        {/* Nota: Usiamo "/issue/:id" perché è quello che chiamano le IssueCard */}
        <Route 
          path="/issue/:id" 
          element={
            <PrivateRoute>
              <IssueDetail />
            </PrivateRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;