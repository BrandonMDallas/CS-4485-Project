package com.cs4485.group2.widgetapp.alphavantage.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Map;

public class SymbolSearchResponse {

    @JsonProperty("bestMatches")
    private List<Map<String, String>> bestMatches;

    public List<Map<String, String>> getBestMatches() {
        return bestMatches;
    }

    public void setBestMatches(List<Map<String, String>> bestMatches) {
        this.bestMatches = bestMatches;
    }
}
