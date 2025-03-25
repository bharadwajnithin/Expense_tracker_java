package com.example.expensetracker.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.service.ExpenseService;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin(origins = "http://localhost:3000") // Allow requests from React frontend
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // Create a new expense
    @PostMapping
    public ResponseEntity<Expense> createExpense(@RequestBody Expense expense) {
        Expense savedExpense = expenseService.saveExpense(expense);
        return new ResponseEntity<>(savedExpense, HttpStatus.CREATED);
    }

    // Get all expenses
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // Get expense by ID
    @GetMapping("/{id}")
    public ResponseEntity<Expense> getExpenseById(@PathVariable String id) {
        Expense expense = expenseService.getExpenseById(id);
        return new ResponseEntity<>(expense, HttpStatus.OK);
    }

    // Update expense
    @PutMapping("/{id}")
    public ResponseEntity<Expense> updateExpense(@PathVariable String id, @RequestBody Expense expense) {
        Expense updatedExpense = expenseService.updateExpense(id, expense);
        return new ResponseEntity<>(updatedExpense, HttpStatus.OK);
    }

    // Delete expense
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable String id) {
        expenseService.deleteExpense(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get weekly expenses
    @GetMapping("/weekly")
    public ResponseEntity<List<Expense>> getWeeklyExpenses() {
        List<Expense> expenses = expenseService.getExpensesForCurrentWeek();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // Get monthly expenses
    @GetMapping("/monthly")
    public ResponseEntity<List<Expense>> getMonthlyExpenses() {
        List<Expense> expenses = expenseService.getExpensesForCurrentMonth();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // Get yearly expenses
    @GetMapping("/yearly")
    public ResponseEntity<List<Expense>> getYearlyExpenses() {
        List<Expense> expenses = expenseService.getExpensesForCurrentYear();
        return new ResponseEntity<>(expenses, HttpStatus.OK);
    }

    // Get weekly statistics
    @GetMapping("/statistics/weekly")
    public ResponseEntity<Map<String, Object>> getWeeklyStatistics() {
        Map<String, Object> statistics = expenseService.getWeeklyStatistics();
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    // Get monthly statistics
    @GetMapping("/statistics/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyStatistics() {
        Map<String, Object> statistics = expenseService.getMonthlyStatistics();
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    // Get yearly statistics
    @GetMapping("/statistics/yearly")
    public ResponseEntity<Map<String, Object>> getYearlyStatistics() {
        Map<String, Object> statistics = expenseService.getYearlyStatistics();
        return new ResponseEntity<>(statistics, HttpStatus.OK);
    }

    // Generate Excel report
    @GetMapping("/report/excel")
    public ResponseEntity<byte[]> generateExcelReport() {
        byte[] reportBytes = expenseService.generateExcelReport();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "expense-report.xlsx");
        
        return new ResponseEntity<>(reportBytes, headers, HttpStatus.OK);
    }

    // Generate PDF report
    @GetMapping("/report/pdf")
    public ResponseEntity<byte[]> generatePdfReport() {
        byte[] reportBytes = expenseService.generatePdfReport();
        
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_PDF);
        headers.setContentDispositionFormData("attachment", "expense-report.pdf");
        
        return new ResponseEntity<>(reportBytes, headers, HttpStatus.OK);
    }
} 