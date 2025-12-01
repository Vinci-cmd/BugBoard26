package com.bugboard.dto;

public class LoginRequest {

    // Campi privati per incapsulamento
    private String email;
    private String password;

    // 1. Costruttore vuoto (ESSENZIALE per Jackson/JSON parsing)
    public LoginRequest() {
    }

    // 2. Costruttore con parametri (Utile per i tuoi test unitari)
    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }

    // 3. Getter e Setter (Jackson li usa per leggere/scrivere i campi)
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
