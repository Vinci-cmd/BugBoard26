package com.bugboard.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String testo;

    @Column(name = "data_ora")
    private LocalDateTime dataOra;

    // Relazione: Un commento appartiene a una Issue
    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    private Issue issue;

    // Relazione: Un commento è scritto da un Autore
    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    public Comment() {
        this.dataOra = LocalDateTime.now();
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTesto() { return testo; }
    public void setTesto(String testo) { this.testo = testo; }

    public LocalDateTime getDataOra() { return dataOra; }
    public void setDataOra(LocalDateTime dataOra) { this.dataOra = dataOra; }

    public Issue getIssue() { return issue; }
    public void setIssue(Issue issue) { this.issue = issue; }

    public User getAutore() { return autore; }
    public void setAutore(User autore) { this.autore = autore; }
}