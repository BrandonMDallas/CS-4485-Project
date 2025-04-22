package com.cs4485.group2.widgetapp.lastfm.model;

public class TrendingSong {
    private int id;
    private String name;
    private String artist;
    private String duration;
    private String url;

    public TrendingSong(int id, String name, String artist, String duration, String url) {
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.duration = duration;
        this.url = url;
    }
    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getArtist() {
        return artist;
    }

    public String getDuration() {
        return duration;
    }

    public String getUrl() {
        return url;
    }
}
