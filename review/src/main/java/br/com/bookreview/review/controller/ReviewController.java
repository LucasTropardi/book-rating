package br.com.bookreview.review.controller;

import br.com.bookreview.review.client.AuthClient;
import br.com.bookreview.review.dto.AuthUserDTO;
import br.com.bookreview.review.dto.ReviewRequestDTO;
import br.com.bookreview.review.dto.ReviewResponseDTO;
import br.com.bookreview.review.exception.ApiException;
import br.com.bookreview.review.service.ReviewService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;
    private final AuthClient authClient;

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> create(
            @RequestHeader("Authorization") String token,
            @RequestBody @Valid ReviewRequestDTO dto) {

        AuthUserDTO user = authClient.validarToken(token);
        if (!user.valido()) throw new ApiException("Invalid token", HttpStatus.UNAUTHORIZED);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(reviewService.create(dto, user.login()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ReviewResponseDTO> update(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id,
            @RequestBody @Valid ReviewRequestDTO dto) {

        AuthUserDTO user = authClient.validarToken(token);
        if (!user.valido()) throw new ApiException("Invalid token", HttpStatus.UNAUTHORIZED);

        return ResponseEntity.ok(reviewService.update(id, dto, user.login()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {

        AuthUserDTO user = authClient.validarToken(token);
        if (!user.valido()) throw new ApiException("Invalid token", HttpStatus.UNAUTHORIZED);

        reviewService.delete(id, user.login(), user.role());
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<ReviewResponseDTO>> getAll() {
        return ResponseEntity.ok(reviewService.getAll());
    }

    @GetMapping("/book/{livroId}")
    public ResponseEntity<List<ReviewResponseDTO>> getByBook(@PathVariable Long livroId) {
        return ResponseEntity.ok(reviewService.getAllByLivro(livroId));
    }

    @GetMapping("/me")
    public ResponseEntity<List<ReviewResponseDTO>> getMyReviews(
            @RequestHeader("Authorization") String token) {

        AuthUserDTO user = authClient.validarToken(token);
        if (!user.valido()) throw new ApiException("Invalid token", HttpStatus.UNAUTHORIZED);

        return ResponseEntity.ok(reviewService.getByUsuario(user.login()));
    }
}
