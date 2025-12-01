package com.bugboard.service;

import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.dto.IssueDTO;
import com.bugboard.model.Issue;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import com.bugboard.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueDAO issueDAO;

    @Autowired
    private UserDAO userDAO;

    /**
     * Crea una nuova Issue nel database partendo dal DTO.
     */
    public Issue createIssue(IssueDTO dto) {
        Issue issue = new Issue();
        
        // 1. Mappatura Dati Semplici
        issue.setTitolo(dto.getTitolo());
        issue.setDescrizione(dto.getDescrizione());
        issue.setTipo(dto.getTipo());
        issue.setPriorita(dto.getPriorita());
        
        // Nota: 'stato' e 'dataCreazione' sono impostati di default nel costruttore di Issue.

        // 2. Gestione dell'Autore (Il punto critico per lavorare in parallelo)
        Integer autoreId = dto.getAutoreId();

        // TRUCCO PER STUDENTE B:
        // Se l'ID non arriva dal frontend (perché l'auth non è pronta), usiamo l'ID 1 (Admin).
        // Quando il login sarà pronto, toglieremo questo 'if'.
        if (autoreId == null) {
            autoreId = 1; 
        }

        // Cerchiamo l'utente nel DB. Se non esiste, lanciamo un errore.
        User autore = userDAO.findById(autoreId)
                .orElseThrow(() -> new RuntimeException("Autore non trovato con ID: " + dto.getAutoreId()));

        issue.setAutore(autore);

        // 3. Salvataggio
        return issueDAO.save(issue);
    }

    /**
     * Recupera la lista delle issue.
     * Se vengono passati filtri, usa la query specifica, altrimenti restituisce tutto.
     * Corrisponde al metodo 'getBoard' del diagramma UML.
     */
    public List<Issue> getBoard(IssueType tipo, IssueStatus stato) {
        if (tipo != null && stato != null) {
            // Usa il metodo custom che abbiamo creato nel DAO con @Query
            return issueDAO.findByFilters(tipo, stato);
        } else {
            // Se non ci sono filtri, restituisce tutto
            return issueDAO.findAll();
        }
    }
    
    /**
     * Recupera il dettaglio di una singola issue.
     */
    public Issue getDetails(Integer id) {
        return issueDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + id));
    }
}