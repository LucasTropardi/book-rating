package br.com.bookreview.user.service;

import br.com.bookreview.user.dto.TokenValidationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AuthClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String authUrl = "http://localhost:8041/auth/validate-token";

    public TokenValidationResponse validarToken(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", token);
        HttpEntity<Void> entity = new HttpEntity<>(headers);

        ResponseEntity<TokenValidationResponse> response =
                restTemplate.exchange(authUrl, HttpMethod.GET, entity, TokenValidationResponse.class);

        return response.getBody();
    }
}
