package com.example.back;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${api.base-url}")
    private String apiBaseUrl;

    /** 프론트는 브라우저에서 돌기 때문에 CORS 허용이 필요합니다. */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "DELETE", "OPTIONS");
    }

    @Bean
    public WebClient apiClient(WebClient.Builder builder) {
        return builder.baseUrl(apiBaseUrl).build();
    }
}
