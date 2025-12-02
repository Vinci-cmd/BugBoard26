package com.bugboard.service;

import com.bugboard.dao.UserDAO;
import com.bugboard.dto.LoginRequest;
import com.bugboard.model.User;
import com.bugboard.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {

    private final UserDAO userDAO;

    @Autowired
    public AuthService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User login(LoginRequest request) {
        // (Codice Login invariato...)
        Optional<User> userOpt = userDAO.findByEmail(request.getEmail());
        if (userOpt.isEmpty()) return null;
        User user = userOpt.get();
        if (user.verificaPassword(request.getPassword())) return user;
        return null;
    }

    /**
     * Crea un nuovo utente.
     * Richiede l'ID dell'admin che sta eseguendo l'operazione.
     */
    public void createUser(User newUser, Integer adminId) {
        // 1. Verifica CHI sta facendo la richiesta
        User admin = userDAO.findById(adminId)
                .orElseThrow(() -> new RuntimeException("Admin non trovato (ID: " + adminId + ")"));

        // 2. Controllo dei permessi (Role-Based Access Control - RBAC Manuale)
        if (admin.getRuolo() != UserRole.ADMIN) {
            throw new RuntimeException("ACCESSO NEGATO: Solo gli admin possono creare utenti.");
        }

        // 3. Controllo duplicati
        if (userDAO.existsByEmail(newUser.getEmail())) {
            throw new RuntimeException("Email già registrata nel sistema");
        }

        // 4. Salvataggio (ruolo obbligatorio)
        if (newUser.getRuolo() == null) {
            newUser.setRuolo(UserRole.USER);
        }
        
        userDAO.save(newUser);
    }
}