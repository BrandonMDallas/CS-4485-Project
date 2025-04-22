package com.cs4485.group2.widgetapp.alphavantage.service;

import com.cs4485.group2.widgetapp.alphavantage.model.AlphaVantageResponse;
import com.cs4485.group2.widgetapp.alphavantage.model.SymbolSearchResponse;
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

    /**
     * Fetches daily cryptocurrency data using Alpha Vantage’s DIGITAL_CURRENCY_DAILY function.
     * @param symbol Cryptocurrency symbol (e.g., "BTC")
     * @param market Market currency (e.g., "USD")
     */
    public AlphaVantageResponse getDailyCryptoData(String symbol, String market) {
        String function = "DIGITAL_CURRENCY_DAILY";
        String url = String.format("%s?function=%s&symbol=%s&market=%s&apikey=%s", baseUrl, function, symbol, market, apiKey);
        ResponseEntity<AlphaVantageResponse> response = restTemplate.getForEntity(url, AlphaVantageResponse.class);
        return response.getBody();
    }

    /**
     * Fetches daily forex data using Alpha Vantage’s FX_DAILY function.
     * @param fromCurrency Base currency (e.g., "EUR")
     * @param toCurrency Target currency (e.g., "USD")
     */
    public AlphaVantageResponse getDailyForexData(String fromCurrency, String toCurrency) {
        String function = "FX_DAILY";
        String url = String.format("%s?function=%s&from_symbol=%s&to_symbol=%s&apikey=%s", baseUrl, function, fromCurrency, toCurrency, apiKey);
        ResponseEntity<AlphaVantageResponse> response = restTemplate.getForEntity(url, AlphaVantageResponse.class);
        return response.getBody();
    }

    /**
     * Fetches commodity data. In this example we reuse the TIME_SERIES_DAILY function,
     * assuming the symbol represents a commodity (e.g., "WTI").
     * Adjust the function if your commodity provider requires a different endpoint.
     * @param symbol Commodity symbol
     */
    public AlphaVantageResponse getCommodityData(String symbol) {
        String function = "TIME_SERIES_DAILY";
        String url = String.format("%s?function=%s&symbol=%s&apikey=%s", baseUrl, function, symbol, apiKey);
        ResponseEntity<AlphaVantageResponse> response = restTemplate.getForEntity(url, AlphaVantageResponse.class);
        return response.getBody();
    }

    /**
     * Searches for symbols via AlphaVantage’s SYMBOL_SEARCH endpoint.
     * @param keywords ticker or company name fragment
     */
    public SymbolSearchResponse searchSymbols(String keywords) {
        String function = "SYMBOL_SEARCH";
        String url = String.format(
                "%s?function=%s&keywords=%s&apikey=%s",
                baseUrl, function, keywords, apiKey
        );
        ResponseEntity<SymbolSearchResponse> resp =
                restTemplate.getForEntity(url, SymbolSearchResponse.class);
        return resp.getBody();
    }
}
