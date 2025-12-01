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

    /**
     * Gestisce il login dell'utente.
     */
    public User login(LoginRequest request) {
        Optional<User> userOpt = userDAO.findByEmail(request.getEmail());

        if (userOpt.isEmpty()) {
            return null;
        }

        User user = userOpt.get();

        if (user.verificaPassword(request.getPassword())) {
            return user;
        }

        return null;
    }

    /**
     * Registra un nuovo utente nel sistema.
     */
    public void register(User user) {
        // 1. Controllo se l'email esiste già
        if (userDAO.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email già registrata nel sistema");
        }

        // 2. Imposta il ruolo di default se non presente
        if (user.getRuolo() == null) {
            user.setRuolo(UserRole.USER);
        }

        // 3. Salva l'utente
        userDAO.save(user);
    }
}