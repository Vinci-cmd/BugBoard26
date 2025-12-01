package com.bugboard.model;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // UML: id: int

    @Column(nullable = false, columnDefinition = "TEXT")
    private String testo;

    @Column(name = "data_ora")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataOra;

    // Relazione inversa Issue "1" *-- "0..*" Comment
    @ManyToOne
    @JoinColumn(name = "issue_id", nullable = false)
    private Issue issue;

    // Relazione User "1" --> "0..*" Comment : scrive
    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    public Comment() {
        this.dataOra = new Date();
    }

    // --- Metodi del Diagramma UML ---

    public Integer getId() {
        return id;
    }

    public String getTesto() {
        return testo;
    }

    // --- Altri Getter e Setter standard ---
    public void setId(Integer id) { this.id = id; }
    public void setTesto(String testo) { this.testo = testo; }
    public Date getDataOra() { return dataOra; }
    public void setDataOra(Date dataOra) { this.dataOra = dataOra; }
    public Issue getIssue() { return issue; }
    public void setIssue(Issue issue) { this.issue = issue; }
    public User getAutore() { return autore; }
    public void setAutore(User autore) { this.autore = autore; }
}