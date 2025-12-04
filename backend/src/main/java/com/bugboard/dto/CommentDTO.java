package com.bugboard.dto;

public class CommentDTO {
    
    private String testo;
    private Integer autoreId; // Nuovo campo fondamentale!

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