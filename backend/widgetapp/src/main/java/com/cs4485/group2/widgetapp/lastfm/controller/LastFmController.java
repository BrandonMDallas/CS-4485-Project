package com.cs4485.group2.widgetapp.lastfm.controller;

import com.cs4485.group2.widgetapp.lastfm.model.LastFmTrackMatch;
import com.cs4485.group2.widgetapp.lastfm.model.TrendingSong;
import com.cs4485.group2.widgetapp.lastfm.service.LastFmService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/lastfm")
public class LastFmController {

    private final LastFmService lastFmService;

    public LastFmController(LastFmService lastFmService) {
        this.lastFmService = lastFmService;
    }

    @GetMapping("/top-tracks")
    public List<TrendingSong> topTracks() {
        var chart = lastFmService.getTopTracks();
        var tracks = chart.getTracks().getTrack();
        List<TrendingSong> list = new ArrayList<>();
        for (int i = 0; i < tracks.size(); i++) {
            var t = tracks.get(i);
            list.add(new TrendingSong(
                    i + 1,
                    t.getName(),
                    t.getArtist().getName(),
                    "N/A",
                    t.getUrl()
            ));
        }
        return list;
    }

    @GetMapping("/search")
    public List<TrendingSong> searchTracks(@RequestParam("query") String query) {
        var resp = lastFmService.searchTracks(query);
        List<LastFmTrackMatch> matches = resp.getResults().getTrackmatches().getTrack();
        return IntStream.range(0, matches.size())
                .mapToObj(i -> {
                    var m = matches.get(i);
                    return new TrendingSong(
                            i + 1,
                            m.getName(),
                            m.getArtist(),
                            "N/A",
                            m.getUrl()
                    );
                })
                .collect(Collectors.toList());
    }
}