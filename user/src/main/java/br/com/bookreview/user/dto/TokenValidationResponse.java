package br.com.bookreview.user.dto;

import br.com.bookreview.user.model.Role;

public record TokenValidationResponse(
        boolean valido,
        String login,
        Role role
) {}

