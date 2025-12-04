import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import CreateIssue from './pages/CreateIssue';
import IssueDetail from './pages/IssueDetail';
import CreateUser from './pages/CreateUser'; // <--- IMPORTA IL NUOVO COMPONENTE

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        
        {/* --- ROTTE PROTETTE --- */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/create" element={<PrivateRoute><CreateIssue /></PrivateRoute>} />
        <Route path="/issue/:id" element={<PrivateRoute><IssueDetail /></PrivateRoute>} />
        
        {/* NUOVA ROTTA */}
        <Route path="/create-user" element={<PrivateRoute><CreateUser /></PrivateRoute>} />

      </Routes>
    </Router>
  );
}

export default App;