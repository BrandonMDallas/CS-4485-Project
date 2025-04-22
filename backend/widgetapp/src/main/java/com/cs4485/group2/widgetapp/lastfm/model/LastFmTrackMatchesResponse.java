package com.cs4485.group2.widgetapp.lastfm.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public class LastFmTrackMatchesResponse {
    private Results results;

    public Results getResults() { return results; }
    public void setResults(Results results) { this.results = results; }

    public static class Results {
        private TrackMatches trackmatches;
        public TrackMatches getTrackmatches() { return trackmatches; }
        public void setTrackmatches(TrackMatches trackmatches) { this.trackmatches = trackmatches; }
    }

    public static class TrackMatches {
        @JsonProperty("track")
        private List<LastFmTrackMatch> track;
        public List<LastFmTrackMatch> getTrack() { return track; }
        public void setTrack(List<LastFmTrackMatch> track) { this.track = track; }
    }
}
