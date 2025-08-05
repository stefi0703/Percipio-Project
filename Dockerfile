 # 1️Use an official Java runtime as the base image
 FROM openjdk:17-jdk-slim
  
 # 2️Set the working directory inside the container
 WORKDIR /app
  
 # 3️Copy the built JAR file into the container
 COPY target/trading-0.0.1-SNAPSHOT.jar app.jar
  
 # 4️Expose the application port
 EXPOSE 9090
  
 # 5️Run the application
 ENTRYPOINT ["java", "-jar", "app.jar"]