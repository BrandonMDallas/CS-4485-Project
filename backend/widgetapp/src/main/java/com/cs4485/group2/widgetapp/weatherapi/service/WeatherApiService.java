package com.cs4485.group2.widgetapp.weatherapi.service;

import com.cs4485.group2.widgetapp.weatherapi.model.WeatherApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherApiService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl = "http://api.weatherapi.com/v1/current.json";

    public WeatherApiService(RestTemplateBuilder restTemplateBuilder,
                             @Value("${WEATHERAPI_API_KEY}") String apiKey) {
        this.restTemplate = restTemplateBuilder.build();
        this.apiKey = apiKey;
    }

    /**
     * Fetches the current weather for the specified location.
     *
     * @param location the location query (e.g., "London", "New York")
     * @return the parsed weather API response
     */
    public WeatherApiResponse getCurrentWeather(String location) {
        String url = String.format("%s?key=%s&q=%s", baseUrl, apiKey, location);
        ResponseEntity<WeatherApiResponse> response = restTemplate.getForEntity(url, WeatherApiResponse.class);
        return response.getBody();
    }
}
