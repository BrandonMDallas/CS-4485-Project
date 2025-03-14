package com.cs4485.group2.widgetapp.weatherapi.model;

public class WeatherApiResponse {
    private Location location;
    private CurrentWeather current;

    public Location getLocation() {
        return location;
    }
    public void setLocation(Location location) {
        this.location = location;
    }
    public CurrentWeather getCurrent() {
        return current;
    }
    public void setCurrent(CurrentWeather current) {
        this.current = current;
    }
}
