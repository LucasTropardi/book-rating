package br.com.bookreview.review.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "reviews")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String conteudo;

    @Column(nullable = false)
    private Integer nota; // 1 a 5

    @Column(nullable = false)
    private Long livroId;

    @Column(nullable = false)
    private String usuarioLogin;

    private LocalDateTime dataCriacao;
}
