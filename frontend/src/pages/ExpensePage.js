import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseList from '../components/ExpenseList';
import ExpenseService from '../services/ExpenseService';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });

  const showAlert = useCallback((message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert(prevAlert => ({ ...prevAlert, show: false }));
    }, 3000);
  }, []);

  const fetchExpenses = useCallback(async () => {
    try {
      const response = await ExpenseService.getAllExpenses();
      setExpenses(response.data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      showAlert('Failed to load expenses. Please try again.', 'danger');
    }
  }, [showAlert]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const handleSaveExpense = async (expense) => {
    try {
      if (expense.id) {
        // Update existing expense
        await ExpenseService.updateExpense(expense.id, expense);
        showAlert('Expense updated successfully!', 'success');
      } else {
        // Create new expense
        await ExpenseService.createExpense(expense);
        showAlert('Expense added successfully!', 'success');
      }
      fetchExpenses();
      setSelectedExpense(null);
    } catch (error) {
      console.error('Error saving expense:', error);
      showAlert('Failed to save expense. Please try again.', 'danger');
    }
  };

  const handleEditExpense = (expense) => {
    setSelectedExpense(expense);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await ExpenseService.deleteExpense(id);
        showAlert('Expense deleted successfully!', 'success');
        fetchExpenses();
      } catch (error) {
        console.error('Error deleting expense:', error);
        showAlert('Failed to delete expense. Please try again.', 'danger');
      }
    }
  };

  const handleCancelEdit = () => {
    setSelectedExpense(null);
  };

  return (
    <Container>
      <h2 className="my-4">Manage Expenses</h2>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <Row>
        <Col>
          <ExpenseForm 
            expense={selectedExpense} 
            onSave={handleSaveExpense} 
            onCancel={handleCancelEdit} 
          />
        </Col>
      </Row>
      
      <Row className="mt-4">
        <Col>
          <ExpenseList 
            expenses={expenses} 
            onEdit={handleEditExpense} 
            onDelete={handleDeleteExpense} 
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ExpensePage; 