package com.cs4485.group2.widgetapp.alphavantage.controller;

import com.cs4485.group2.widgetapp.alphavantage.model.AlphaVantageResponse;
import com.cs4485.group2.widgetapp.alphavantage.model.SymbolSearchResponse;
import com.cs4485.group2.widgetapp.alphavantage.service.AlphaVantageService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/alphavantage")
public class AlphaVantageController {

    private final AlphaVantageService alphaVantageService;

    public AlphaVantageController(AlphaVantageService alphaVantageService) {
        this.alphaVantageService = alphaVantageService;
    }

    /**
     * Endpoint to get daily stock data.
     * Example: GET /api/alphavantage/stock-data?symbol=AAPL
     */
    @GetMapping("/stock-data")
    public AlphaVantageResponse getDailyStockData(@RequestParam String symbol) {
        return alphaVantageService.getDailyStockData(symbol);
    }

    /**
     * Endpoint to get daily cryptocurrency data.
     * Example: GET /api/alphavantage/crypto-data?symbol=BTC&market=USD
     */
    @GetMapping("/crypto-data")
    public AlphaVantageResponse getDailyCryptoData(@RequestParam String symbol, @RequestParam String market) {
        return alphaVantageService.getDailyCryptoData(symbol, market);
    }

    /**
     * Endpoint to get daily forex data.
     * Example: GET /api/alphavantage/forex-data?from=EUR&to=USD
     */
    @GetMapping("/forex-data")
    public AlphaVantageResponse getDailyForexData(@RequestParam("from") String fromCurrency,
                                                  @RequestParam("to") String toCurrency) {
        return alphaVantageService.getDailyForexData(fromCurrency, toCurrency);
    }

    /**
     * Endpoint to get commodity data.
     * Example: GET /api/alphavantage/commodity-data?symbol=WTI
     */
    @GetMapping("/commodity-data")
    public AlphaVantageResponse getCommodityData(@RequestParam String symbol) {
        return alphaVantageService.getCommodityData(symbol);
    }

    /**
     * Endpoint to search tickers by keyword.
     * Example: GET /api/alphavantage/symbol-search?keywords=apple
     */
    @GetMapping("/symbol-search")
    public SymbolSearchResponse symbolSearch(@RequestParam String keywords) {
        return alphaVantageService.searchSymbols(keywords);
    }
}
