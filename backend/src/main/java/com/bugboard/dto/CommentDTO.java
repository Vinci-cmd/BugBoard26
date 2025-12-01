package com.bugboard.dto;

public class CommentDTO {
    private String testo;

    public CommentDTO() {}

    public CommentDTO(String testo) {
        this.testo = testo;
    }

    public String getTesto() {
        return testo;
    }

    public void setTesto(String testo) {
        this.testo = testo;
    }
}