package br.com.bookreview.review.dto;

import java.time.LocalDateTime;

public record ReviewResponseDTO(
        Long id,
        String titulo,
        String conteudo,
        Integer nota,
        Long livroId,
        String usuarioLogin,
        LocalDateTime dataCriacao
) {}
