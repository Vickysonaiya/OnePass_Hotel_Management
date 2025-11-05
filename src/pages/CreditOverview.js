import React from 'react';
import './creditoverview.css';

const CreditOverview = () => {
  // Sample data - in real app, this would come from API
  const creditData = {
    totalPurchased: 1000,
    creditsRemaining: 247,
    creditUtilization: 75.3,
    averageDailyConsumption: 8.2,
    contractStartDate: '2024-01-15',
    contractEndDate: '2024-12-14',
    lastPurchaseDate: '2024-06-20',
    nextBillingDate: '2024-12-14'
  };

  // Calculate estimated runout date
  const calculateRunoutDate = () => {
    const remaining = creditData.creditsRemaining;
    const dailyUsage = creditData.averageDailyConsumption;
    if (dailyUsage <= 0) return 'N/A';
    
    const daysRemaining = Math.floor(remaining / dailyUsage);
    const runoutDate = new Date();
    runoutDate.setDate(runoutDate.getDate() + daysRemaining);
    return runoutDate.toLocaleDateString();
  };

  const creditKPIs = [
    { 
      title: "Total Credits Purchased", 
      value: creditData.totalPurchased.toLocaleString(), 
      color: "blue", 
      icon: "💰",
      description: "Total credits bought since contract start"
    },
    { 
      title: "Credits Remaining", 
      value: creditData.creditsRemaining.toLocaleString(), 
      color: "green", 
      icon: "⏳",
      description: "Credits available for usage"
    },
    { 
      title: "Credit Utilization", 
      value: `${creditData.creditUtilization}%`, 
      color: "orange", 
      icon: "📊",
      description: "Percentage of credits used"
    },
    { 
      title: "Avg Daily Consumption", 
      value: creditData.averageDailyConsumption.toFixed(1), 
      color: "purple", 
      icon: "📈",
      description: "Average credits used per day"
    }
  ];

  const contractDetails = [
    {
      label: "Estimated Runout Date",
      value: calculateRunoutDate(),
      icon: "📅",
      description: "Based on average daily consumption",
      status: creditData.creditsRemaining / creditData.averageDailyConsumption < 30 ? "warning" : "normal"
    },
    {
      label: "Contract Start Date",
      value: new Date(creditData.contractStartDate).toLocaleDateString(),
      icon: "🟢",
      description: "Subscription activation date"
    },
    {
      label: "Contract End Date",
      value: new Date(creditData.contractEndDate).toLocaleDateString(),
      icon: "🔴",
      description: "Subscription expiration date"
    },
    {
      label: "Last Purchase Date",
      value: new Date(creditData.lastPurchaseDate).toLocaleDateString(),
      icon: "🛒",
      description: "Most recent credit purchase"
    },
    {
      label: "Next Billing Date",
      value: new Date(creditData.nextBillingDate).toLocaleDateString(),
      icon: "💳",
      description: "Next automatic billing cycle"
    }
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Credit Overview</h2>
        <p className="dashboard-subtitle">Monitor your credit usage and subscription details</p>
      </header>

      {/* KPI Cards Section */}
      <div className="kpi-grid">
        {creditKPIs.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <span className="kpi-icon">{kpi.icon}</span>
            <div className="kpi-content">
              <h5>{kpi.title}</h5>
              <span className="kpi-value">{kpi.value}</span>
              <p className="kpi-description">{kpi.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Credit Utilization Progress */}
        <div className="widget-card">
          <div className="widget-header">
            <h5>Credit Utilization Progress</h5>
            <span className="utilization-percent">{creditData.creditUtilization}% Used</span>
          </div>
          <div className="progress-container">
            <div 
              className="progress-bar utilization-bar"
              style={{ width: `${creditData.creditUtilization}%` }}
            >
              <div className="progress-fill"></div>
            </div>
          </div>
          <div className="utilization-stats">
            <div className="stat-item">
              <span className="stat-label">Used</span>
              <span className="stat-value">{(creditData.totalPurchased - creditData.creditsRemaining).toLocaleString()} credits</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Available</span>
              <span className="stat-value">{creditData.creditsRemaining.toLocaleString()} credits</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Total</span>
              <span className="stat-value">{creditData.totalPurchased.toLocaleString()} credits</span>
            </div>
          </div>
        </div>

        {/* Contract Details */}
        <div className="widget-card">
          <div className="widget-header">
            <h5>Contract & Billing Details</h5>
          </div>
          <div className="contract-details">
            {contractDetails.map((detail, index) => (
              <div key={index} className={`contract-item ${detail.status || ''}`}>
                <div className="contract-icon">{detail.icon}</div>
                <div className="contract-info">
                  <div className="contract-label">{detail.label}</div>
                  <div className="contract-value">{detail.value}</div>
                  <div className="contract-description">{detail.description}</div>
                </div>
                {detail.status === 'warning' && (
                  <div className="warning-badge">Low Credits</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="widget-card">
          <div className="widget-header">
            <h5>Quick Actions</h5>
          </div>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span className="btn-icon">➕</span>
              Purchase More Credits
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">📊</span>
              Usage Analytics
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">🧾</span>
              View Billing History
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">⚙️</span>
              Manage Subscription
            </button>
          </div>
        </div>

        {/* Credit Consumption Trend */}
        <div className="widget-card wide">
          <div className="widget-header">
            <h5>Credit Consumption Trend (Last 30 Days)</h5>
          </div>
          <div className="consumption-chart">
            {/* Simple bar chart representation */}
            <div className="chart-bars">
              {[12, 8, 15, 9, 11, 7, 14, 10, 13, 8, 12, 9, 16, 11, 10, 8, 13, 9, 12, 7, 14, 10, 11, 8, 13, 9, 15, 10, 12, 8].map((value, index) => (
                <div 
                  key={index} 
                  className="chart-bar"
                  style={{ height: `${(value / 20) * 100}%` }}
                  title={`Day ${index + 1}: ${value} credits`}
                ></div>
              ))}
            </div>
            <div className="chart-labels">
              <span>Start</span>
              <span>15 Days</span>
              <span>End</span>
            </div>
          </div>
          <div className="chart-legend">
            <div className="legend-item">
              <div className="legend-color daily-avg"></div>
              <span>Daily Average: {creditData.averageDailyConsumption} credits/day</span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Statistics */}
      <div className="table-section">
        <div className="table-header">
          <h3>Detailed Usage Statistics</h3>
          <div className="table-controls">
            <button className="export-btn">Export Report</button>
            <button className="refresh-btn">Refresh Data</button>
          </div>
        </div>

        <div className="table-container">
          <table className="properties-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Credits Used</th>
                <th>Daily Average</th>
                <th>Peak Usage</th>
                <th>Cost Efficiency</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Last 7 Days</td>
                <td>67 credits</td>
                <td>9.6/day</td>
                <td>16 credits</td>
                <td>
                  <span className="efficiency-badge excellent">Excellent</span>
                </td>
              </tr>
              <tr>
                <td>Last 30 Days</td>
                <td>246 credits</td>
                <td>8.2/day</td>
                <td>18 credits</td>
                <td>
                  <span className="efficiency-badge good">Good</span>
                </td>
              </tr>
              <tr>
                <td>Last 90 Days</td>
                <td>753 credits</td>
                <td>8.4/day</td>
                <td>22 credits</td>
                <td>
                  <span className="efficiency-badge good">Good</span>
                </td>
              </tr>
              <tr>
                <td>This Billing Cycle</td>
                <td>492 credits</td>
                <td>7.8/day</td>
                <td>19 credits</td>
                <td>
                  <span className="efficiency-badge excellent">Excellent</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CreditOverview;