package br.com.bookreview.user.dto;

import br.com.bookreview.user.model.Role;

public record UpdateUserRoleDTO(
        Long id,
        Role role
) {}

