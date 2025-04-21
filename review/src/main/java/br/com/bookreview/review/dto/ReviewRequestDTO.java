package br.com.bookreview.review.dto;

import jakarta.validation.constraints.*;

public record ReviewRequestDTO(
        @NotBlank String titulo,
        @NotBlank String conteudo,
        @Min(1) @Max(5) Integer nota,
        @NotNull Long livroId
) {}
