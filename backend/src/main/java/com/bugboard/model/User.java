package com.bugboard.model;

import jakarta.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; // UML: id: int

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "nome_completo", nullable = false)
    private String nomeCompleto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole ruolo;

    // Relazioni (Non esplicitate negli attributi del UML ma derivate dalle frecce)
    // Utile per il mapping, ma non obbligatorio se non serve la navigazione inversa.
    // Per ora le ometto per attenermi strettamente agli attributi del rettangolo UML,
    // ma JPA le gestisce tramite le classi figlie.

    public User() {}

    public User(String email, String password, String nomeCompleto, UserRole ruolo) {
        this.email = email;
        this.password = password;
        this.nomeCompleto = nomeCompleto;
        this.ruolo = ruolo;
    }

    // --- Metodi del Diagramma UML ---

    public Integer getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    /**
     * Metodo richiesto esplicitamente dal Diagramma UML
     */
    public boolean verificaPassword(String pwd) {
        if (this.password == null) return false;
        // Nota: In produzione si userebbe BCrypt, qui confronto stringhe come da traccia didattica
        return this.password.equals(pwd);
    }

    // --- Altri Getter e Setter necessari per il framework ---
    public void setId(Integer id) { this.id = id; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getNomeCompleto() { return nomeCompleto; }
    public void setNomeCompleto(String nomeCompleto) { this.nomeCompleto = nomeCompleto; }
    public UserRole getRuolo() { return ruolo; }
    public void setRuolo(UserRole ruolo) { this.ruolo = ruolo; }
}