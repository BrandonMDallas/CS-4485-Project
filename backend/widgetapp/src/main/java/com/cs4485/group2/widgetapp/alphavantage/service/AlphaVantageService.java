package com.cs4485.group2.widgetapp.alphavantage.service;

import com.cs4485.group2.widgetapp.alphavantage.model.AlphaVantageResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AlphaVantageService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl = "https://www.alphavantage.co/query";

    public AlphaVantageService(RestTemplateBuilder restTemplateBuilder,
                               @Value("${ALPHAVANTAGE_API_KEY}") String apiKey) {
        this.restTemplate = restTemplateBuilder.build();
        this.apiKey = apiKey;
    }

    /**
     * Fetches daily time series stock data for the specified symbol.
     *
     * @param symbol the stock symbol (e.g., "AAPL", "IBM")
     * @return the parsed response from Alpha Vantage
     */
    public AlphaVantageResponse getDailyStockData(String symbol) {
        String function = "TIME_SERIES_DAILY";
        String url = String.format("%s?function=%s&symbol=%s&apikey=%s", baseUrl, function, symbol, apiKey);
        ResponseEntity<AlphaVantageResponse> response = restTemplate.getForEntity(url, AlphaVantageResponse.class);
        return response.getBody();
    }
}
