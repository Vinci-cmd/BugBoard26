package com.bugboard.controller;

import com.bugboard.dto.CommentDTO;
import com.bugboard.model.Comment;
import com.bugboard.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/issues")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Endpoint: POST /api/issues/{id}/comments
    @PostMapping("/{issueId}/comments")
    public ResponseEntity<?> postComment(@PathVariable Long issueId, @RequestBody CommentDTO req) {
        try {
            // MODIFICA: Passiamo issueId, testo E autoreId al service
            Comment nuovoCommento = commentService.addComment(issueId, req.getTesto(), req.getAutoreId());
            return ResponseEntity.status(HttpStatus.CREATED).body(nuovoCommento);
        } catch (IllegalArgumentException e) {
            // Gestisce il caso in cui autoreId manchi o sia null
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (RuntimeException e) {
            // Gestisce errori come "Utente non trovato" o "Issue non trovata"
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/{issueId}/comments/{commentId}")
    public ResponseEntity<?> deleteComment(
            @PathVariable Long issueId, // Lo lasciamo per coerenza col path, anche se non lo usiamo
            @PathVariable Integer commentId, 
            @RequestParam Integer adminId) { // Parametro fondamentale per il controllo sicurezza
        try {
            commentService.deleteComment(commentId, adminId);
            return ResponseEntity.ok("Commento eliminato con successo.");
        } catch (RuntimeException e) {
            // Ritorna 403 (Forbidden) o 400 (Bad Request) in base all'errore
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
    
    // Endpoint: GET /api/issues/{id}/comments
    @GetMapping("/{issueId}/comments")
    public ResponseEntity<List<Comment>> getComments(@PathVariable Integer issueId) {
        return ResponseEntity.ok(commentService.getCommentsForIssue(issueId));
    }
}