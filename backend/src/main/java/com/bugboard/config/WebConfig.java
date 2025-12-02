package com.bugboard.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry; // Importante
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 1. Configurazione CORS Globale (Risolve il problema "Blocked by CORS policy")
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Vale per TUTTI gli endpoint
                .allowedOrigins("http://localhost:5173") // Permetti al frontend React di chiamare il backend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

    // 2. Configurazione Immagini (già presente)
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}