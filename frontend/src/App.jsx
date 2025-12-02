import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import CreateIssue from "./pages/CreateIssue";
import IssueDetail from "./pages/IssueDetail";

// --- I TUOI COMPONENTI (Studente A) ---
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';

// --- COMPONENTI DEL COLLEGA (Studente B) ---
// Siccome questi file non esistono ancora sul tuo computer,
// usiamo questi "finti" componenti temporanei per non rompere il sito.
const CreateIssuePlaceholder = () => (
    <div style={{ padding: '2rem' }}>
        <h2>Pagina del Collega (B)</h2>
        <p>Qui andrà il form di creazione issue.</p>
    </div>
);

const IssueDetailPlaceholder = () => (
    <div style={{ padding: '2rem' }}>
        <h2>Pagina del Collega (B)</h2>
        <p>Qui andranno i dettagli della issue.</p>
    </div>
);

// Componente per proteggere le rotte
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      {/* La Navbar appare sempre se sei loggato (gestito dentro il componente stesso) */}
      <Navbar />

      <Routes>
        {/* Rotta di default */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/issues/new" element={<CreateIssue />} />

        <Route path="/issues/:id" element={<IssueDetail />} />
        
        {/* --- LE TUE ROTTE (Studente A) --- */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard /> {/* Carica la TUA dashboard vera */}
            </PrivateRoute>
          } 
        />

        {/* --- ROTTE DEL COLLEGA (Studente B) --- */}
        <Route 
          path="/create" 
          element={
            <PrivateRoute>
              <CreateIssuePlaceholder />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/issue/:id" 
          element={
            <PrivateRoute>
              <IssueDetailPlaceholder />
            </PrivateRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;