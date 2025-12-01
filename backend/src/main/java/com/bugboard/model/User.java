package com.bugboard.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore; // <--- NUOVO IMPORT
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole ruolo;

    public User() {}

    public User(String email, String password, String nomeCompleto, UserRole ruolo) {
        this.email = email;
        this.password = password;
        this.nomeCompleto = nomeCompleto;
        this.ruolo = ruolo;
    }

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public boolean verificaPassword(String pwd) {
        if (this.password == null) return false;
        return this.password.equals(pwd);
    }

    public void setId(Integer id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }

    // --- MODIFICA DI SICUREZZA ---
    // Questo impedisce che la password venga inviata nel JSON di risposta al frontend
    @JsonIgnore 
    public String getPassword() { 
        return password; 
    }

    public void setPassword(String password) { this.password = password; }
    
    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }
    
    public UserRole getRuolo() { return ruolo; }
    public void setRuolo(UserRole ruolo) { this.ruolo = ruolo; }
}