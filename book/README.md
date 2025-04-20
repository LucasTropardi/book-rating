# Book Service - BookReview System

The **Book Service** is responsible for managing the book catalog of the BookReview platform. It is part of a microservices architecture and communicates with the Auth Service to authenticate and authorize users.

## 📦 Features

- Publicly list all books
- Publicly retrieve book details by ID
- Admin-only: create, update, and delete books
- Each book includes:
  - Title, author, year, pages, synopsis
  - Image (stored as BLOB)
  - Creator login (from authenticated user)

## 🔧 Technologies

- Node.js with NestJS
- PostgreSQL (`bookdb`)
- TypeORM
- JWT token validation via Auth Service
- Axios (for HTTP calls)
- Class-validator for input validation

## ⚙️ Configuration

### .env or hardcoded in AppModule

```env
PORT=3000
```

```ts
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin123',
  database: 'bookdb',
  entities: [Book],
  synchronize: true,
})
```

---

## 📁 Project Structure

```
src/
├── book/
│   ├── book.controller.ts
│   ├── book.service.ts
│   ├── book.entity.ts
│   ├── dto/
│   │   ├── create-book.dto.ts
│   │   └── update-book.dto.ts
├── common/
│   └── guards/
│       ├── auth.guard.ts
│       └── admin.guard.ts
├── app.module.ts
```

---

## 🚀 API Endpoints

### `GET /books`
Returns all books (public access)

### `GET /books/:id`
Returns book by ID (public access)

### `POST /books`
Creates a new book  
**Requires:** `ADMIN` token  
**Body:**
```json
{
  "titulo": "Clean Code",
  "autor": "Robert C. Martin",
  "anoLancamento": 2008,
  "qtdPaginas": 464,
  "sinopse": "A book on writing better code",
  "imagem": "<base64 string>"
}
```

### `PUT /books/:id`
Updates a book  
**Requires:** `ADMIN`

### `DELETE /books/:id`
Deletes a book  
**Requires:** `ADMIN`

---

## 🔐 Authorization

- `GET` endpoints: public
- `POST`, `PUT`, `DELETE`: require valid JWT token from the Auth Service
- Token must be sent in the `Authorization` header:
```
Authorization: Bearer <token>
```

---

## 🧩 Integration with Auth Service

The service calls `http://localhost:8041/auth/validate-token` to validate tokens and extract user roles and login info.

---

## 🧠 Notes

- The book image is stored as a binary BLOB in PostgreSQL (`bytea`)
- Images are returned as base64 in GET responses
- Each book keeps track of the user who created it (`criadoPor`)

---
