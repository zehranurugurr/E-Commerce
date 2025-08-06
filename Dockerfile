# Multi-stage build for fullstack E-Commerce app

# Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY store-ui/package*.json ./
RUN npm ci --only=production
COPY store-ui/ ./
RUN npm run build

# Backend build stage
FROM maven:3.8.6-openjdk-17-slim AS backend-build
WORKDIR /app/backend
COPY store/pom.xml ./
RUN mvn dependency:go-offline
COPY store/ ./
RUN mvn clean package -DskipTests

# Runtime stage
FROM openjdk:17-jdk-slim
WORKDIR /app

# Copy the built backend jar
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy the built frontend to serve as static files
COPY --from=frontend-build /app/frontend/build ./static

# Create a non-root user
RUN addgroup --system spring && adduser --system spring --ingroup spring
RUN chown -R spring:spring /app
USER spring

# Expose the port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=30s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# Start the application
CMD ["java", "-jar", "-Xmx512m", "-Dserver.port=8080", "app.jar"]
