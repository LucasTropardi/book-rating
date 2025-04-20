# Auth Service - BookReview System

The **Auth Service** is responsible for user authentication in the BookReview system. It is part of a microservices architecture and serves as the central service for handling login, JWT token generation, and token validation for other services.

## 📦 Features

- User registration
- User authentication (login)
- JWT token generation
- JWT token validation (used by other services)

## 🔧 Technologies

- Java 21
- Spring Boot 3.4
- Spring Web
- Spring Security (for encoding only)
- Spring Data JPA
- PostgreSQL
- Lombok
- JWT (`jjwt`)
- Maven

## ⚙️ Configuration

### application.properties

```properties
server.port=8041
spring.application.name=auth

spring.datasource.url=jdbc:postgresql://localhost:5432/authdb
spring.datasource.username=admin
spring.datasource.password=admin123

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

jwt.secret=minha-chave-secreta-12345678901234567890123456789012
jwt.expiration=86400000
```

> **Note:** Make sure the JWT secret has at least 32 characters.

---

## 🚀 API Endpoints

### `POST /auth/register`
Registers a new user with default role `USER`.

**Request Body:**
```json
{
  "nome": "Maria Silva",
  "login": "maria",
  "senha": "123456"
}
```

---

### `POST /auth/login`
Authenticates a user and returns a JWT token.

**Request Body:**
```json
{
  "login": "maria",
  "senha": "123456"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9..."
}
```

---

### `GET /auth/validate-token`
Validates a JWT token (used by other services to authorize users).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "valido": true,
  "login": "maria",
  "role": "USER"
}
```

---

## 📁 Project Structure

```
src/main/java/com/bookreview/auth
├── controller
├── dto
├── exception
├── model
├── repository
├── security
├── service
└── util
```

---

## 🗃️ Database

This service uses a PostgreSQL database (`authdb`) with a single table: `users`.

**Example schema:**
- `id` (Long)
- `nome` (String)
- `login` (String, unique)
- `senha` (String, encrypted)
- `role` (Enum: USER or ADMIN)
- `ativo` (boolean)

---
