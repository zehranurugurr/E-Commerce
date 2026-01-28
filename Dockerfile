# Multi-stage build for fullstack E-Commerce

# 1) Frontend build stage
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY store-ui/package*.json ./
RUN npm install
COPY store-ui/ ./
RUN npm run build

# 2) Backend build stage (Maven + JDK 17)
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY store/ ./
RUN mvn clean package -DskipTests

# 3) Final runtime stage (JRE 17)
FROM eclipse-temurin:17-jre
WORKDIR /app

# Backend jar
COPY --from=backend-build /app/target/*.jar app.jar

COPY --from=frontend-build /app/build ./static
COPY --from=frontend-build /app/dist ./static

EXPOSE 8080

# Render PORT + Spring static
CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080} --spring.web.resources.static-locations=file:/app/static/"]


