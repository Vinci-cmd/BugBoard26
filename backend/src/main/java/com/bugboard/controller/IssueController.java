package com.bugboard.controller;

import com.bugboard.dto.IssueDTO;
import com.bugboard.dto.CommentDTO;
import com.bugboard.model.Issue;
import com.bugboard.model.Comment;
import com.bugboard.model.IssuePriority;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import com.bugboard.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
public class IssueController {

    @Autowired
    private IssueService issueService;

    // --- 1. CREAZIONE ISSUE CON IMMAGINE ---
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Issue> create(
            @RequestPart("issue") IssueDTO req,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        try {
            Issue createdIssue = issueService.createIssueWithImage(req, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIssue);
        } catch (IOException e) {
            System.err.println("ERRORE SALVATAGGIO FILE:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (RuntimeException e) {
            System.err.println("ERRORE LOGICA BUSINESS (Es. ID Utente mancante?):");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // --- 2. LISTA ISSUE ---
    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues(
            @RequestParam(required = false) IssueType tipo,
            @RequestParam(required = false) IssueStatus stato,
            @RequestParam(required = false) IssuePriority priorita) {
        
        List<Issue> issues = issueService.getBoard(tipo, stato, priorita);
        return ResponseEntity.ok(issues);
    }

    // --- 3. DETTAGLIO SINGOLA ISSUE ---
    @GetMapping("/{id}")
    public ResponseEntity<Issue> get(@PathVariable Long id) {
        try {
            Issue issue = issueService.getDetails(id);
            return ResponseEntity.ok(issue);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // --- 4. AGGIUNTA COMMENTO (NUOVO) ---
    @PostMapping("/{id}/comments")
    public ResponseEntity<?> addComment(
            @PathVariable Long id,
            @RequestBody CommentDTO req
    ) {
        try {
            Comment comment = issueService.addComment(id, req);
            return ResponseEntity.status(HttpStatus.CREATED).body(comment);
        } catch (RuntimeException e) {
            // Logghiamo l'errore per capire cosa non va (es. "Autore non trovato")
            System.err.println("ERRORE AGGIUNTA COMMENTO:");
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}