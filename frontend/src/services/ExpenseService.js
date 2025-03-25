import axios from 'axios';

// Use environment variable if available, otherwise fallback to relative path
const API_URL = process.env.REACT_APP_API_URL || '/api/expenses';

class ExpenseService {
  // Create a new expense
  createExpense(expense) {
    return axios.post(`${API_URL}/expenses`, expense);
  }

  // Get all expenses
  getAllExpenses() {
    return axios.get(`${API_URL}/expenses`);
  }

  // Get expense by ID
  getExpenseById(id) {
    return axios.get(`${API_URL}/expenses/${id}`);
  }

  // Update expense
  updateExpense(id, expense) {
    return axios.put(`${API_URL}/expenses/${id}`, expense);
  }

  // Delete expense
  deleteExpense(id) {
    return axios.delete(`${API_URL}/expenses/${id}`);
  }

  // Get weekly expenses
  getWeeklyExpenses() {
    return axios.get(`${API_URL}/expenses/weekly`);
  }

  // Get monthly expenses
  getMonthlyExpenses() {
    return axios.get(`${API_URL}/expenses/monthly`);
  }

  // Get yearly expenses
  getYearlyExpenses() {
    return axios.get(`${API_URL}/expenses/yearly`);
  }

  // Get weekly statistics
  getWeeklyStatistics() {
    return axios.get(`${API_URL}/expenses/statistics/weekly`);
  }

  // Get monthly statistics
  getMonthlyStatistics() {
    return axios.get(`${API_URL}/expenses/statistics/monthly`);
  }

  // Get yearly statistics
  getYearlyStatistics() {
    return axios.get(`${API_URL}/expenses/statistics/yearly`);
  }

  // Download Excel report
  downloadExcelReport() {
    return axios.get(`${API_URL}/expenses/report/excel`, {
      responseType: 'blob'
    });
  }

  // Download PDF report
  downloadPdfReport() {
    return axios.get(`${API_URL}/expenses/report/pdf`, {
      responseType: 'blob'
    });
  }
}

const expenseService = new ExpenseService();
export default expenseService; 