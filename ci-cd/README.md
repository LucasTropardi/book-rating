# 📦 CI/CD and Local Dev Scripts for BookReview System

This folder contains resources to automate the continuous integration and development processes for the **BookReview Microservices System**.

## 📁 Structure

```plaintext
ci-cd/
├── Jenkinsfile         # Jenkins declarative pipeline for building all services
├── README.md           # This file
└── scripts/
    └── dev-up.sh       # Script to run all services in dev mode (local)
```

---

## 🔧 Jenkins Pipeline (`Jenkinsfile`)

The `Jenkinsfile` builds all microservices:

- `auth`, `user`, `review`: Spring Boot
- `book`: NestJS
- `frontend`: React + Vite

It runs `mvnw clean package` and `npm run build` to compile each service for production.

You can configure Jenkins to use this file:
1. Create a new Pipeline job.
2. Set Git SCM with your repository URL.
3. Set script path to: `ci-cd/Jenkinsfile`

---

## 🧪 Local Dev Script (`scripts/dev-up.sh`)

Use this script to start all services in **development mode**:

```bash
./ci-cd/scripts/dev-up.sh
```

This will:
- Start each backend service using `spring-boot:run` or `npm run start:dev`
- Start the frontend using `npm run dev`
- All services run concurrently and logs are printed in your terminal

Make sure you give execution permission first:

```bash
chmod +x ci-cd/scripts/dev-up.sh
```


## 🔗 Useful References

- [Jenkins Pipeline Syntax](https://www.jenkins.io/doc/book/pipeline/syntax/)
