package com.bugboard.controller;

import com.bugboard.dto.IssueDTO;
import com.bugboard.model.Issue;
import com.bugboard.model.IssuePriority;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import com.bugboard.model.IssuePriority; 
import com.bugboard.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType; // Importante per MediaType
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // Importante per gestire il file

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    // --- MODIFICA CRITICA PER L'IMMAGINE ---
    // 1. Specifichiamo che questo endpoint consuma 'multipart/form-data'
    // 2. Usiamo @RequestPart invece di @RequestBody
@PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Issue> create(
            @RequestPart("issue") IssueDTO req,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            Issue createdIssue = issueService.createIssueWithImage(req, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIssue);
        } catch (IOException e) {
            // MODIFICA QUI: Stampa l'errore nella console!
            System.err.println("ERRORE SALVATAGGIO FILE:");
            e.printStackTrace(); 
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            // Aggiungi anche questo per catturare errori ID utente e vederli
            System.err.println("ERRORE LOGICA BUSINESS (Es. ID Utente):");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ... Gli altri metodi (list, get) rimangono uguali ...
    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues(
            @RequestParam(required = false) IssueType tipo,
            @RequestParam(required = false) IssueStatus stato,
            @RequestParam(required = false) IssuePriority priorita) {
        
        List<Issue> issues = issueService.getBoard(tipo, stato, priorita);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> get(@PathVariable Long id) {
        Issue issue = issueService.getDetails(id);
        return ResponseEntity.ok(issue);
    }
}