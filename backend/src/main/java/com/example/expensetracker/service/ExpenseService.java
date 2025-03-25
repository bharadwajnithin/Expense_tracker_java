package com.example.expensetracker.service;

import java.util.List;
import java.util.Map;

import com.example.expensetracker.model.Expense;

public interface ExpenseService {
    
    // CRUD operations
    Expense saveExpense(Expense expense);
    
    List<Expense> getAllExpenses();
    
    Expense getExpenseById(String id);
    
    Expense updateExpense(String id, Expense expense);
    
    void deleteExpense(String id);
    
    // Time-based queries
    List<Expense> getExpensesForCurrentWeek();
    
    List<Expense> getExpensesForCurrentMonth();
    
    List<Expense> getExpensesForCurrentYear();
    
    // Statistics
    Map<String, Object> getWeeklyStatistics();
    
    Map<String, Object> getMonthlyStatistics();
    
    Map<String, Object> getYearlyStatistics();
    
    // Export functionality
    byte[] generateExcelReport();
    
    byte[] generatePdfReport();
} 