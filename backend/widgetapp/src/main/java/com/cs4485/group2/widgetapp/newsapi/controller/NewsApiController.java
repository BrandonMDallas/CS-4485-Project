package com.cs4485.group2.widgetapp.newsapi.controller;

import com.cs4485.group2.widgetapp.newsapi.model.NewsApiResponse;
import com.cs4485.group2.widgetapp.newsapi.service.NewsApiService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NewsApiController {

    private final NewsApiService newsApiService;

    public NewsApiController(NewsApiService newsApiService) {
        this.newsApiService = newsApiService;
    }

    /**
     * Endpoint to get top headlines.
     * Example: GET /top-headlines?country=us
     */
    @GetMapping("/top-headlines")
    public NewsApiResponse getTopHeadlines(@RequestParam(defaultValue = "us") String country) {
        return newsApiService.getTopHeadlines(country);
    }

    /**
     * Endpoint to get top headlines filtered by category.
     * Example: GET /top-headlines/category?country=us&category=technology
     */
    @GetMapping("/top-headlines/category")
    public NewsApiResponse getTopHeadlinesByCategory(@RequestParam(defaultValue = "us") String country,
                                                     @RequestParam String category) {
        return newsApiService.getTopHeadlinesByCategory(country, category);
    }

    /**
     * Endpoint to get headlines by keyword search.
     * Example: GET /top-headlines/search?country=us&keyword=bitcoin
     */
    @GetMapping("/top-headlines/search")
    public NewsApiResponse getHeadlinesByKeyword(@RequestParam(defaultValue = "us") String country,
                                                 @RequestParam String keyword) {
        return newsApiService.getHeadlinesByKeyword(country, keyword);
    }
}