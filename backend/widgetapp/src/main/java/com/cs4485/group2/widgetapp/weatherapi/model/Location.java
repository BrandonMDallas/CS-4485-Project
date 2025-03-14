package com.cs4485.group2.widgetapp.weatherapi.model;

public class Location {
    private String name;
    private String region;
    private String country;
    private double lat;
    private double lon;
    private String tz_id;
    private String localtime;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getRegion() { return region; }
    public void setRegion(String region) { this.region = region; }
    public String getCountry() { return country; }
    public void setCountry(String country) { this.country = country; }
    public double getLat() { return lat; }
    public void setLat(double lat) { this.lat = lat; }
    public double getLon() { return lon; }
    public void setLon(double lon) { this.lon = lon; }
    public String getTz_id() { return tz_id; }
    public void setTz_id(String tz_id) { this.tz_id = tz_id; }
    public String getLocaltime() { return localtime; }
    public void setLocaltime(String localtime) { this.localtime = localtime; }
}
