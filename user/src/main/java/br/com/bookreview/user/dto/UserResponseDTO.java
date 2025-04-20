package br.com.bookreview.user.dto;

import br.com.bookreview.user.model.Role;

public record UserResponseDTO(
        Long id,
        String nome,
        String login,
        Role role,
        boolean ativo
) {}
