package com.bugboard.dto;

public class CommentDTO {
    private String testo;
    private Integer autoreId; // Fondamentale: Chi sta scrivendo?

    // Costruttori, Getters e Setters
    public CommentDTO() {}

    public String getTesto() { return testo; }
    public void setTesto(String testo) { this.testo = testo; }

    public Integer getAutoreId() { return autoreId; }
    public void setAutoreId(Integer autoreId) { this.autoreId = autoreId; }
}