import React, { useState, useEffect, useCallback } from 'react';
import { Container, Row, Col, Nav, Alert } from 'react-bootstrap';
import StatisticsCard from '../components/StatisticsCard';
import ExpenseService from '../services/ExpenseService';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('weekly');
  const [weeklyStats, setWeeklyStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState(null);
  const [yearlyStats, setYearlyStats] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'danger' });

  const showAlert = useCallback((message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert(prevAlert => ({ ...prevAlert, show: false }));
    }, 3000);
  }, []);

  const fetchStatistics = useCallback(async () => {
    try {
      // Fetch all statistics in parallel
      const [weeklyResponse, monthlyResponse, yearlyResponse] = await Promise.all([
        ExpenseService.getWeeklyStatistics(),
        ExpenseService.getMonthlyStatistics(),
        ExpenseService.getYearlyStatistics()
      ]);

      setWeeklyStats(weeklyResponse.data);
      setMonthlyStats(monthlyResponse.data);
      setYearlyStats(yearlyResponse.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
      showAlert('Failed to load statistics. Please try again.', 'danger');
    }
  }, [showAlert]);

  useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics]);

  return (
    <Container>
      <h2 className="my-4">Expense Dashboard</h2>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <Nav variant="tabs" className="mb-4" activeKey={activeTab} onSelect={(key) => setActiveTab(key)}>
        <Nav.Item>
          <Nav.Link eventKey="weekly">Weekly</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="monthly">Monthly</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="yearly">Yearly</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <Row>
        <Col>
          {activeTab === 'weekly' && (
            <StatisticsCard title="Weekly Statistics" statistics={weeklyStats} />
          )}
          
          {activeTab === 'monthly' && (
            <StatisticsCard title="Monthly Statistics" statistics={monthlyStats} />
          )}
          
          {activeTab === 'yearly' && (
            <StatisticsCard title="Yearly Statistics" statistics={yearlyStats} />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage; 