package com.cs4485.group2.widgetapp.weatherapi.model;

public class CurrentWeather {
    private double temp_c;
    private int wind_kph;
    private int humidity;
    private Condition condition;

    public double getTemp_c() { return temp_c; }
    public void setTemp_c(double temp_c) { this.temp_c = temp_c; }
    public int getWind_kph() { return wind_kph; }
    public void setWind_kph(int wind_kph) { this.wind_kph = wind_kph; }
    public int getHumidity() { return humidity; }
    public void setHumidity(int humidity) { this.humidity = humidity; }
    public Condition getCondition() { return condition; }
    public void setCondition(Condition condition) { this.condition = condition; }
}
