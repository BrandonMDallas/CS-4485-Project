package com.cs4485.group2.widgetapp;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class ApiKeyLoadTest {
    @Value("${newsapi.api.key}")
    private String apiKey;

    @Test
    public void testApiKeyLoaded() {
        // Verify that the API key is loaded (not null or empty)
        assertThat(apiKey)
                .as("The API key should be loaded from environment variables or .env file")
                .isNotNull()
                .isNotEmpty();

        System.out.println("Loaded API Key: " + apiKey);
    }
}
