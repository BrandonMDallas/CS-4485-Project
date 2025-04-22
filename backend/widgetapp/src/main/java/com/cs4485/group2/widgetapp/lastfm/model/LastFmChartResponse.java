package com.cs4485.group2.widgetapp.lastfm.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class LastFmChartResponse {
    private Tracks tracks;

    public Tracks getTracks() { return tracks; }
    public void setTracks(Tracks tracks) { this.tracks = tracks; }

    public static class Tracks {
        @JsonProperty("track")
        private List<LastFmTrack> track;

        public List<LastFmTrack> getTrack() { return track; }
        public void setTrack(List<LastFmTrack> track) { this.track = track; }
    }
}
