import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IssueService from "../services/IssueService";

const IssueDetail = () => {
  const { id } = useParams(); // Prende l'ID dall'URL (definito in App.jsx come :id)
  const navigate = useNavigate();

  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState(null);

  // Carica i dati all'avvio
  useEffect(() => {
    fetchIssue();
  }, [id]);

  const fetchIssue = async () => {
    try {
      const data = await IssueService.getById(id);
      setIssue(data);
    } catch (err) {
      console.error("Errore recupero issue:", err);
      setError("Impossibile caricare la segnalazione.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      // Chiamata al servizio per aggiungere il commento
      const commentoSalvato = await IssueService.addComment(id, newComment);
      
      // Aggiorniamo la UI aggiungendo il nuovo commento alla lista esistente
      // Nota: Dipende se il backend restituisce il commento o la lista aggiornata.
      // Assumiamo restituisca il commento o ricarichiamo tutto.
      
      // Opzione A: Ricarica tutto (più sicuro per la sincronizzazione)
      await fetchIssue(); 
      
      setNewComment(""); // Pulisci il campo
    } catch (err) {
      alert("Errore nell'invio del commento");
    }
  };

  // Helper per colori badge
  const getPriorityBadge = (prio) => {
    switch(prio) {
      case 'CRITICAL': return 'bg-danger';
      case 'HIGH': return 'bg-warning text-dark';
      case 'MEDIUM': return 'bg-info text-dark';
      case 'LOW': return 'bg-secondary';
      default: return 'bg-light text-dark';
    }
  };

  if (loading) return <div className="text-center mt-5">Caricamento...</div>;
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;
  if (!issue) return <div className="text-center mt-5">Issue non trovata.</div>;

  return (
    <div className="container mt-4">
      <button className="btn btn-outline-secondary mb-3" onClick={() => navigate(-1)}>
        &larr; Torna indietro
      </button>

      {/* Card Dettaglio Issue */}
      <div className="card shadow-sm mb-4">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">#{issue.id} - {issue.titolo}</h4>
          <span className={`badge ${getPriorityBadge(issue.priorita)}`}>
            {issue.priorita}
          </span>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <strong>Stato: </strong> 
              <span className="badge bg-primary ms-2">{issue.stato}</span>
            </div>
            <div className="col-md-6">
              <strong>Tipo: </strong> {issue.tipo}
            </div>
          </div>
          
          <h5 className="mt-4">Descrizione</h5>
          <p className="card-text bg-light p-3 rounded border">
            {issue.descrizione}
          </p>

          {/* Sezione Allegato (Se presente) */}
          {/* Nota: Qui visualizziamo solo il nome per ora. 
              Per vedere l'immagine servirebbe un endpoint backend specifico per il download */}
          {issue.attachmentPath && (
            <div className="mt-3">
              <strong>Allegato presente: </strong>
              <span className="text-muted">{issue.attachmentPath}</span>
            </div>
          )}
        </div>
      </div>

      {/* Sezione Commenti */}
      <div className="card shadow-sm">
        <div className="card-header bg-white">
          <h5 className="mb-0">Commenti ({issue.commenti ? issue.commenti.length : 0})</h5>
        </div>
        <div className="card-body">
          {/* Lista Commenti */}
          <div className="mb-4 list-group list-group-flush">
            {issue.commenti && issue.commenti.length > 0 ? (
              issue.commenti.map((c) => (
                <div key={c.id} className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <strong>{c.autore ? c.autore.nome : "Utente"}</strong>
                    <small className="text-muted">
                        {/* Formattazione data semplice */}
                        {new Date(c.dataCreazione).toLocaleString()}
                    </small>
                  </div>
                  <p className="mb-1 mt-1">{c.testo}</p>
                </div>
              ))
            ) : (
              <p className="text-muted text-center py-3">Nessun commento presente.</p>
            )}
          </div>

          {/* Form Nuovo Commento */}
          <form onSubmit={handleAddComment}>
            <div className="mb-3">
              <label className="form-label">Aggiungi un commento</label>
              <textarea
                className="form-control"
                rows="3"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Scrivi qui..."
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Invia Commento</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default IssueDetail;