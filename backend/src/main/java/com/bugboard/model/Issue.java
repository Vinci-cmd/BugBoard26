package com.bugboard.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Table(name = "issues")
public class Issue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String titolo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descrizione;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private IssueStatus stato = IssueStatus.TODO; // Default come da SQL

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private IssueType tipo;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private IssuePriority priorita;

    @Column(name = "data_creazione")
    private LocalDateTime dataCreazione;

    @Column(name = "percorso_allegato")
    private String percorsoAllegato;

    // Relazione Molti-a-Uno: Molte issue possono essere scritte da un utente
    @ManyToOne
    @JoinColumn(name = "autore_id", nullable = false) // Chiave esterna verso users
    private User autore;

    // Costruttore vuoto
    public Issue() {
        this.dataCreazione = LocalDateTime.now(); // Imposta data corrente alla creazione
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitolo() { return titolo; }
    public void setTitolo(String titolo) { this.titolo = titolo; }

    public String getDescrizione() { return descrizione; }
    public void setDescrizione(String descrizione) { this.descrizione = descrizione; }

    public IssueStatus getStato() { return stato; }
    public void setStato(IssueStatus stato) { this.stato = stato; }

    public IssueType getTipo() { return tipo; }
    public void setTipo(IssueType tipo) { this.tipo = tipo; }

    public IssuePriority getPriorita() { return priorita; }
    public void setPriorita(IssuePriority priorita) { this.priorita = priorita; }

    public LocalDateTime getDataCreazione() { return dataCreazione; }
    public void setDataCreazione(LocalDateTime dataCreazione) { this.dataCreazione = dataCreazione; }

    public String getPercorsoAllegato() { return percorsoAllegato; }
    public void setPercorsoAllegato(String percorsoAllegato) { this.percorsoAllegato = percorsoAllegato; }

    public User getAutore() { return autore; }
    public void setAutore(User autore) { this.autore = autore; }
}