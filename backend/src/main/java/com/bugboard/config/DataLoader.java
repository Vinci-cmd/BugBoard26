package com.bugboard.config;

import com.bugboard.dao.UserDAO;
import com.bugboard.model.User;
import com.bugboard.model.UserRole;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserDAO userDAO;

    @Override
    public void run(String... args) throws Exception {
        // Controllo se esiste almeno un utente nel DB
        if (userDAO.count() == 0) {
            System.out.println("--- BOOTSTRAP: Creazione del Primo Admin ---");
            
            User admin = new User();
            admin.setEmail("admin@bugboard.com");
            admin.setPassword("admin123"); // In produzione usare BCrypt!
            admin.setNomeCompleto("Super Administrator");
            admin.setRuolo(UserRole.ADMIN);

            userDAO.save(admin);
            
            System.out.println("--- BOOTSTRAP: Admin creato (admin@bugboard.com / admin123) ---");
        }
    }
}