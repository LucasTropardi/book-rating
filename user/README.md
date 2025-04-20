# User Service - BookReview System

The **User Service** is responsible for managing user information in the BookReview system. It is part of a microservices architecture and works in coordination with the [Auth Service](../auth) to provide secure, role-based access to user data.

## 📦 Features

- List all registered users (admin only)
- Change the role of a user (admin only)
- Get and update the profile of the currently authenticated user
- Logically delete a user (admin only)

## 🔧 Technologies

- Java 21
- Spring Boot 3.4
- Spring Web
- Spring Data JPA
- PostgreSQL
- Lombok
- Bean Validation
- RestTemplate (to communicate with Auth Service)

## ⚙️ Configuration

### application.properties

```properties
server.port=8042
spring.application.name=user

spring.datasource.url=jdbc:postgresql://localhost:5432/authdb
spring.datasource.username=admin
spring.datasource.password=admin123

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

> ✅ This service **uses the same database as the Auth Service** (`authdb`), since the user data is registered there.

---

## 🔐 Authorization

All endpoints require a valid JWT token. The token must be included in the `Authorization` header as follows:

```
Authorization: Bearer <token>
```

The token is validated via a request to the `auth-service` endpoint `/auth/validate-token`.

---

## 📁 Project Structure

```
src/main/java/com/bookreview/user
├── controller         // REST endpoints
├── dto                // Data Transfer Objects
├── exception          // Custom exceptions & global handler
├── model              // JPA entities
├── repository         // Spring Data repositories
├── service            // Business logic
```

---

## 🚀 API Endpoints

### `GET /users`

Returns a list of all users.  
**Requires:** `ADMIN` role

---

### `PUT /users/role`

Updates a user's role.  
**Requires:** `ADMIN` role

#### Request Body:
```json
{
  "id": 1,
  "role": "ADMIN"
}
```

---

### `GET /users/me`

Returns information about the authenticated user.

#### Response:
```json
{
  "id": 2,
  "nome": "Maria Leitor",
  "login": "maria",
  "role": "USER",
  "ativo": true
}
```

---

### `PUT /users/me`

Updates the authenticated user's own profile.

**Requires:** `USER` or `ADMIN`

#### Request Body:
```json
{
  "nome": "Novo Nome"
}
```

---

### `DELETE /users/{id}`

Logically deletes a user (sets `ativo = false`).

**Requires:** `ADMIN` role

---

## ❌ Error Handling

All errors are returned in a consistent format. Example for forbidden access:

```json
{
  "timestamp": "2025-04-20T17:35:38.1153293",
  "status": 403,
  "error": "Forbidden",
  "message": "You need ADMIN privileges to perform this action.",
  "path": "/users"
}
```

---

## 🧩 Integration

- This service **does not handle authentication itself**.
- It delegates token validation to the `auth-service` via `GET /auth/validate-token`.

---

