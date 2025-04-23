# BookReview System - Microservices Architecture

This is the main repository for the **BookReview System**, a full-stack project built using a microservices architecture. It allows users to register, browse books, and leave reviews. Admins can manage books and users.

---

## 📦 Modules

### 🧩 Backend Microservices

| Service         | Description                                  | Port  |
|-----------------|----------------------------------------------|--------|
| `auth-service`  | Handles user authentication and JWT tokens   | 8041   |
| `user-service`  | Manages user registration and roles          | 8042   |
| `book-service`  | Manages books catalog with images (BLOB)     | 3000   |
| `review-service`| Handles reviews per book and user            | 8043   |

Each service runs independently with its own database.

---

### 💻 Frontend - React + TypeScript

The frontend is developed with **React, TypeScript, Vite, Tailwind CSS**, and uses **Axios** for API consumption. It offers:

#### 🧑‍💻 User Features
- 📖 Public home page displaying books and average ratings.
- 🔍 Book details modal with all reviews.
- ⭐ Authenticated users can submit new reviews from the book modal using a popup form.
- 🔐 Stateless login and registration with JWT (stored in `localStorage`).
- ⚙️ Personal data editing for logged users.
- 🔓 Unauthenticated users are prompted to log in before reviewing.

#### 🛠️ Admin Features
- 👤 Admin role can view and manage users (change role and deactivate).
- 📚 Admin can manage books (add, edit, delete) via a modal form.
- All admin features are protected based on role from the token.

---

## 🧠 Technologies Used

- Spring Boot (Java 21)
- NestJS (Node.js + TypeScript)
- PostgreSQL
- React + TypeScript + Vite + Tailwind CSS
- Axios
- JWT (stateless auth)
- Form validation with react-hook-form

---

## 🚀 How to Run Locally

1. Ensure PostgreSQL is running with the following databases:
   - `authdb`, `userdb`, `bookdb`, `reviewdb`

2. Run backend modules individually:
   ```bash
   cd auth/ && ./mvnw spring-boot:run
   cd user/ && ./mvnw spring-boot:run
   cd book/ && npm run start:dev
   cd review/ && ./mvnw spring-boot:run
   ```

3. Run frontend:
   ```bash
   cd frontend/
   npm install
   npm run dev
   ```

---

## 🧪 Testing the APIs

Use tools like Postman or Insomnia:
- Authenticate via `auth-service`
- Use the returned JWT in the `Authorization` header for requests to `user`, `book`, and `review` services.

---

## 📁 Structure Overview

```
bookreview/
├── auth/           # Spring Boot - Authentication
├── user/           # Spring Boot - User management
├── book/           # NestJS - Book catalog with images
├── review/         # Spring Boot - Review system
├── frontend/       # React + Vite + Tailwind frontend
├── README.md       # This file
```