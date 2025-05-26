@echo off
echo Starting auth-service...
start powershell -NoExit -Command "cd auth; ./mvnw spring-boot:run"

echo Starting user-service...
start powershell -NoExit -Command "cd user; ./mvnw spring-boot:run"

echo Starting review-service...
start powershell -NoExit -Command "cd review; ./mvnw spring-boot:run"

echo Starting book-service (NestJS)...
start powershell -NoExit -Command "cd book; npm install; npm run start:dev"

echo Starting frontend (Vite)...
start powershell -NoExit -Command "cd frontend; npm install; npm run dev"

echo All services launched in new PowerShell terminals.
