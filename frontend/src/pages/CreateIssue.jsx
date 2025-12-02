import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IssueService from "../services/IssueService"; 

const CreateIssue = () => {
  // Stati del form
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("BUG"); 
  const [priority, setPriority] = useState("MEDIUM");
  const [file, setFile] = useState(null);
  
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // 1. PREPARAZIONE DEL JSON (IssueDTO)
    // Usiamo i nomi esatti di IssueDTO.java (titolo, descrizione, ecc.)
    const issueDto = {
        titolo: title,
        descrizione: description,
        tipo: type,       // Coincide con Enum (BUG, QUESTION...)
        priorita: priority, // Coincide con Enum (LOW, MEDIUM...)
        autoreId: 1       // TODO: Recuperare ID utente loggato o lasciare null se gestito dal backend
    };

    // 2. IMPACCHETTAMENTO DEL JSON
    // Il backend vuole @RequestPart("issue"), quindi usiamo "issue" come chiave.
    // Dobbiamo inviarlo come Blob con type application/json
    formData.append(
        "issue", 
        new Blob([JSON.stringify(issueDto)], { type: "application/json" })
    );
    
    // 3. AGGIUNTA DEL FILE
    // Il backend vuole @RequestPart("file")
    if (file) {
      formData.append("file", file); 
    }

    try {
      await IssueService.create(formData);
      alert("Segnalazione inviata con successo!");
      navigate("/"); // Torna alla dashboard
    } catch (error) {
      console.error("Errore creazione issue:", error);
      alert("Errore durante l'invio. Controlla la console.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="mb-4">Nuova Segnalazione</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Titolo */}
          <div className="mb-3">
            <label className="form-label fw-bold">Titolo</label>
            <input 
              type="text" 
              className="form-control" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Es: Errore nel login..."
              required 
            />
          </div>

          {/* Descrizione */}
          <div className="mb-3">
            <label className="form-label fw-bold">Descrizione</label>
            <textarea 
              className="form-control" 
              rows="5"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrivi dettagliatamente il problema..."
              required
            ></textarea>
          </div>

          {/* Select Tipo & Priorità */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Tipologia</label>
              {/* I valori "value" devono coincidere con IssueType.java [BUG, QUESTION, etc] */}
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="BUG">Bug</option>
                <option value="FEATURE">Nuova Funzionalità</option>
                <option value="QUESTION">Domanda</option>
                <option value="DOCUMENTATION">Documentazione</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Priorità</label>
              {/* I valori "value" devono coincidere con IssuePriority.java [LOW, MEDIUM, etc] */}
              <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="LOW">Bassa</option>
                <option value="MEDIUM">Media</option>
                <option value="HIGH">Alta</option>
                <option value="CRITICAL">Critica</option>
              </select>
            </div>
          </div>

          {/* Upload File */}
          <div className="mb-4">
            <label className="form-label fw-bold">Allegato (Opzionale)</label>
            <input 
              type="file" 
              className="form-control" 
              accept="image/*,.pdf,.txt" // Puoi limitare i tipi se vuoi
              onChange={handleFileChange} 
            />
            <div className="form-text">Formati accettati: Immagini, PDF, TXT.</div>
          </div>

          <div className="d-grid gap-2">
            <button type="submit" className="btn btn-primary btn-lg">
              Crea Segnalazione
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
              Annulla
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateIssue;