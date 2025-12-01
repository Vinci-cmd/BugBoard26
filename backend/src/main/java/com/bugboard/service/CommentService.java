package com.bugboard.service;

import com.bugboard.dao.CommentDAO;
import com.bugboard.dao.IssueDAO;
import com.bugboard.dao.UserDAO;
import com.bugboard.model.Comment;
import com.bugboard.model.Issue;
import com.bugboard.model.User;
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

    public Comment addComment(Long issueId, String testo) {
        // 1. Recupera la Issue
        Issue issue = issueDAO.findById(issueId)
                .orElseThrow(() -> new RuntimeException("Issue non trovata con ID: " + issueId));

        // 2. Recupera l'Autore (TRUCCO STUDENTE B: sempre ID 1 per ora)
        // TODO: Sostituire con l'utente loggato quando ci sarà la security
        User autore = userDAO.findById(1)
                .orElseThrow(() -> new RuntimeException("Utente default (ID 1) non trovato!"));

        // 3. Crea il Commento
        Comment comment = new Comment();
        comment.setTesto(testo);
        comment.setDataOra(new Date()); // Imposta data corrente
        comment.setIssue(issue);
        comment.setAutore(autore);

        return commentDAO.save(comment);
    }

    public List<Comment> getCommentsForIssue(Integer issueId) {
        return commentDAO.findByIssueId(issueId);
    }
}