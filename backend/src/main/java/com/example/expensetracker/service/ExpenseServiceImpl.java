package com.example.expensetracker.service;

import com.example.expensetracker.model.Expense;
import com.example.expensetracker.repository.ExpenseRepository;
import com.itextpdf.text.*;
import com.itextpdf.text.pdf.PdfPCell;
import com.itextpdf.text.pdf.PdfPTable;
import com.itextpdf.text.pdf.PdfWriter;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    @Autowired
    private ExpenseRepository expenseRepository;

    @Override
    public Expense saveExpense(Expense expense) {
        if (expense.getDate() == null) {
            expense.setDate(LocalDateTime.now());
        }
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public Expense getExpenseById(String id) {
        return expenseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Expense not found with id: " + id));
    }

    @Override
    public Expense updateExpense(String id, Expense expense) {
        Expense existingExpense = getExpenseById(id);
        existingExpense.setDescription(expense.getDescription());
        existingExpense.setAmount(expense.getAmount());
        existingExpense.setCurrency(expense.getCurrency());
        existingExpense.setCategory(expense.getCategory());
        existingExpense.setDate(expense.getDate());
        return expenseRepository.save(existingExpense);
    }

    @Override
    public void deleteExpense(String id) {
        expenseRepository.deleteById(id);
    }

    @Override
    public List<Expense> getExpensesForCurrentWeek() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfWeek = now.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY))
                .with(LocalTime.MIN);
        LocalDateTime endOfWeek = now.with(TemporalAdjusters.nextOrSame(DayOfWeek.SUNDAY))
                .with(LocalTime.MAX);
        return expenseRepository.findExpensesForCurrentWeek(startOfWeek, endOfWeek);
    }

    @Override
    public List<Expense> getExpensesForCurrentMonth() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfMonth = now.withDayOfMonth(1).with(LocalTime.MIN);
        LocalDateTime endOfMonth = now.with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX);
        return expenseRepository.findExpensesForCurrentMonth(startOfMonth, endOfMonth);
    }

    @Override
    public List<Expense> getExpensesForCurrentYear() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime startOfYear = now.withDayOfYear(1).with(LocalTime.MIN);
        LocalDateTime endOfYear = now.withMonth(12).with(TemporalAdjusters.lastDayOfMonth()).with(LocalTime.MAX);
        return expenseRepository.findExpensesForCurrentYear(startOfYear, endOfYear);
    }

    @Override
    public Map<String, Object> getWeeklyStatistics() {
        List<Expense> weeklyExpenses = getExpensesForCurrentWeek();
        return generateStatistics(weeklyExpenses);
    }

    @Override
    public Map<String, Object> getMonthlyStatistics() {
        List<Expense> monthlyExpenses = getExpensesForCurrentMonth();
        return generateStatistics(monthlyExpenses);
    }

    @Override
    public Map<String, Object> getYearlyStatistics() {
        List<Expense> yearlyExpenses = getExpensesForCurrentYear();
        return generateStatistics(yearlyExpenses);
    }

    private Map<String, Object> generateStatistics(List<Expense> expenses) {
        Map<String, Object> statistics = new HashMap<>();
        
        // Total expenses
        BigDecimal total = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        statistics.put("totalAmount", total);
        
        // Count of expenses
        statistics.put("count", expenses.size());
        
        // Group by category
        Map<String, BigDecimal> categoryTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add)
                ));
        statistics.put("categoryTotals", categoryTotals);
        
        // Group by currency
        Map<String, BigDecimal> currencyTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCurrency,
                        Collectors.reducing(BigDecimal.ZERO, Expense::getAmount, BigDecimal::add)
                ));
        statistics.put("currencyTotals", currencyTotals);
        
        return statistics;
    }

    @Override
    public byte[] generateExcelReport() {
        try (Workbook workbook = new XSSFWorkbook(); 
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            
            // Create sheets for different time periods
            Sheet weeklySheet = workbook.createSheet("Weekly Expenses");
            Sheet monthlySheet = workbook.createSheet("Monthly Expenses");
            Sheet yearlySheet = workbook.createSheet("Yearly Expenses");
            
            // Create header row style
            CellStyle headerStyle = workbook.createCellStyle();
            org.apache.poi.ss.usermodel.Font headerFont = workbook.createFont();
            headerFont.setBold(true);
            headerStyle.setFont(headerFont);
            
            // Create headers
            createHeaderRow(weeklySheet, headerStyle);
            createHeaderRow(monthlySheet, headerStyle);
            createHeaderRow(yearlySheet, headerStyle);
            
            // Populate data
            populateExpenseData(weeklySheet, getExpensesForCurrentWeek());
            populateExpenseData(monthlySheet, getExpensesForCurrentMonth());
            populateExpenseData(yearlySheet, getExpensesForCurrentYear());
            
            // Auto size columns
            for (int i = 0; i < 6; i++) {
                weeklySheet.autoSizeColumn(i);
                monthlySheet.autoSizeColumn(i);
                yearlySheet.autoSizeColumn(i);
            }
            
            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate Excel report", e);
        }
    }
    
    private void createHeaderRow(Sheet sheet, CellStyle headerStyle) {
        Row headerRow = sheet.createRow(0);
        String[] headers = {"ID", "Description", "Amount", "Currency", "Category", "Date"};
        for (int i = 0; i < headers.length; i++) {
            Cell cell = headerRow.createCell(i);
            cell.setCellValue(headers[i]);
            cell.setCellStyle(headerStyle);
        }
    }
    
    private void populateExpenseData(Sheet sheet, List<Expense> expenses) {
        int rowNum = 1;
        for (Expense expense : expenses) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(expense.getId());
            row.createCell(1).setCellValue(expense.getDescription());
            row.createCell(2).setCellValue(expense.getAmount().doubleValue());
            row.createCell(3).setCellValue(expense.getCurrency());
            row.createCell(4).setCellValue(expense.getCategory());
            row.createCell(5).setCellValue(expense.getDate().toString());
        }
    }

    @Override
    public byte[] generatePdfReport() {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, out);
            document.open();
            
            // Add title
            com.itextpdf.text.Font titleFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 18);
            Paragraph title = new Paragraph("Expense Report", titleFont);
            title.setAlignment(Element.ALIGN_CENTER);
            document.add(title);
            document.add(Chunk.NEWLINE);
            
            // Weekly expenses
            addExpenseSection(document, "Weekly Expenses", getExpensesForCurrentWeek());
            document.add(Chunk.NEWLINE);
            
            // Monthly expenses
            addExpenseSection(document, "Monthly Expenses", getExpensesForCurrentMonth());
            document.add(Chunk.NEWLINE);
            
            // Yearly expenses
            addExpenseSection(document, "Yearly Expenses", getExpensesForCurrentYear());
            
            document.close();
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Failed to generate PDF report", e);
        }
    }
    
    private void addExpenseSection(Document document, String title, List<Expense> expenses) throws DocumentException {
        // Add section title
        com.itextpdf.text.Font sectionFont = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 14);
        Paragraph sectionTitle = new Paragraph(title, sectionFont);
        document.add(sectionTitle);
        document.add(Chunk.NEWLINE);
        
        // Create table
        PdfPTable table = new PdfPTable(5); // 5 columns
        table.setWidthPercentage(100);
        
        // Add table headers
        String[] headers = {"Description", "Amount", "Currency", "Category", "Date"};
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(5);
            table.addCell(cell);
        }
        
        // Add expense data
        for (Expense expense : expenses) {
            table.addCell(expense.getDescription());
            table.addCell(expense.getAmount().toString());
            table.addCell(expense.getCurrency());
            table.addCell(expense.getCategory());
            table.addCell(expense.getDate().toString());
        }
        
        // Add total row
        BigDecimal total = expenses.stream()
                .map(Expense::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        
        PdfPCell totalLabelCell = new PdfPCell(new Phrase("Total", FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        totalLabelCell.setColspan(1);
        totalLabelCell.setHorizontalAlignment(Element.ALIGN_RIGHT);
        table.addCell(totalLabelCell);
        
        PdfPCell totalValueCell = new PdfPCell(new Phrase(total.toString(), FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
        totalValueCell.setColspan(4);
        totalValueCell.setHorizontalAlignment(Element.ALIGN_LEFT);
        table.addCell(totalValueCell);
        
        document.add(table);
    }
} 