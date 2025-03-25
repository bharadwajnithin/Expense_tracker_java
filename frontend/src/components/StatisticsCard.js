import React from 'react';
import { Card } from 'react-bootstrap';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsCard = ({ title, statistics }) => {
  // Generate random colors for chart
  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(Math.random() * 200);
      const g = Math.floor(Math.random() * 200);
      const b = Math.floor(Math.random() * 200);
      colors.push(`rgba(${r}, ${g}, ${b}, 0.7)`);
    }
    return colors;
  };

  // Format currency with symbol
  const formatCurrency = (amount, currency = 'USD') => {
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
    return `${symbol}${parseFloat(amount).toFixed(2)}`;
  };

  // Prepare data for category chart
  const prepareCategoryChartData = () => {
    if (!statistics || !statistics.categoryTotals) return null;

    const categories = Object.keys(statistics.categoryTotals);
    const amounts = Object.values(statistics.categoryTotals);
    const backgroundColors = generateColors(categories.length);

    return {
      labels: categories,
      datasets: [
        {
          data: amounts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  };

  // Prepare data for currency chart
  const prepareCurrencyChartData = () => {
    if (!statistics || !statistics.currencyTotals) return null;

    const currencies = Object.keys(statistics.currencyTotals);
    const amounts = Object.values(statistics.currencyTotals);
    const backgroundColors = generateColors(currencies.length);

    return {
      labels: currencies,
      datasets: [
        {
          data: amounts,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  };

  const categoryChartData = prepareCategoryChartData();
  const currencyChartData = prepareCurrencyChartData();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  if (!statistics) {
    return (
      <Card className="dashboard-card">
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <p>Loading statistics...</p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <div className="d-flex justify-content-between mb-4">
          <div>
            <h5>Total Expenses</h5>
            <h3>{formatCurrency(statistics.totalAmount || 0)}</h3>
          </div>
          <div>
            <h5>Number of Expenses</h5>
            <h3>{statistics.count || 0}</h3>
          </div>
        </div>

        <div className="row">
          {categoryChartData && (
            <div className="col-md-6">
              <h5>Expenses by Category</h5>
              <div className="chart-container">
                <Pie data={categoryChartData} options={chartOptions} />
              </div>
            </div>
          )}

          {currencyChartData && (
            <div className="col-md-6">
              <h5>Expenses by Currency</h5>
              <div className="chart-container">
                <Pie data={currencyChartData} options={chartOptions} />
              </div>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatisticsCard; 