package com.bugboard.service;

import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.dto.IssueDTO;
import com.bugboard.model.*; // Importa tutto per comodità
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueDAO issueDAO;

    @Autowired
    private UserDAO userDAO;

    public Issue createIssue(IssueDTO dto) {
        Issue issue = new Issue();
        issue.setTitolo(dto.getTitolo());
        issue.setDescrizione(dto.getDescrizione());
        issue.setTipo(dto.getTipo());
        issue.setPriorita(dto.getPriorita());
        
        // Gestione autore (Il tuo "Trucco" temporaneo)
        Integer autoreId = dto.getAutoreId();
        if (autoreId == null) {
            autoreId = 1; 
        }
        
        // Consiglio: Se l'autore non esiste, questo lancia eccezione.
        // Per ora va bene, ma ricorda di avere un utente con ID 1 nel DB!
        User autore = userDAO.findById(autoreId)
                .orElseThrow(() -> new RuntimeException("Autore non trovato ID: " + dto.getAutoreId()));

        issue.setAutore(autore);
        return issueDAO.save(issue);
    }

    // Metodo unico per recuperare le issue (filtrate o tutte)
    public List<Issue> getBoard(IssueType tipo, IssueStatus stato, IssuePriority priorita) {
        return issueDAO.searchIssues(tipo, stato, priorita);
    }

    public Issue getDetails(Long id) {
        return issueDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + id));
    }
}