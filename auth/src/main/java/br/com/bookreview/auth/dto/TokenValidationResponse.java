package br.com.bookreview.auth.dto;

import br.com.bookreview.auth.model.Role;

public record TokenValidationResponse(
        boolean valido,
        String login,
        Role role
) {}