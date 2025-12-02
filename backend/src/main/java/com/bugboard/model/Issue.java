package com.bugboard.model;

import jakarta.persistence.*;
import java.util.Date; // UML dice Date
import java.util.List;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // UML: id: int

    @Column(nullable = false)
    private String titolo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descrizione;

    @Column(name = "data_creazione")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCreazione;

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

    // Relazione dal diagramma: User "1" --> "0..*" Issue : crea
    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false)
    private User autore;

    // Relazione dal diagramma: Issue "1" *-- "0..*" Comment : contiene
    // (Cascade ALL perché è una composizione forte nel diagramma)
    @OneToMany(mappedBy = "issue", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;
@Lob // Specifica che è un oggetto grande (Large Object)
    @Column(name = "allegato", columnDefinition = "LONGBLOB") // Usa "BYTEA" se usi PostgreSQL, "LONGBLOB" per MySQL/H2
    private byte[] allegato; 

    // AGGIUNGI ANCHE QUESTO (utile per il frontend):
    @Column(name = "nome_file_allegato")
    private String nomeFileAllegato;

    // ... getter e setter per i nuovi campi ...
    public byte[] getAllegato() { return allegato; }
    public void setAllegato(byte[] allegato) { this.allegato = allegato; }

    public String getNomeFileAllegato() { return nomeFileAllegato; }
    public void setNomeFileAllegato(String nomeFileAllegato) { this.nomeFileAllegato = nomeFileAllegato; }
    
    public Issue() {
        this.dataCreazione = new Date(); // Imposta data corrente
    }

    // --- Metodi del Diagramma UML ---

    public Integer getId() {
        return id;
    }

    public String getTitolo() {
        return titolo;
    }

    public IssueStatus getStato() {
        return stato;
    }

    // --- Altri Getter e Setter standard ---
    public void setId(Integer id) { this.id = id; }
    public void setTitolo(String titolo) { this.titolo = titolo; }
    public String getDescrizione() { return descrizione; }
    public void setDescrizione(String descrizione) { this.descrizione = descrizione; }
    public Date getDataCreazione() { return dataCreazione; }
    public void setDataCreazione(Date dataCreazione) { this.dataCreazione = dataCreazione; }
    public String getPercorsoAllegato() { return percorsoAllegato; }
    public void setPercorsoAllegato(String percorsoAllegato) { this.percorsoAllegato = percorsoAllegato; }
    public void setStato(IssueStatus stato) { this.stato = stato; }
    public IssueType getTipo() { return tipo; }
    public void setTipo(IssueType tipo) { this.tipo = tipo; }
    public IssuePriority getPriorita() { return priorita; }
    public void setPriorita(IssuePriority priorita) { this.priorita = priorita; }
    public User getAutore() { return autore; }
    public void setAutore(User autore) { this.autore = autore; }
    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }
}