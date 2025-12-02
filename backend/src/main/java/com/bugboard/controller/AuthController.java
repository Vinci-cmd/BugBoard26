package com.bugboard.controller;

import com.bugboard.dto.LoginRequest;
import com.bugboard.model.User;
import com.bugboard.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // (Invariato...)
        User user = authService.login(request);
        if (user != null) return ResponseEntity.ok(user);
        return ResponseEntity.status(401).body("Email o password errati");
    }

    /**
     * Endpoint per la Creazione Utenti (Protetto logicamente).
     * Esempio chiamata: POST /auth/create-user?adminId=1
     * Body: { "email": "...", "password": "...", "nomeCompleto": "...", "ruolo": "USER" }
     */
    @PostMapping("/create-user")
    public ResponseEntity<?> createUser(
            @RequestBody User newUser, 
            @RequestParam Integer adminId) { // <--- Parametro critico
        try {
            authService.createUser(newUser, adminId);
            return ResponseEntity.status(201).body("Utente creato con successo dall'Admin.");
        } catch (RuntimeException e) {
            // Gestisce sia "Accesso Negato" che "Email duplicata"
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}