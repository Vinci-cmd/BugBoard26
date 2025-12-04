package com.bugboard.dto;

import com.bugboard.model.IssueType;
import com.bugboard.model.IssuePriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class IssueDTO {

    @NotBlank(message = "Il titolo è obbligatorio")
    @Size(min = 1, max = 1000, message = "Il titolo deve avere tra 5 e 100 caratteri")
    private String titolo;

    @NotBlank(message = "La descrizione è obbligatoria")
    @Size(min = 1, message = "La descrizione deve essere di almeno 10 caratteri")
    private String descrizione;
    
    @NotNull(message = "Il tipo è obbligatorio")
    private IssueType tipo;
    
    // La priorità può essere null (gestita nel service o opzionale), se vuoi renderla obbligatoria aggiungi @NotNull
    private IssuePriority priorita;

    @NotNull(message = "L'ID autore è obbligatorio")
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