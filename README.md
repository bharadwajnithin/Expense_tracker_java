----------------------------------- Expense Tracker Application-------------------------------------

A full-stack web application for tracking expenses with different currency types, visualizing expense statistics, and generating reports.

## Features

1. **Expense Management**
   - Add, edit, and delete expenses
   - Support for multiple currencies
   - Categorize expenses

2. **Dashboard**
   - View expense statistics for week, month, and year
   - Visual charts for expense distribution by category and currency
   - Summary of total expenses

3. **Reports**
   - Generate and download expense reports in Excel format
   - Generate and download expense reports in PDF format

4. **Responsive UI**
   - Collapsible sidebar for better mobile experience
   - Bootstrap-based responsive design

## Technology Stack

### Frontend
- React.js
- React Router for navigation
- React Bootstrap for UI components
- Chart.js for data visualization
- Axios for API communication

### Backend
- Java Spring Boot
- Spring Data MongoDB for database operations
- Apache POI for Excel report generation
- iText for PDF report generation

### Database
- MongoDB

## Setup and Installation

### Prerequisites
- Node.js and npm
- Java 11 or higher
- Maven
- MongoDB

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd expense-tracker/backend
   ```

2. Build the project using Maven:
   ```
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```
   mvn spring:boot run
   ```
   The backend server will start on http://localhost:8080

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd expense-tracker/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```
   The frontend application will start on http://localhost:3000

### MongoDB Setup
1. Make sure MongoDB is running on your system
2. The application will connect to MongoDB at localhost:27017
3. The database will be created automatically if it doesn't exist

## Usage

1. **Adding Expenses**
   - Navigate to the Expenses page
   - Fill in the expense details (description, amount, currency, category, date)
   - Click Save

2. **Viewing Dashboard**
   - Navigate to the Dashboard page
   - Switch between weekly, monthly, and yearly views
   - View expense statistics and charts

3. **Generating Reports**
   - Navigate to the Reports page
   - Choose between Excel and PDF formats
   - Click the download button to generate and download the report

## Project Structure

```
expense-tracker/
├── backend/                  # Java Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/example/expensetracker/
│   │   │   │       ├── controller/    # REST API controllers
│   │   │   │       ├── model/         # Data models
│   │   │   │       ├── repository/    # MongoDB repositories
│   │   │   │       ├── service/       # Business logic
│   │   │   └── resources/             # Configuration files
│   └── pom.xml                        # Maven dependencies
│
└── frontend/                 # React.js frontend
    ├── public/               # Static files
    ├── src/
    │   ├── components/       # Reusable UI components
    │   ├── pages/            # Page components
    │   ├── services/         # API services
    │   ├── App.js            # Main application component
    │   └── index.js          # Entry point
    └── package.json          # npm dependencies
```

## License

This project is licensed under the MIT License. # EXPENSE_TRACKER-JAVA-
