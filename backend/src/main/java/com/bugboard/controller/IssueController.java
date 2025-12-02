package com.bugboard.controller;

import com.bugboard.dto.IssueDTO;
import com.bugboard.model.Issue;
import com.bugboard.model.IssuePriority;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import com.bugboard.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType; // Importante
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile; // Importante

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class IssueController {

    @Autowired
    private IssueService issueService;

    // MODIFICA IMPORTANTE: Gestione Multipart
    @PostMapping(consumes = { MediaType.MULTIPART_FORM_DATA_VALUE })
    public ResponseEntity<?> create(
            @RequestPart("issue") IssueDTO issueDTO, // La parte JSON
            @RequestPart(value = "file", required = false) MultipartFile file // La parte File (opzionale)
    ) {
        try {
            // Passiamo sia il DTO che il File al Service
            Issue createdIssue = issueService.createIssue(issueDTO, file);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdIssue);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Errore nel caricamento del file");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
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