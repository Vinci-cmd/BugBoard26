package com.bugboard.dto;

import com.bugboard.model.IssueType;
import com.bugboard.model.IssuePriority;

public class IssueDTO {

    private String titolo;
    private String descrizione;
    
    // Usiamo gli Enum direttamente per sfruttare la conversione automatica di Spring
    private IssueType tipo;
    private IssuePriority priorita;

    // Questo campo serve per dire "Chi ha creato la issue"
    // Nel UML non è esplicitato nel rettangolo, ma è necessario per la logica del Service
    private Integer autoreId;

    // Costruttore vuoto (Necessario per la deserializzazione JSON)
    public IssueDTO() {
    }

    // Costruttore completo (Opzionale, ma comodo per i test)
    public IssueDTO(String titolo, String descrizione, IssueType tipo, IssuePriority priorita, Integer autoreId) {
        this.titolo = titolo;
        this.descrizione = descrizione;
        this.tipo = tipo;
        this.priorita = priorita;
        this.autoreId = autoreId;
    }

    // --- Getters e Setters ---

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

    public Integer getAutoreId() {
        return autoreId;
    }

    public void setAutoreId(Integer autoreId) {
        this.autoreId = autoreId;
    }
}