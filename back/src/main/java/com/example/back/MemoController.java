package com.example.back;

import java.util.List;
import java.util.Map;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * 프론트와 API 사이의 중간 계층입니다.
 * DB를 직접 보지 않고 api 서비스를 호출합니다.
 */
@RestController
@RequestMapping("/api/memos")
public class MemoController {

    private final WebClient apiClient;

    public MemoController(WebClient apiClient) {
        this.apiClient = apiClient;
    }

    @GetMapping
    public List<Map<String, Object>> list() {
        return apiClient.get()
                .uri("/memos")
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<List<Map<String, Object>>>() {})
                .block();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> create(@RequestBody Map<String, String> body) {
        return apiClient.post()
                .uri("/memos")
                .bodyValue(body)
                .retrieve()
                .bodyToMono(new ParameterizedTypeReference<Map<String, Object>>() {})
                .block();
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        apiClient.delete()
                .uri("/memos/{id}", id)
                .retrieve()
                .toBodilessEntity()
                .block();
    }
}
