package com.cs4485.group2.widgetapp.newsapi.service;

import com.cs4485.group2.widgetapp.newsapi.model.NewsApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

@Service
public class NewsApiService {

    private final RestTemplate restTemplate;
    private final String apiKey;
    private final String baseUrl = "https://newsapi.org/v2";

    public NewsApiService(RestTemplateBuilder restTemplateBuilder,
                          @Value("${NEWSAPI_API_KEY}") String apiKey) {
        this.restTemplate = restTemplateBuilder.build();
        this.apiKey = apiKey;
    }

    /**
     * Fetches top headlines for the specified country.
     *
     * @param country the country code (e.g., "us", "gb")
     * @return the parsed response from NewsAPI
     */
    public NewsApiResponse getTopHeadlines(String country) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/top-headlines")
                .queryParam("country", country)
                .queryParam("apiKey", apiKey)
                .toUriString();
        ResponseEntity<NewsApiResponse> response = restTemplate.getForEntity(url, NewsApiResponse.class);
        return response.getBody();
    }

    /**
     * Fetches top headlines filtered by category.
     *
     * @param country  the country code (e.g., "us", "gb")
     * @param category the news category (e.g., "technology", "sports")
     * @return the parsed response from NewsAPI
     */
    public NewsApiResponse getTopHeadlinesByCategory(String country, String category) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/top-headlines")
                .queryParam("country", country)
                .queryParam("category", category)
                .queryParam("apiKey", apiKey)
                .toUriString();
        ResponseEntity<NewsApiResponse> response = restTemplate.getForEntity(url, NewsApiResponse.class);
        return response.getBody();
    }

    /**
     * Fetches headlines based on a keyword search.
     *
     * @param country the country code (e.g., "us", "gb")
     * @param keyword the search keyword
     * @return the parsed response from NewsAPI
     */
    public NewsApiResponse getHeadlinesByKeyword(String country, String keyword) {
        String url = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/top-headlines")
                .queryParam("country", country)
                .queryParam("q", keyword)
                .queryParam("apiKey", apiKey)
                .toUriString();
        ResponseEntity<NewsApiResponse> response = restTemplate.getForEntity(url, NewsApiResponse.class);
        return response.getBody();
    }

    /**
     * GET https://newsapi.org/v2/everything?[any params]&apiKey={apiKey}
     */
    public NewsApiResponse getEverything(Map<String, String> clientParams) {
        UriComponentsBuilder builder = UriComponentsBuilder
                .fromHttpUrl(baseUrl + "/everything")
                .queryParam("apiKey", apiKey);

        clientParams.forEach(builder::queryParam);

        String url = builder.toUriString();
        ResponseEntity<NewsApiResponse> response = restTemplate.getForEntity(url, NewsApiResponse.class);
        return response.getBody();
    }

}