package com.cs4485.group2.widgetapp.weatherapi.config;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.MapPropertySource;

import java.util.HashMap;
import java.util.Map;

public class WeatherDotenvInitializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {

    @Override
    public void initialize(ConfigurableApplicationContext applicationContext) {
        Dotenv dotenv = Dotenv.configure()
                .ignoreIfMissing()
                .load();

        Map<String, Object> map = new HashMap<>();
        map.put("WEATHERAPI_API_KEY", dotenv.get("WEATHERAPI_API_KEY"));

        MapPropertySource propertySource = new MapPropertySource("dotenvWeatherProperties", map);
        applicationContext.getEnvironment().getPropertySources().addFirst(propertySource);
    }
}
