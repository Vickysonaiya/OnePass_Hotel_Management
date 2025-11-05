import React, { useState } from 'react';
import './billinghistory.css';

const BillingHistory = () => {
  // Sample billing data
  const [billingData] = useState([
    {
      id: 1,
      invoiceNo: "INV-2024-001",
      invoiceDate: '2024-11-15',
      creditsPurchased: 500,
      paymentMode: "Credit Card",
      amountPaid: 25000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 2,
      invoiceNo: "INV-2024-002",
      invoiceDate: '2024-10-28',
      creditsPurchased: 300,
      paymentMode: "UPI",
      amountPaid: 15000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 3,
      invoiceNo: "INV-2024-003",
      invoiceDate: '2024-10-15',
      creditsPurchased: 200,
      paymentMode: "Credit Card",
      amountPaid: 10000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 4,
      invoiceNo: "INV-2024-004",
      invoiceDate: '2024-09-30',
      creditsPurchased: 400,
      paymentMode: "Bank Transfer",
      amountPaid: 20000,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 5,
      invoiceNo: "INV-2024-005",
      invoiceDate: '2024-09-15',
      creditsPurchased: 150,
      paymentMode: "Credit Card",
      amountPaid: 7500,
      status: "failed",
      downloadUrl: "#"
    },
    {
      id: 6,
      invoiceNo: "INV-2024-006",
      invoiceDate: '2024-08-28',
      creditsPurchased: 250,
      paymentMode: "UPI",
      amountPaid: 12500,
      status: "paid",
      downloadUrl: "#"
    },
    {
      id: 7,
      invoiceNo: "INV-2024-007",
      invoiceDate: '2024-08-15',
      creditsPurchased: 350,
      paymentMode: "Credit Card",
      amountPaid: 17500,
      status: "pending",
      downloadUrl: "#"
    },
    {
      id: 8,
      invoiceNo: "INV-2024-008",
      invoiceDate: '2024-07-30',
      creditsPurchased: 100,
      paymentMode: "Bank Transfer",
      amountPaid: 5000,
      status: "paid",
      downloadUrl: "#"
    }
  ]);

  const [filters, setFilters] = useState({
    invoiceNo: "",
    status: "",
    paymentMode: "",
    dateFrom: "",
    dateTo: ""
  });

  // Billing summary KPIs
  const billingKPIs = [
    { 
      title: "Total Amount Paid", 
      value: "₹1,12,500", 
      color: "green", 
      icon: "💰",
      description: "Total payments received"
    },
    { 
      title: "Total Credits Purchased", 
      value: "2,350", 
      color: "blue", 
      icon: "🎫",
      description: "Total credits bought"
    },
    { 
      title: "Successful Payments", 
      value: "6", 
      color: "teal", 
      icon: "✅",
      description: "Completed transactions"
    },
    { 
      title: "Pending/Failed", 
      value: "2", 
      color: "orange", 
      icon: "⚠️",
      description: "Requires attention"
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
  const filteredBillingData = billingData.filter(invoice => {
    const invoiceDate = new Date(invoice.invoiceDate);
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

    return (
      invoice.invoiceNo.toLowerCase().includes(filters.invoiceNo.toLowerCase()) &&
      (filters.status === "" || invoice.status === filters.status) &&
      (filters.paymentMode === "" || invoice.paymentMode === filters.paymentMode) &&
      (!fromDate || invoiceDate >= fromDate) &&
      (!toDate || invoiceDate <= toDate)
    );
  });

  // Action handlers
  const handleDownloadInvoice = (invoiceNo) => {
    alert(`Downloading invoice: ${invoiceNo}`);
    // In real app, this would trigger file download
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      paid: { label: 'Paid', class: 'status-paid' },
      pending: { label: 'Pending', class: 'status-pending' },
      failed: { label: 'Failed', class: 'status-failed' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`status-badge ${config.class}`}>{config.label}</span>;
  };

  const getPaymentModeIcon = (mode) => {
    const modeIcons = {
      'Credit Card': '💳',
      'UPI': '📱',
      'Bank Transfer': '🏦',
      'Wallet': '👛'
    };
    return modeIcons[mode] || '💰';
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Billing History</h2>
        <p className="dashboard-subtitle">View your transaction history and download invoices</p>
      </header>

      {/* Billing Summary KPI Cards */}
      <div className="kpi-grid">
        {billingKPIs.map((kpi, index) => (
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

      {/* Billing History Table */}
      <div className="table-section">
        <div className="table-header">
          <h3>Transaction History</h3>
          <div className="table-controls">
            <button className="export-btn">Export CSV</button>
            <button className="refresh-btn">Refresh Data</button>
          </div>
        </div>

        {/* Filters Row */}
        <div className="filters-row">
          <div className="filter-group">
            <label>Invoice No:</label>
            <input
              type="text"
              placeholder="Search invoice..."
              value={filters.invoiceNo}
              onChange={(e) => handleFilterChange('invoiceNo', e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label>Status:</label>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="filter-select"
            >
              <option value="">All Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Payment Mode:</label>
            <select
              value={filters.paymentMode}
              onChange={(e) => handleFilterChange('paymentMode', e.target.value)}
              className="filter-select"
            >
              <option value="">All Modes</option>
              <option value="Credit Card">Credit Card</option>
              <option value="UPI">UPI</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>
          <div className="filter-group">
            <label>Date From:</label>
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="filter-input"
            />
          </div>
          <div className="filter-group">
            <label>Date To:</label>
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              className="filter-input"
            />
          </div>
        </div>

        <div className="table-container">
          <table className="properties-table billing-history-table">
            <thead>
              <tr>
                <th>Invoice No.</th>
                <th>Invoice Date</th>
                <th>Credits Purchased</th>
                <th>Payment Mode</th>
                <th>Amount Paid</th>
                <th>Status</th>
                <th>Download Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredBillingData.map((invoice) => (
                <tr key={invoice.id}>
                  <td>
                    <div className="invoice-number-cell">
                      <span className="invoice-icon">🧾</span>
                      <div className="invoice-info">
                        <div className="invoice-no">{invoice.invoiceNo}</div>
                        <div className="invoice-id">ID: {invoice.id.toString().padStart(3, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="invoice-date">
                      {new Date(invoice.invoiceDate).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </td>
                  <td>
                    <div className="credits-purchased-cell">
                      <span className="credits-count">{invoice.creditsPurchased}</span>
                      <span className="credits-label">credits</span>
                    </div>
                  </td>
                  <td>
                    <div className="payment-mode-cell">
                      <span className="payment-icon">
                        {getPaymentModeIcon(invoice.paymentMode)}
                      </span>
                      <span className="payment-mode">{invoice.paymentMode}</span>
                    </div>
                  </td>
                  <td>
                    <span className="amount-paid">
                      {formatCurrency(invoice.amountPaid)}
                    </span>
                  </td>
                  <td>
                    {getStatusBadge(invoice.status)}
                  </td>
                  <td>
                    <div className="download-actions">
                      <button 
                        className="download-btn"
                        onClick={() => handleDownloadInvoice(invoice.invoiceNo)}
                        disabled={invoice.status !== 'paid'}
                      >
                        <span className="btn-icon">📄</span>
                        PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredBillingData.length === 0 && (
            <div className="no-data-message">
              No invoices found matching the current filters.
            </div>
          )}
        </div>

        <div className="table-footer">
          <div className="table-info">
            Showing {filteredBillingData.length} of {billingData.length} invoices
          </div>
          <div className="pagination-controls">
            <button className="pagination-btn" disabled>Previous</button>
            <span className="pagination-info">Page 1 of 1</span>
            <button className="pagination-btn" disabled>Next</button>
          </div>
        </div>
      </div>

      {/* Additional Billing Information */}
      <div className="main-grid">
        {/* Recent Transactions Summary */}
        <div className="widget-card wide">
          <div className="widget-header">
            <h5>Recent Transactions Summary</h5>
          </div>
          <div className="transaction-summary">
            <div className="summary-stats">
              <div className="summary-item">
                <span className="summary-label">This Month</span>
                <span className="summary-value">{formatCurrency(25000)}</span>
                <span className="summary-change positive">+15%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Last Month</span>
                <span className="summary-value">{formatCurrency(21700)}</span>
                <span className="summary-change positive">+8%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Quarterly Total</span>
                <span className="summary-value">{formatCurrency(72500)}</span>
                <span className="summary-change positive">+22%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="widget-card">
          <div className="widget-header">
            <h5>Payment Methods</h5>
          </div>
          <div className="payment-methods">
            <div className="payment-method-item">
              <span className="method-icon">💳</span>
              <div className="method-info">
                <div className="method-name">Credit Card</div>
                <div className="method-usage">4 transactions</div>
              </div>
            </div>
            <div className="payment-method-item">
              <span className="method-icon">📱</span>
              <div className="method-info">
                <div className="method-name">UPI</div>
                <div className="method-usage">2 transactions</div>
              </div>
            </div>
            <div className="payment-method-item">
              <span className="method-icon">🏦</span>
              <div className="method-info">
                <div className="method-name">Bank Transfer</div>
                <div className="method-usage">2 transactions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="widget-card">
          <div className="widget-header">
            <h5>Billing Actions</h5>
          </div>
          <div className="action-buttons">
            <button className="action-btn primary">
              <span className="btn-icon">➕</span>
              Purchase Credits
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">📧</span>
              Email Statements
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">⚙️</span>
              Payment Settings
            </button>
            <button className="action-btn secondary">
              <span className="btn-icon">🔄</span>
              Auto-recharge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingHistory;