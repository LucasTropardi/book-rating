package br.com.bookreview.review.client;

import br.com.bookreview.review.dto.AuthUserDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthClient {

    @Value("${auth.url:http://localhost:8041/auth/validate-token}")
    private String authUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public AuthUserDTO validarToken(String token) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", token);
            HttpEntity<Void> request = new HttpEntity<>(headers);

            ResponseEntity<AuthUserDTO> response = restTemplate.exchange(
                    authUrl,
                    HttpMethod.GET,
                    request,
                    AuthUserDTO.class
            );

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Token inválido ou serviço de autenticação indisponível.");
        }
    }
}
