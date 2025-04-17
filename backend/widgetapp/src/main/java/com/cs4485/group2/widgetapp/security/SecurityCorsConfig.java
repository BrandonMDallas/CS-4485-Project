package com.cs4485.group2.widgetapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityCorsConfig {

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Allow your frontend origin
        configuration.addAllowedOrigin("http://localhost:5173");
        // Allow all HTTP methods (GET, POST, PUT, DELETE, OPTIONS, etc.)
        configuration.addAllowedMethod("*");
        // Allow all headers
        configuration.addAllowedHeader("*");
        // Allow credentials if needed (if not, set to false)
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}