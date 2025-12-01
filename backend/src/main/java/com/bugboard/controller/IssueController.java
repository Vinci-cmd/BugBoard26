package com.bugboard.controller;

import com.bugboard.dto.IssueDTO;
import com.bugboard.model.Issue;
import com.bugboard.model.IssueStatus;
import com.bugboard.model.IssueType;
import com.bugboard.model.IssuePriority; // Non dimenticare questo import!
import com.bugboard.service.IssueService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*") 
public class IssueController {

    @Autowired
    private IssueService issueService;

    @PostMapping
    public ResponseEntity<Issue> create(@RequestBody IssueDTO req) {
        Issue createdIssue = issueService.createIssue(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdIssue);
    }

    @GetMapping
    public ResponseEntity<List<Issue>> getAllIssues(
            @RequestParam(required = false) IssueType tipo,
            @RequestParam(required = false) IssueStatus stato,
            @RequestParam(required = false) IssuePriority priorita) {
        
        // NIENTE PIÙ IF-ELSE!
        // Il Controller passa tutto al Service, che passa al DAO.
        List<Issue> issues = issueService.getBoard(tipo, stato, priorita);
        return ResponseEntity.ok(issues);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Issue> get(@PathVariable Long id) {
        Issue issue = issueService.getDetails(id);
        return ResponseEntity.ok(issue);
    }
}