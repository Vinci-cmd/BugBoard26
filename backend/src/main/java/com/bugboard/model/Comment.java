package com.bugboard.model;

import com.fasterxml.jackson.annotation.JsonIgnore; // <--- Import Fondamentale!
import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String testo;

    @Column(name = "data_ora")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataOra;

    // --- RELAZIONI ---

    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    @JsonIgnore // <--- QUESTA è la riga magica.
    // Impedisce a Spring di stampare di nuovo tutta la Issue dentro il commento,
    // rompendo il loop infinito (Issue -> Commenti -> Issue...)
    private Issue issue;

    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    // --- COSTRUTTORI ---

    public Comment() {
        this.dataOra = new Date(); // Imposta data corrente alla creazione
    }

    // --- GETTERS E SETTERS ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public Date getDataOra() {
        return dataOra;
    }

    public void setDataOra(Date dataOra) {
        this.dataOra = dataOra;
    }

    public Issue getIssue() {
        return issue;
    }

    public void setIssue(Issue issue) {
        this.issue = issue;
    }

    public User getAutore() {
        return autore;
    }

    public void setAutore(User autore) {
        this.autore = autore;
    }
}