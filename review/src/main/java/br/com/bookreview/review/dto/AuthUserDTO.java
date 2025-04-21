package br.com.bookreview.review.dto;

public record AuthUserDTO(
        boolean valido,
        String login,
        String role
) {}
