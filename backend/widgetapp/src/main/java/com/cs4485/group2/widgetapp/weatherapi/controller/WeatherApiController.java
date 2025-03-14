package com.cs4485.group2.widgetapp.weatherapi.controller;

import com.cs4485.group2.widgetapp.weatherapi.model.WeatherApiResponse;
import com.cs4485.group2.widgetapp.weatherapi.service.WeatherApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WeatherApiController {

    private final WeatherApiService weatherApiService;

    public WeatherApiController(WeatherApiService weatherApiService) {
        this.weatherApiService = weatherApiService;
    }

    /**
     * Endpoint to get current weather information.
     * Example: GET /current-weather?location=London
     */
    @GetMapping("/current-weather")
    public WeatherApiResponse getCurrentWeather(@RequestParam(defaultValue = "London") String location) {
        return weatherApiService.getCurrentWeather(location);
    }
}
