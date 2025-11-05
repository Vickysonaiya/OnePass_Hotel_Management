import React, { useState } from 'react';
import './creditconsumption.css';

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

  // Property-wise credit consumption data
  const [propertyCreditData] = useState([
    {
      id: 1,
      propertyName: "Grand Plaza Hotel",
      propertyId: "GP001",
      creditsAllocated: 300,
      creditsUsed: 285,
      remainingCredits: 15,
      averageDailyUsage: 3.2,
      lastTopupDate: '2024-11-15',
      creditStatus: 'critical',
      utilization: 95
    },
    {
      id: 2,
      propertyName: "Sunset Resort",
      propertyId: "SR002",
      creditsAllocated: 250,
      creditsUsed: 180,
      remainingCredits: 70,
      averageDailyUsage: 2.1,
      lastTopupDate: '2024-11-20',
      creditStatus: 'low',
      utilization: 72
    },
    {
      id: 3,
      propertyName: "Mountain View Inn",
      propertyId: "MV003",
      creditsAllocated: 150,
      creditsUsed: 89,
      remainingCredits: 61,
      averageDailyUsage: 1.5,
      lastTopupDate: '2024-11-10',
      creditStatus: 'normal',
      utilization: 59
    },
    {
      id: 4,
      propertyName: "Ocean Breeze Suites",
      propertyId: "OB004",
      creditsAllocated: 200,
      creditsUsed: 145,
      remainingCredits: 55,
      averageDailyUsage: 2.8,
      lastTopupDate: '2024-11-18',
      creditStatus: 'normal',
      utilization: 72.5
    },
    {
      id: 5,
      propertyName: "City Center Hotel",
      propertyId: "CC005",
      creditsAllocated: 100,
      creditsUsed: 95,
      remainingCredits: 5,
      averageDailyUsage: 1.8,
      lastTopupDate: '2024-11-22',
      creditStatus: 'critical',
      utilization: 95
    }
  ]);

  const [filters, setFilters] = useState({
    propertyName: "",
    creditStatus: ""
  });

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

  // Filter handler
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Apply filters
  const filteredProperties = propertyCreditData.filter(property => {
    return (
      property.propertyName.toLowerCase().includes(filters.propertyName.toLowerCase()) &&
      (filters.creditStatus === "" || property.creditStatus === filters.creditStatus)
    );
  });

  // Action handlers
  const handleTopUp = (propertyId) => {
    alert(`Top-up credits for property ID: ${propertyId}`);
    // In real app, this would open a modal or navigate to top-up page
  };

  const handleViewDetails = (propertyId) => {
    alert(`View details for property ID: ${propertyId}`);
    // In real app, this would navigate to property credit details page
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      normal: { label: 'Normal', class: 'status-normal' },
      low: { label: 'Low', class: 'status-low' },
      critical: { label: 'Critical', class: 'status-critical' }
    };
    
    const config = statusConfig[status] || statusConfig.normal;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getDaysUntilRunout = (remaining, dailyUsage) => {
    if (dailyUsage <= 0) return 'N/A';
    return Math.floor(remaining / dailyUsage);
  };

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

      {/* Property Credit Consumption Table */}
      <div className="table-section">
        <div className="table-header">
          <h3>Property-wise Credit Consumption</h3>
          <div className="table-controls">
            <button className="export-btn">Export CSV</button>
            <button className="refresh-btn">Refresh Data</button>
          </div>
        </div>

        <div className="filters-row">
          <div className="filter-group">
            <label>Property Name:</label>
            <input
              type="text"
              placeholder="Search properties..."
              value={filters.propertyName}
              onChange={(e) => handleFilterChange('propertyName', e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label>Credit Status:</label>
            <select
              value={filters.creditStatus}
              onChange={(e) => handleFilterChange('creditStatus', e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="normal">Normal</option>
              <option value="low">Low</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="properties-table credit-consumption-table">
            <thead>
              <tr>
                <th>Property Name</th>
                <th>Credits Allocated</th>
                <th>Credits Used</th>
                <th>Remaining Credits</th>
                <th>Average Daily Usage</th>
                <th>Last Top-up Date</th>
                <th>Credit Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProperties.map((property) => (
                <tr key={property.id}>
                  <td>
                    <div className="property-name-cell">
                      <span className="property-avatar">
                        {property.propertyName.charAt(0)}
                      </span>
                      <div className="property-info">
                        <div className="property-name">{property.propertyName}</div>
                        <div className="property-id">ID: {property.propertyId}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="credits-allocated">{property.creditsAllocated}</span>
                  </td>
                  <td>
                    <div className="credits-used-cell">
                      <span className="credits-used">{property.creditsUsed}</span>
                      <div className="usage-progress">
                        <div 
                          className="usage-progress-bar"
                          style={{ width: `${property.utilization}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`remaining-credits ${
                      property.creditStatus === 'critical' ? 'critical' : 
                      property.creditStatus === 'low' ? 'low' : 'normal'
                    }`}>
                      {property.remainingCredits}
                    </span>
                  </td>
                  <td>
                    <div className="daily-usage-cell">
                      <span className="daily-usage">{property.averageDailyUsage}/day</span>
                      <div className="days-remaining">
                        {getDaysUntilRunout(property.remainingCredits, property.averageDailyUsage)} days left
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="last-topup">
                      {new Date(property.lastTopupDate).toLocaleDateString()}
                    </span>
                  </td>
                  <td>
                    {getStatusBadge(property.creditStatus)}
                  </td>
                  <td>
                    <div className="action-buttons-cell">
                      <button 
                        className="action-btn topup-btn"
                        onClick={() => handleTopUp(property.id)}
                      >
                        Top-up
                      </button>
                      <button 
                        className="action-btn details-btn"
                        onClick={() => handleViewDetails(property.id)}
                      >
                        View Details
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredProperties.length === 0 && (
            <div className="no-data-message">
              No properties found matching the current filters.
            </div>
          )}
        </div>

        <div className="table-footer">
          <div className="table-info">
            Showing {filteredProperties.length} of {propertyCreditData.length} properties
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="main-grid">
        {/* Credit Utilization Progress */}
        <div className="widget-card">
          <div className="widget-header">
            <h5>Overall Credit Utilization</h5>
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
      </div>
    </div>
  );
}

export default CreditOverview;