# BookReview System - Microservices Architecture

This is the main repository for the **BookReview System**, a full-stack project built using a microservices architecture. It allows users to register, browse books, and leave reviews. Admins can manage books and moderate the system.

---

## 📦 Modules

### 🧩 Backend Microservices

| Service       | Description                                  | Port  |
|---------------|----------------------------------------------|--------|
| `auth-service` | Handles user authentication and JWT tokens  | 8041   |
| `user-service` | Manages user registration and roles         | 8042   |
| `book-service` | Manages books catalog with images (BLOB)    | 3000   |
| `review-service` | Handles reviews per book and user         | 8043   |

Each service runs independently, with its own database and responsibilities.

---

### 💻 Frontend

The frontend (to be added) will be developed using **React + TypeScript** and will consume the APIs provided by the services above.

---

## 🧠 Technologies Used

- Spring Boot (Java 21)
- NestJS (Node.js + TypeScript)
- PostgreSQL
- Docker (optional for future containers)
- Axios for inter-service communication
- JWT for stateless authentication
- Class-validator / Bean Validation

---

## 🚀 How to Run Locally

1. Ensure PostgreSQL is running with databases:
   - `authdb`, `userdb`, `bookdb`, `reviewdb`

2. Run each backend module individually:
   - `cd auth/ && ./mvnw spring-boot:run`
   - `cd user/ && ./mvnw spring-boot:run`
   - `cd book/ && npm run start:dev`
   - `cd review/ && ./mvnw spring-boot:run`

3. Frontend (coming soon):
   - `cd frontend/ && npm run dev`

---

## 🧪 Testing the APIs

You can use Postman or Insomnia to test the endpoints from each service.
- Authenticate via `auth-service`
- Pass the token to other requests via the `Authorization` header.

---

## 📁 Structure Overview

```
bookreview/
├── auth/           # Spring Boot - Authentication
├── user/           # Spring Boot - User management
├── book/           # NestJS - Book catalog
├── review/         # Spring Boot - Review system
├── frontend/       # React app (to be added)
├── README.md       # This file
```

---