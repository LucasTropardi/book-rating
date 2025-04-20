package br.com.bookreview.auth.controller;

import br.com.bookreview.auth.dto.AuthRequest;
import br.com.bookreview.auth.dto.AuthResponse;
import br.com.bookreview.auth.dto.RegisterRequest;
import br.com.bookreview.auth.dto.TokenValidationResponse;
import br.com.bookreview.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.authenticate(request));
    }

    @GetMapping("/validate-token")
    public ResponseEntity<TokenValidationResponse> validateToken(@RequestHeader("Authorization") String header) {
        if (header == null || !header.startsWith("Bearer ")) {
            return ResponseEntity.badRequest().build();
        }

        String token = header.substring(7); // remove "Bearer "
        return ResponseEntity.ok(authService.validarToken(token));
    }
}
