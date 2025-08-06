# Simple Spring Boot Dockerfile
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Install Maven
RUN apt-get update && \
    apt-get install -y maven && \
    rm -rf /var/lib/apt/lists/*

# Copy pom.xml first for better caching
COPY store/pom.xml ./

# Download dependencies
RUN mvn dependency:go-offline -B

# Copy source code
COPY store/src ./src

# Build the application
RUN mvn clean package -DskipTests -B

# Find and rename the jar file
RUN find target -name "*.jar" -exec mv {} app.jar \;

# Expose port
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
