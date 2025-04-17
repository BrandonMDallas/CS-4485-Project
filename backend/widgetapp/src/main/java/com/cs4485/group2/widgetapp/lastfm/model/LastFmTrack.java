package com.cs4485.group2.widgetapp.lastfm.model;

public class LastFmTrack {
    private String name;
    private Artist artist;
    private String url;

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Artist getArtist() { return artist; }
    public void setArtist(Artist artist) { this.artist = artist; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public static class Artist {
        private String name;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
    }
}