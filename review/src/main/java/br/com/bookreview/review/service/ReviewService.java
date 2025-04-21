package br.com.bookreview.review.service;

import br.com.bookreview.review.dto.ReviewRequestDTO;
import br.com.bookreview.review.dto.ReviewResponseDTO;
import br.com.bookreview.review.model.Review;
import br.com.bookreview.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import br.com.bookreview.review.exception.ApiException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    public ReviewResponseDTO create(ReviewRequestDTO dto, String login) {
        Review review = Review.builder()
                .titulo(dto.titulo())
                .conteudo(dto.conteudo())
                .nota(dto.nota())
                .livroId(dto.livroId())
                .usuarioLogin(login)
                .dataCriacao(LocalDateTime.now())
                .build();

        return toDTO(reviewRepository.save(review));
    }

    public ReviewResponseDTO update(Long id, ReviewRequestDTO dto, String login) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Review not found"));

        if (!review.getUsuarioLogin().equals(login)) {
            throw new ApiException("You can only edit your own reviews.", HttpStatus.FORBIDDEN);
        }

        review.setTitulo(dto.titulo());
        review.setConteudo(dto.conteudo());
        review.setNota(dto.nota());
        review.setLivroId(dto.livroId());

        return toDTO(reviewRepository.save(review));
    }

    public void delete(Long id, String login, String role) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ApiException("Review not found", HttpStatus.NOT_FOUND));

        boolean isOwner = review.getUsuarioLogin().equals(login);
        boolean isAdmin = "ADMIN".equalsIgnoreCase(role);

        if (!isOwner && !isAdmin) {
            throw new ApiException("You do not have permission to delete this review.", HttpStatus.FORBIDDEN);
        }

        reviewRepository.delete(review);
    }

    public List<ReviewResponseDTO> getAll() {
        return reviewRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public List<ReviewResponseDTO> getAllByLivro(Long livroId) {
        return reviewRepository.findByLivroId(livroId).stream()
                .map(this::toDTO)
                .toList();
    }

    public List<ReviewResponseDTO> getByUsuario(String login) {
        return reviewRepository.findByUsuarioLogin(login).stream()
                .map(this::toDTO)
                .toList();
    }

    private ReviewResponseDTO toDTO(Review review) {
        return new ReviewResponseDTO(
                review.getId(),
                review.getTitulo(),
                review.getConteudo(),
                review.getNota(),
                review.getLivroId(),
                review.getUsuarioLogin(),
                review.getDataCriacao()
        );
    }
}
