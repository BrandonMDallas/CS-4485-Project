package com.cs4485.group2.widgetapp;

import com.cs4485.group2.widgetapp.newsapi.config.DotenvInitializer;
import com.cs4485.group2.widgetapp.weatherapi.config.WeatherDotenvInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class WidgetappApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(WidgetappApplication.class);
		app.addInitializers(new DotenvInitializer());
		app.addInitializers(new WeatherDotenvInitializer());
		app.run(args);
	}

}
