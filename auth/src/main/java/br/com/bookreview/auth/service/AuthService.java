package br.com.bookreview.auth.service;

import br.com.bookreview.auth.dto.AuthRequest;
import br.com.bookreview.auth.dto.AuthResponse;
import br.com.bookreview.auth.dto.RegisterRequest;
import br.com.bookreview.auth.dto.TokenValidationResponse;
import br.com.bookreview.auth.model.Role;
import br.com.bookreview.auth.model.User;
import br.com.bookreview.auth.repository.UserRepository;
import br.com.bookreview.auth.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public void register(RegisterRequest request) {
        var user = User.builder()
                .nome(request.nome())
                .login(request.login())
                .senha(passwordEncoder.encode(request.senha()))
                .role(Role.USER)
                .ativo(true)
                .build();

        userRepository.save(user);
    }

    public AuthResponse authenticate(AuthRequest request) {
        var user = userRepository.findByLogin(request.login())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        if (!passwordEncoder.matches(request.senha(), user.getSenha())) {
            throw new RuntimeException("Credenciais inválidas");
        }

        var token = jwtUtil.generateToken(user.getLogin(), user.getRole());
        return new AuthResponse(token);
    }

    public TokenValidationResponse validarToken(String token) {
        boolean valido = jwtUtil.isValidToken(token);

        if (!valido) {
            return new TokenValidationResponse(false, null, null);
        }

        String login = jwtUtil.getLoginFromToken(token);
        Role role = jwtUtil.getRoleFromToken(token);

        return new TokenValidationResponse(true, login, role);
    }
}
