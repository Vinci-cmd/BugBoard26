package com.bugboard.controller;

import com.bugboard.dto.IssueDTO;
import com.bugboard.model.Issue;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import com.bugboard.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
// @CrossOrigin è FONDAMENTALE: permette al Frontend (es. localhost:3000)
// di chiamare il Backend (localhost:8080) senza errori di sicurezza browser.
@CrossOrigin(origins = "*") 
public class IssueController {

    @Autowired
    private IssueService issueService;

    /**
     * Endpoint per creare una issue.
     * Metodo: POST /api/issues
     * Corrisponde al metodo UML: + create(req: IssueDTO): ResponseEntity [cite: 660]
     */
    @PostMapping
    public ResponseEntity<Issue> create(@RequestBody IssueDTO req) {
        // Chiama il service. Grazie al "trucco" nell'IssueService, 
        // funzionerà anche se Studente A non ha finito il login.
        Issue createdIssue = issueService.createIssue(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIssue);
    }

    /**
     * Endpoint per la Dashboard. Supporta filtri opzionali.
     * Metodo: GET /api/issues?tipo=BUG&stato=TODO
     * Corrisponde al metodo UML: + list(tipo, stato): ResponseEntity [cite: 660]
     */
    @GetMapping
    public ResponseEntity<List<Issue>> list(
            @RequestParam(required = false) IssueType tipo,
            @RequestParam(required = false) IssueStatus stato) {
        
        List<Issue> issues = issueService.getBoard(tipo, stato);
        return ResponseEntity.ok(issues);
    }

    /**
     * Dettaglio singola issue.
     * Metodo: GET /api/issues/{id}
     * Corrisponde al metodo UML: + get(id): ResponseEntity [cite: 661]
     */
    @GetMapping("/{id}")
    public ResponseEntity<Issue> get(@PathVariable Integer id) {
        Issue issue = issueService.getDetails(id);
        return ResponseEntity.ok(issue);
    }
}