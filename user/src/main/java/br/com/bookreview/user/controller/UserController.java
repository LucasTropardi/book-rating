package br.com.bookreview.user.controller;

import br.com.bookreview.user.dto.UpdateOwnUserDTO;
import br.com.bookreview.user.dto.UpdateUserRoleDTO;
import br.com.bookreview.user.dto.UserResponseDTO;
import br.com.bookreview.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(@RequestHeader("Authorization") String token) {
        userService.validarAdmin(token);
        return ResponseEntity.ok(userService.listAll());
    }

    @PutMapping("/role")
    public ResponseEntity<Void> updateUserRole(
            @RequestHeader("Authorization") String token,
            @RequestBody UpdateUserRoleDTO dto
    ) {
        userService.validarAdmin(token);
        userService.updateUserRole(dto);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/me")
    public ResponseEntity<UserResponseDTO> getLoggedUser(@RequestHeader("Authorization") String token) {
        return ResponseEntity.ok(userService.loadUserByToken(token));
    }

    @PutMapping("/me")
    public ResponseEntity<Void> updateOwnUser(
            @RequestHeader("Authorization") String token,
            @RequestBody UpdateOwnUserDTO dto
    ) {
        userService.updateOwnData(token, dto);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(
            @PathVariable Long id,
            @RequestHeader("Authorization") String token
    ) {
        userService.deleteUserById(id, token);
        return ResponseEntity.ok().build();
    }
}
