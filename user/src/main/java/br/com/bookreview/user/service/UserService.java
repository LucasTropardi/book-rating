package br.com.bookreview.user.service;

import br.com.bookreview.user.dto.TokenValidationResponse;
import br.com.bookreview.user.dto.UpdateOwnUserDTO;
import br.com.bookreview.user.dto.UpdateUserRoleDTO;
import br.com.bookreview.user.dto.UserResponseDTO;
import br.com.bookreview.user.exception.AccessDeniedException;
import br.com.bookreview.user.model.Role;
import br.com.bookreview.user.model.User;
import br.com.bookreview.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AuthClient authClient;

    public List<UserResponseDTO> listAll() {
        return userRepository.findAll().stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getNome(),
                        user.getLogin(),
                        user.getRole(),
                        user.isAtivo()
                )).toList();
    }

    public void updateUserRole(UpdateUserRoleDTO dto) {
        User user = userRepository.findById(dto.id())
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(dto.role());
        userRepository.save(user);
    }

    public UserResponseDTO loadUserByToken(String token) {
        TokenValidationResponse result = authClient.validarToken(token);

        if (result == null || !result.valido()) {
            throw new RuntimeException("Invalid or expired token");
        }

        User user = userRepository.findByLogin(result.login())
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new UserResponseDTO(
                user.getId(),
                user.getNome(),
                user.getLogin(),
                user.getRole(),
                user.isAtivo()
        );
    }

    public void updateOwnData(String token, UpdateOwnUserDTO dto) {
        TokenValidationResponse result = authClient.validarToken(token);

        if (result == null || !result.valido()) {
            throw new AccessDeniedException("Invalid or expired token.");
        }

        User user = userRepository.findByLogin(result.login())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setNome(dto.nome());
        userRepository.save(user);
    }

    public void deleteUserById(Long id, String token) {
        validarAdmin(token);

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setAtivo(false);
        userRepository.save(user);
    }

    public void validarAdmin(String token) {
        TokenValidationResponse result = authClient.validarToken(token);

        if (result == null || !result.valido() || result.role() != Role.ADMIN) {
            throw new AccessDeniedException("You need ADMIN privileges to perform this action.");
        }
    }
}
