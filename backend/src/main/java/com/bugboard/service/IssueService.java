package com.bugboard.service;

import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.dto.IssueDTO;
import com.bugboard.model.*; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile; // Import necessario per i file

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class IssueService {

    @Autowired
    private IssueDAO issueDAO;

    @Autowired
    private UserDAO userDAO;

    // Metodo aggiornato per gestire anche l'immagine (può lanciare IOException)
    public Issue createIssueWithImage(IssueDTO dto, MultipartFile imageFile) throws IOException {
        Issue issue = new Issue();
        issue.setTitolo(dto.getTitolo());
        issue.setDescrizione(dto.getDescrizione());
        issue.setTipo(dto.getTipo());
        issue.setPriorita(dto.getPriorita());
        
        // --- FIX FONDAMENTALE ---
        // Impostiamo lo stato iniziale, altrimenti il DB dà errore se il campo è Not Null
        issue.setStato(IssueStatus.TODO); 
        
        // ... resto del codice (Autore, Immagine, Save) ...
        Integer autoreId = dto.getAutoreId();
        // ...

        // 1. Controllo di Validità: L'ID è obbligatorio!
        if (autoreId == null) {
            throw new IllegalArgumentException("Errore: ID Autore mancante. Il frontend deve inviare l'ID dell'utente loggato.");
        }

        // 2. Recupero dal Database (Verifica che l'utente esista davvero)
        User autore = userDAO.findById(autoreId)
                .orElseThrow(() -> new RuntimeException("Nessun utente trovato con ID: " + autoreId));

        issue.setAutore(autore);

        // --- GESTIONE IMMAGINE (Nuova aggiunta per Funzionalità 2) ---
        if (imageFile != null && !imageFile.isEmpty()) {
            // 1. Definisci la cartella di destinazione
            String uploadDir = "uploads/";
            Path uploadPath = Paths.get(uploadDir);

            // 2. Se la cartella non esiste, creala
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            // 3. Genera un nome file unico (UUID + nome originale) per evitare sovrascritture
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            
            // 4. Copia il file fisico sul disco
            Files.copy(imageFile.getInputStream(), filePath);

            // 5. Salva il percorso (stringa) nell'entità Issue
            issue.setPercorsoAllegato(filePath.toString());
        }

        return issueDAO.save(issue);
    }

    // ... altri metodi (getBoard, getDetails) rimangono invariati ...
    public List<Issue> getBoard(IssueType tipo, IssueStatus stato, IssuePriority priorita) {
        return issueDAO.searchIssues(tipo, stato, priorita);
    }

    public Issue getDetails(Long id) {
        return issueDAO.findById(id) // Assicurati che IssueDAO accetti Long o Integer coerentemente
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + id));
    }
}