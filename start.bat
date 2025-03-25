@echo off
echo Starting Expense Tracker Application...

echo Starting MongoDB...
start mongod

echo Starting Backend...
cd backend
start cmd /k mvn spring-boot:run

echo Starting Frontend...
cd ../frontend
start cmd /k npm start

echo Expense Tracker Application is starting up. Please wait...
echo Backend: http://localhost:8080
echo Frontend: http://localhost:3000 