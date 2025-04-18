package com.cs4485.group2.widgetapp.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class DotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        Map<String, Object> map = new HashMap<>();
        map.put("NEWSAPI_API_KEY", dotenv.get("NEWSAPI_API_KEY"));
        map.put("WEATHERAPI_API_KEY", dotenv.get("WEATHERAPI_API_KEY"));
        map.put("ALPHAVANTAGE_API_KEY", dotenv.get("ALPHAVANTAGE_API_KEY"));
        map.put("LASTFM_API_KEY", dotenv.get("LASTFM_API_KEY"));

        MapPropertySource propertySource = new MapPropertySource("dotenvProperties", map);
        applicationContext.getEnvironment().getPropertySources().addFirst(propertySource);
    }
}