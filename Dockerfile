# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the source code and libraries to the container
COPY src ./src
COPY lib ./lib

# Compile the Java code
RUN javac -d bin -cp "lib/*" $(find src -name "*.java")

# Define the command to run your application
CMD ["java", "-cp", "bin:lib/*", "F_Expense_Tracker.Main"]
