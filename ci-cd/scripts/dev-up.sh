#!/bin/bash

echo "Starting all services in development mode..."

echo "▶ Starting auth-service..."
(cd auth && ./mvnw spring-boot:run) &

echo "▶ Starting user-service..."
(cd user && ./mvnw spring-boot:run) &

echo "▶ Starting review-service..."
(cd review && ./mvnw spring-boot:run) &

echo "▶ Starting book-service..."
(cd book && npm install && npm run start:dev) &

echo "▶ Starting frontend..."
(cd frontend && npm install && npm run dev) &

wait
