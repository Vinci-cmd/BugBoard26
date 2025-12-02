package com.bugboard.model;

import jakarta.persistence.*;
import java.util.Date;
import java.util.List;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String titolo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descrizione;

    @Column(name = "data_creazione")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCreazione;

    // Campo legacy per percorso file (opzionale se usi BLOB, ma lo lascio per sicurezza)
    @Column(name = "percorso_allegato")
    private String percorsoAllegato;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueStatus stato = IssueStatus.TODO;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private IssueType tipo;

    @Enumerated(EnumType.STRING)
    private IssuePriority priorita;

    // --- GESTIONE ALLEGATO (BLOB) ---
    
    @Lob 
    @Column(name = "allegato", columnDefinition = "BYTEA") 
    private byte[] allegato; 

    @Column(name = "nome_file_allegato")
    private String nomeFileAllegato;

    // --- RELAZIONI ---

    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    // --- COSTRUTTORI ---

    public Issue() {
        this.dataCreazione = new Date();
    }

    // --- GETTERS E SETTERS ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitolo() {
        return titolo;
    }

    public void setTitolo(String titolo) {
        this.titolo = titolo;
    }

    public String getDescrizione() {
        return descrizione;
    }

    public void setDescrizione(String descrizione) {
        this.descrizione = descrizione;
    }

    public Date getDataCreazione() {
        return dataCreazione;
    }

    public void setDataCreazione(Date dataCreazione) {
        this.dataCreazione = dataCreazione;
    }

    public IssueStatus getStato() {
        return stato;
    }

    public void setStato(IssueStatus stato) {
        this.stato = stato;
    }

    public IssueType getTipo() {
        return tipo;
    }

    public void setTipo(IssueType tipo) {
        this.tipo = tipo;
    }

    public IssuePriority getPriorita() {
        return priorita;
    }

    public void setPriorita(IssuePriority priorita) {
        this.priorita = priorita;
    }

    public User getAutore() {
        return autore;
    }

    public void setAutore(User autore) {
        this.autore = autore;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }
    
    public byte[] getAllegato() {
        return allegato;
    }

    public void setAllegato(byte[] allegato) {
        this.allegato = allegato;
    }

    public String getNomeFileAllegato() {
        return nomeFileAllegato;
    }

    public void setNomeFileAllegato(String nomeFileAllegato) {
        this.nomeFileAllegato = nomeFileAllegato;
    }

    public String getPercorsoAllegato() {
        return percorsoAllegato;
    }

    public void setPercorsoAllegato(String percorsoAllegato) {
        this.percorsoAllegato = percorsoAllegato;
    }
}