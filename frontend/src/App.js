import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ExpensePage from './pages/ExpensePage';
import DashboardPage from './pages/DashboardPage';
import ReportsPage from './pages/ReportsPage';
import { Container, Row, Col } from 'react-bootstrap';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <Router>
      <div className="d-flex">
        <Sidebar collapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className={`main-content ${sidebarCollapsed ? 'expanded' : ''}`} style={{ flex: 1 }}>
          <Container fluid>
            <Row>
              <Col>
                <Routes>
                  <Route path="/" element={<ExpensePage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/reports" element={<ReportsPage />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </Router>
  );
}

export default App; 