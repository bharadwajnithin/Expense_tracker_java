import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  // Format date to a readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Format currency with symbol
  const formatCurrency = (amount, currency) => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CAD: 'C$',
      AUD: 'A$',
      INR: '₹'
    };

    const symbol = symbols[currency] || '';
    return `${symbol}${amount.toFixed(2)}`;
  };

  return (
    <div className="expense-list">
      <h3>Expense List</h3>
      {expenses.length === 0 ? (
        <p className="text-center">No expenses found. Add your first expense above!</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Description</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>
                  <Badge bg="info">{expense.category}</Badge>
                </td>
                <td>{formatCurrency(expense.amount, expense.currency)} {expense.currency}</td>
                <td>{formatDate(expense.date)}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-2" onClick={() => onEdit(expense)}>
                    <FaEdit />
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => onDelete(expense.id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ExpenseList; 