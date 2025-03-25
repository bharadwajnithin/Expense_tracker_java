import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const ExpenseForm = ({ expense, onSave, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (expense) {
      setDescription(expense.description || '');
      setAmount(expense.amount || '');
      setCurrency(expense.currency || 'USD');
      setCategory(expense.category || '');
      setDate(expense.date ? expense.date.substring(0, 10) : '');
    } else {
      // Set default date to today
      const today = new Date().toISOString().substring(0, 10);
      setDate(today);
    }
  }, [expense]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    const expenseData = {
      description,
      amount: parseFloat(amount),
      currency,
      category,
      date: new Date(date).toISOString()
    };

    if (expense && expense.id) {
      expenseData.id = expense.id;
    }

    onSave(expenseData);
    resetForm();
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setCurrency('USD');
    setCategory('');
    const today = new Date().toISOString().substring(0, 10);
    setDate(today);
    setValidated(false);
  };

  return (
    <div className="expense-form">
      <h3>{expense && expense.id ? 'Edit Expense' : 'Add New Expense'}</h3>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a description.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a category.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid amount.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="JPY">JPY</option>
                <option value="CAD">CAD</option>
                <option value="AUD">AUD</option>
                <option value="INR">INR</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a date.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
          {expense && expense.id && (
            <Button variant="secondary" className="me-2" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button variant="primary" type="submit">
            {expense && expense.id ? 'Update' : 'Save'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ExpenseForm; 