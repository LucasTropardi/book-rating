package br.com.bookreview.user.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    private Long id;

    private String nome;

    @Column(unique = true)
    private String login;

    @Enumerated(EnumType.STRING)
    private Role role;

    private boolean ativo;
}

