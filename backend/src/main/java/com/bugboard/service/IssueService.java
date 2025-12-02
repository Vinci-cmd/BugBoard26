package com.bugboard.service;

import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.dao.CommentDAO; // <--- 1. NUOVO IMPORT
import com.bugboard.dto.IssueDTO;
import com.bugboard.dto.CommentDTO; // <--- 2. NUOVO IMPORT
import com.bugboard.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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

    @Autowired
    private CommentDAO commentDAO; // <--- 3. FONDAMENTALE: Per salvare i commenti

    // --- CREAZIONE ISSUE (Già presente e corretto) ---
    public Issue createIssueWithImage(IssueDTO dto, MultipartFile imageFile) throws IOException {
        Issue issue = new Issue();
        issue.setTitolo(dto.getTitolo());
        issue.setDescrizione(dto.getDescrizione());
        issue.setTipo(dto.getTipo());
        issue.setPriorita(dto.getPriorita());
        issue.setStato(IssueStatus.TODO);

        Integer autoreId = dto.getAutoreId();
        if (autoreId == null) {
            throw new IllegalArgumentException("Errore: ID Autore mancante.");
        }

        User autore = userDAO.findById(autoreId)
                .orElseThrow(() -> new RuntimeException("Nessun utente trovato con ID: " + autoreId));

        issue.setAutore(autore);

        if (imageFile != null && !imageFile.isEmpty()) {
            String uploadDir = "uploads/";
            Path uploadPath = Paths.get(uploadDir);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }
            String fileName = UUID.randomUUID().toString() + "_" + imageFile.getOriginalFilename();
            Path filePath = uploadPath.resolve(fileName);
            Files.copy(imageFile.getInputStream(), filePath);
            issue.setPercorsoAllegato(filePath.toString());
            // issue.setNomeFileAllegato(imageFile.getOriginalFilename()); // Decommenta se hai aggiunto il campo in Issue.java
        }

        return issueDAO.save(issue);
    }

    // --- LETTURA (Già presenti) ---
    public List<Issue> getBoard(IssueType tipo, IssueStatus stato, IssuePriority priorita) {
        return issueDAO.searchIssues(tipo, stato, priorita);
    }

    public Issue getDetails(Long id) {
        return issueDAO.findById(id)
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + id));
    }

    // --- NUOVO METODO: AGGIUNTA COMMENTO ---
    // Questo è il pezzo che mancava!
    public Comment addComment(Long issueId, CommentDTO dto) {
        // 1. Cerchiamo la Issue (se non c'è, errore)
        Issue issue = getDetails(issueId);

        // 2. Cerchiamo l'Autore (chi sta commentando?)
        if (dto.getAutoreId() == null) {
            throw new IllegalArgumentException("ID Autore del commento mancante");
        }
        User autore = userDAO.findById(dto.getAutoreId())
                .orElseThrow(() -> new RuntimeException("Autore commento non trovato"));

        // 3. Creiamo l'oggetto Comment
        Comment comment = new Comment();
        comment.setTesto(dto.getTesto());
        comment.setIssue(issue); // Colleghiamo alla issue
        comment.setAutore(autore); // Colleghiamo all'autore

        // 4. Salviamo nel DB
        return commentDAO.save(comment);
    }
}