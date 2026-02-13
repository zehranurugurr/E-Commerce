# Multi-stage build for fullstack E-Commerce

FROM node:18-alpine AS frontend-build
WORKDIR /app

COPY store-ui/package*.json ./
RUN npm ci

COPY store-ui/ ./
RUN npm run build

RUN if [ -d "/app/dist/store-ui/browser" ]; then \
      cp -R /app/dist/store-ui/browser /app/out; \
    elif [ -d "/app/dist/store-ui" ]; then \
      cp -R /app/dist/store-ui /app/out; \
    else \
      echo "ERROR: Angular build output not found under /app/dist" && \
      ls -la /app/dist && \
      exit 1; \
    fi

FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app

COPY store/ ./
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app

COPY --from=backend-build /app/target/*.jar app.jar

COPY --from=frontend-build /app/out ./static

EXPOSE 8080


CMD ["sh", "-c", "java -jar app.jar --server.port=${PORT:-8080} --spring.web.resources.static-locations=file:/app/static/"]
