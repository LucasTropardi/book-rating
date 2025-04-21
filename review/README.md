# Review Service - BookReview System

The **Review Service** is responsible for handling user reviews for books in the BookReview platform. It is part of a microservices architecture and integrates with the Auth Service for authentication and authorization.

## 📦 Features

- Create, update and delete reviews (requires authentication)
- List reviews by book (public)
- List all reviews (public)
- List reviews created by the authenticated user

Each review includes:
- Title
- Content
- Rating (1 to 5)
- Book ID (foreign reference)
- User login (from token)
- Creation timestamp

## 🔧 Technologies

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL (`reviewdb`)
- Bean Validation (Jakarta)
- Lombok
- REST communication with Auth Service
- Global exception handling

## ⚙️ Configuration

### `application.properties`

```properties
server.port=8043
spring.datasource.url=jdbc:postgresql://localhost:5432/reviewdb
spring.datasource.username=admin
spring.datasource.password=admin123
spring.jpa.hibernate.ddl-auto=update

auth.url=http://localhost:8041/auth/validate-token
```

---

## 📁 Project Structure

```
src/main/java/com/bookreview/review
├── controller
├── dto
│   ├── AuthUserDTO.java
│   ├── ReviewRequestDTO.java
│   └── ReviewResponseDTO.java
├── model
│   └── Review.java
├── repository
│   └── ReviewRepository.java
├── service
│   └── ReviewService.java
├── client
│   └── AuthClient.java
├── exception
│   ├── ApiException.java
│   └── GlobalExceptionHandler.java
```

---

## 🚀 API Endpoints

### `POST /reviews`
Create a review (authenticated only)

```json
{
  "titulo": "Ótimo livro!",
  "conteudo": "Gostei muito da abordagem do autor.",
  "nota": 5,
  "livroId": 1
}
```

### `PUT /reviews/{id}`
Update a review (only by its author)

### `DELETE /reviews/{id}`
Delete a review (only by its author)

### `GET /reviews`
List all reviews (public)

### `GET /reviews/book/{livroId}`
List reviews by book ID (public)

### `GET /reviews/me`
List reviews created by the authenticated user

---

## 🔐 Authorization

- Use JWT from the `auth-service`
- Token must be sent in the `Authorization` header

```
Authorization: Bearer <token>
```

- `AuthClient` validates the token using `/auth/validate-token`

---

## 🧠 Notes

- Ratings (`nota`) are integers from 1 to 5
- Book ID is stored directly as a reference to integrate with `book-service`
- Global exception handler returns consistent error responses

---
