package com.cs4485.group2.widgetapp.alphavantage.controller;

import com.cs4485.group2.widgetapp.alphavantage.model.AlphaVantageResponse;
import com.cs4485.group2.widgetapp.alphavantage.service.AlphaVantageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AlphaVantageController {

    private final AlphaVantageService alphaVantageService;

    public AlphaVantageController(AlphaVantageService alphaVantageService) {
        this.alphaVantageService = alphaVantageService;
    }

    /**
     * Endpoint to get daily stock data.
     * Example: GET /stock-data?symbol=AAPL
     */
    @GetMapping("/stock-data")
    public AlphaVantageResponse getDailyStockData(@RequestParam String symbol) {
        return alphaVantageService.getDailyStockData(symbol);
    }
}
