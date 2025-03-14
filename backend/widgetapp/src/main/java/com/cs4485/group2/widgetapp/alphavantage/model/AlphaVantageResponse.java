package com.cs4485.group2.widgetapp.alphavantage.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.Map;

public class AlphaVantageResponse {

    @JsonProperty("Meta Data")
    private Map<String, Object> metaData;

    @JsonProperty("Time Series (Daily)")
    private Map<String, Map<String, String>> timeSeries;

    public Map<String, Object> getMetaData() {
        return metaData;
    }

    public void setMetaData(Map<String, Object> metaData) {
        this.metaData = metaData;
    }

    public Map<String, Map<String, String>> getTimeSeries() {
        return timeSeries;
    }

    public void setTimeSeries(Map<String, Map<String, String>> timeSeries) {
        this.timeSeries = timeSeries;
    }
}
