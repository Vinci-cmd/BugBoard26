package com.bugboard.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class CommentDTO {
    
    @NotBlank(message = "Il testo del commento non può essere vuoto")
    private String testo;
    private Integer autoreId; // Nuovo campo fondamentale!

    @NotNull(message = "L'autore è obbligatorio")
    private Integer autoreId;

    // Costruttore vuoto (obbligatorio per Jackson)
    public CommentDTO() {}

    public CommentDTO(String testo, Integer autoreId) {
        this.testo = testo;
        this.autoreId = autoreId;
    }

    // --- Getter e Setter ---

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }

    public Integer getAutoreId() {
        return autoreId;
    }

    public void setAutoreId(Integer autoreId) {
        this.autoreId = autoreId;
    }
}