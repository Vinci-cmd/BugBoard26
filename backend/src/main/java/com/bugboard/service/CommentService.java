package com.bugboard.service;

import com.bugboard.dao.CommentDAO;
import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.model.Comment;
import com.bugboard.model.Issue;
import com.bugboard.model.User;
import com.bugboard.model.UserRole;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentDAO commentDAO;

    @Autowired
    private IssueDAO issueDAO;

    @Autowired
    private UserDAO userDAO;

    // MODIFICA: Ora accettiamo anche l'ID dell'autore come parametro
    public Comment addComment(Long issueId, String testo, Integer autoreId) {
        // 1. Recupera la Issue
        Issue issue = issueDAO.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + issueId));

        // 2. Controllo Validità Autore (Il frontend deve inviarlo!)
        if (autoreId == null) {
            throw new IllegalArgumentException("Errore: ID Autore mancante per il commento.");
        }

        // 3. Recupera l'Autore Reale dal DB
        User autore = userDAO.findById(autoreId)
                .orElseThrow(() -> new RuntimeException("Utente non trovato con ID: " + autoreId));

        // 4. Crea il Commento
        Comment comment = new Comment();
        comment.setTesto(testo);
        comment.setDataOra(new Date()); // Imposta data corrente
        comment.setIssue(issue);
        comment.setAutore(autore);

        return commentDAO.save(comment);
    }

    public void deleteComment(Integer commentId, Integer requestorId) {
    // 1. Recupera l'utente che sta facendo la richiesta
    User requestor = userDAO.findById(requestorId)
            .orElseThrow(() -> new RuntimeException("Utente richiedente non trovato con ID: " + requestorId));

    // 2. Verifica i permessi (Solo ADMIN)
    if (requestor.getRuolo() != UserRole.ADMIN) {
        throw new RuntimeException("ACCESSO NEGATO: Solo gli amministratori possono eliminare i commenti.");
    }

    // 3. Verifica esistenza commento
    if (!commentDAO.existsById(commentId)) {
        throw new RuntimeException("Commento non trovato con ID: " + commentId);
    }

    // 4. Esegui cancellazione
    commentDAO.deleteById(commentId);
}
    public List<Comment> getCommentsForIssue(Integer issueId) {
        return commentDAO.findByIssueId(issueId);
    }
}