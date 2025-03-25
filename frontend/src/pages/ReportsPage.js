import React, { useState, useCallback } from 'react';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { FaFileExcel, FaFilePdf, FaDownload } from 'react-icons/fa';
import ExpenseService from '../services/ExpenseService';

const ReportsPage = () => {
  const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
  const [loading, setLoading] = useState({ excel: false, pdf: false });

  const showAlert = useCallback((message, variant) => {
    setAlert({ show: true, message, variant });
    setTimeout(() => {
      setAlert(prevAlert => ({ ...prevAlert, show: false }));
    }, 3000);
  }, []);

  const handleDownloadExcel = async () => {
    setLoading({ ...loading, excel: true });
    try {
      const response = await ExpenseService.downloadExcelReport();
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
      });
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense-report.xlsx');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showAlert('Excel report downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading Excel report:', error);
      showAlert('Failed to download Excel report. Please try again.', 'danger');
    } finally {
      setLoading({ ...loading, excel: false });
    }
  };

  const handleDownloadPdf = async () => {
    setLoading({ ...loading, pdf: true });
    try {
      const response = await ExpenseService.downloadPdfReport();
      
      // Create a blob from the response data
      const blob = new Blob([response.data], { type: 'application/pdf' });
      
      // Create a link element and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense-report.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      showAlert('PDF report downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading PDF report:', error);
      showAlert('Failed to download PDF report. Please try again.', 'danger');
    } finally {
      setLoading({ ...loading, pdf: false });
    }
  };

  return (
    <Container>
      <h2 className="my-4">Expense Reports</h2>
      
      {alert.show && (
        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} dismissible>
          {alert.message}
        </Alert>
      )}
      
      <Row>
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-4">
                <FaFileExcel size={50} className="text-success mb-3" />
                <Card.Title>Excel Report</Card.Title>
              </div>
              <Card.Text>
                Download a comprehensive Excel report of your expenses. The report includes:
                <ul>
                  <li>Weekly expenses breakdown</li>
                  <li>Monthly expenses breakdown</li>
                  <li>Yearly expenses breakdown</li>
                  <li>Category-wise analysis</li>
                  <li>Currency-wise analysis</li>
                </ul>
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="success" 
                  className="w-100"
                  onClick={handleDownloadExcel}
                  disabled={loading.excel}
                >
                  {loading.excel ? 'Downloading...' : (
                    <>
                      <FaDownload className="me-2" />
                      Download Excel Report
                    </>
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={6} className="mb-4">
          <Card className="h-100">
            <Card.Body className="d-flex flex-column">
              <div className="text-center mb-4">
                <FaFilePdf size={50} className="text-danger mb-3" />
                <Card.Title>PDF Report</Card.Title>
              </div>
              <Card.Text>
                Download a detailed PDF report of your expenses. The report includes:
                <ul>
                  <li>Weekly expenses summary</li>
                  <li>Monthly expenses summary</li>
                  <li>Yearly expenses summary</li>
                  <li>Expense details with categories</li>
                  <li>Total expense calculations</li>
                </ul>
              </Card.Text>
              <div className="mt-auto">
                <Button 
                  variant="danger" 
                  className="w-100"
                  onClick={handleDownloadPdf}
                  disabled={loading.pdf}
                >
                  {loading.pdf ? 'Downloading...' : (
                    <>
                      <FaDownload className="me-2" />
                      Download PDF Report
                    </>
                  )}
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportsPage; 