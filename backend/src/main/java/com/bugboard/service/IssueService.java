package com.bugboard.service;

import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.dto.IssueDTO;
import com.bugboard.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile; // Importante

import java.io.IOException;
import java.util.List;

@Service
public class IssueService {

    @Autowired
    private IssueDAO issueDAO;

    @Autowired
    private UserDAO userDAO;

    // Firma del metodo cambiata per accettare MultipartFile
    public Issue createIssue(IssueDTO dto, MultipartFile file) throws IOException {
        Issue issue = new Issue();
        issue.setTitolo(dto.getTitolo());
        issue.setDescrizione(dto.getDescrizione());
        issue.setTipo(dto.getTipo());
        issue.setPriorita(dto.getPriorita());

        // Gestione autore (Codice esistente)
        Integer autoreId = dto.getAutoreId();
        if (autoreId == null) autoreId = 1;
        User autore = userDAO.findById(autoreId)
                .orElseThrow(() -> new RuntimeException("Autore non trovato"));
        issue.setAutore(autore);

        // --- NUOVA LOGICA PER IL FILE ---
        if (file != null && !file.isEmpty()) {
            // Convertiamo il file in array di byte
            issue.setAllegato(file.getBytes());
            issue.setNomeFileAllegato(file.getOriginalFilename());
        }

        return issueDAO.save(issue);
    }

    // ... altri metodi (getBoard, getDetails) rimangono invariati ...
    public List<Issue> getBoard(IssueType tipo, IssueStatus stato, IssuePriority priorita) {
        return issueDAO.searchIssues(tipo, stato, priorita);
    }

    public Issue getDetails(Long id) {
        return issueDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + id));
    }
}