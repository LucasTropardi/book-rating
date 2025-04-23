# 📚 BookReview Front-End

This project is the front-end application for **BookReview**, a platform where users can explore books and submit reviews. The system is built with **React + TypeScript + Vite**, and styled using **Tailwind CSS** with Flowbite components. It includes authentication, user roles, and full integration with the back-end API.

---

## 🚀 Tech Stack

- ⚛️ React + TypeScript + Vite
- 🎨 Tailwind CSS + Flowbite
- 🔒 JWT Stateless Authentication
- 📦 Axios for API integration
- 🧠 Context API (Auth)
- 🌟 Phosphor Icons
- 🛠 ESLint with type-checking rules

---

## 🔐 Authentication

- Stateless login with JWT token
- Token is stored in `localStorage`
- Auth context (`AuthContext`) handles login/logout, user state, and admin detection
- Admin-only routes and UI elements are dynamically shown based on role

---

## 👤 User Features

- Register a new account
- Login and logout
- Browse all books in a public **ranking list**
- Click a book to open a **modal with details and average review score**
- Submit a new review if logged in (modal form with title, content, and star rating)
- See all reviews for a selected book
- Review submission form includes an interactive star-rating selector
- If not logged in, clicking “Add Review” redirects to login

---

## 👑 Admin Features

- Access **Users Management Page**
  - List all users
  - Change a user’s role (`USER` or `ADMIN`)
  - Logically delete users (deactivation)
- Access **Books Management Page**
  - List all books
  - Create new book (modal form with cover image upload)
  - Edit existing book
  - Delete book

---

## 🖼️ Image Handling

- Book cover images are sent as Base64 and rendered inline
- Upload preview is shown before submission

---

## 📂 Folder Structure

```
src/
├── components/         // UI components like BookCard, ReviewFormModal, Layout, etc.
├── context/            // AuthContext for authentication state
├── pages/              // Page views: Home, Login, Register, Admin pages
├── services/           // API calls: authService, reviewService, bookService, userService
├── utils/              // Helpers (e.g., JWT decode)
```

---

## 📌 How to Run

```bash
# Install dependencies
npm install

# Run the dev server
npm run dev
```

---

## 🔗 API Integration

The front-end communicates with 3 main services:

| Service         | Port | Description                   |
|-----------------|------|-------------------------------|
| `auth-service`  | 8041 | Handles login and registration|
| `user-service`  | 8042 | Admin management of users     |
| `book-service`  | 3000 | Book management and reviews   |
| `review-service`| 8043 | Review management             |

> Each request uses JWT sent in the `Authorization` header.

---

## ✅ Features Checklist

- [x] JWT login and token storage
- [x] Review submission modal with star rating
- [x] Book details modal
- [x] Admin user management
- [x] Admin book management with image support
- [x] Responsive UI with Tailwind and Flowbite

---

## 📄 License

This project is for educational purposes and not yet licensed for commercial use.
