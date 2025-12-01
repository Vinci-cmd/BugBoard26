package com.bugboard.model;

import jakarta.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "users") // Mappa la tabella 'users' del tuo SQL
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "nome_completo", nullable = false, length = 100)
    private String nomeCompleto;

    @Enumerated(EnumType.STRING) // Salva la stringa "ADMIN" o "USER" nel DB
    @Column(nullable = false, length = 20)
    private UserRole ruolo;

    // Costruttore vuoto (Richiesto da JPA)
    public User() {}

    // Costruttore utile
    public User(String email, String password, String nomeCompleto, UserRole ruolo) {
        this.email = email;
        this.password = password;
        this.nomeCompleto = nomeCompleto;
        this.ruolo = ruolo;
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }

    public UserRole getRuolo() { return ruolo; }
    public void setRuolo(UserRole ruolo) { this.ruolo = ruolo; }
    
    // Equals e HashCode (Best practice per le entità)
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}