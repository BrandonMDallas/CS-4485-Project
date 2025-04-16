package com.cs4485.group2.widgetapp.lastfm.service;

import com.cs4485.group2.widgetapp.lastfm.model.LastFmChartResponse;
import com.cs4485.group2.widgetapp.lastfm.model.LastFmTrackMatchesResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;

import java.nio.charset.StandardCharsets;

@Service
public class LastFmService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl = "https://ws.audioscrobbler.com/2.0/";

    public LastFmService(RestTemplateBuilder restTemplateBuilder,
                         @Value("${LASTFM_API_KEY}") String apiKey) {
        this.restTemplate = restTemplateBuilder.build();
        this.apiKey = apiKey;
    }

    /**
     * Fetches the current top tracks chart from Last.fm.
     *
     * @return parsed LastFmChartResponse
     */
    public LastFmChartResponse getTopTracks() {
        String url = String.format(
                "%s?method=chart.gettoptracks&api_key=%s&format=json",
                baseUrl, apiKey
        );
        ResponseEntity<LastFmChartResponse> response =
                restTemplate.getForEntity(url, LastFmChartResponse.class);
        return response.getBody();
    }

    /**
     * Search for tracks by name.
     */
    public LastFmTrackMatchesResponse searchTracks(String query) {
        String url = String.format(
                "%s?method=track.search&track=%s&api_key=%s&format=json",
                baseUrl,
                UriUtils.encode(query, StandardCharsets.UTF_8),
                apiKey
        );
        return restTemplate.getForObject(url, LastFmTrackMatchesResponse.class);
    }
}
