package com.example.expensetracker.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.example.expensetracker.model.Expense;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
    
    // Find expenses by category
    List<Expense> findByCategory(String category);
    
    // Find expenses between two dates
    List<Expense> findByDateBetween(LocalDateTime startDate, LocalDateTime endDate);
    
    // Find expenses by currency
    List<Expense> findByCurrency(String currency);
    
    // Custom query to find expenses for the current week
    @Query("{'date': {$gte: ?0, $lte: ?1}}")
    List<Expense> findExpensesForCurrentWeek(LocalDateTime startOfWeek, LocalDateTime endOfWeek);
    
    // Custom query to find expenses for the current month
    @Query("{'date': {$gte: ?0, $lte: ?1}}")
    List<Expense> findExpensesForCurrentMonth(LocalDateTime startOfMonth, LocalDateTime endOfMonth);
    
    // Custom query to find expenses for the current year
    @Query("{'date': {$gte: ?0, $lte: ?1}}")
    List<Expense> findExpensesForCurrentYear(LocalDateTime startOfYear, LocalDateTime endOfYear);
} 