# Multi-stage build for fullstack E-Commerce

# Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY store-ui/package*.json ./
RUN npm install
COPY store-ui/ ./
RUN npm run build

# Backend build stage
FROM openjdk:17-jdk-slim AS backend-build
WORKDIR /app
RUN apt-get update && apt-get install -y maven && rm -rf /var/lib/apt/lists/*
COPY store/ ./
RUN mvn clean package -DskipTests

# Final runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy built backend jar
COPY --from=backend-build /app/target/*.jar app.jar

# Copy built frontend to serve as static files
COPY --from=frontend-build /app/build ./static

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
