package com.bugboard.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonProperty; // <--- Import Fondamentale


@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    // QUESTA È LA FIX: Permette di scrivere la password (in ingresso) ma non di leggerla (in uscita)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole ruolo;

    // Costruttore vuoto default
    public User() {}

    public User(String email, String password, String nomeCompleto, UserRole ruolo) {
        this.email = email;
        this.password = password;
        this.nomeCompleto = nomeCompleto;
        this.ruolo = ruolo;
    }

    // --- Getter e Setter ---

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Nota: Il getter ora è "pulito", senza @JsonIgnore, perché l'annotazione è sul campo sopra
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public UserRole getRuolo() {
        return ruolo;
    }

    public void setRuolo(UserRole ruolo) {
        this.ruolo = ruolo;
    }

    // Metodo di business
    public boolean verificaPassword(String pwd) {
        if (this.password == null) return false;
        return this.password.equals(pwd);
    }
}