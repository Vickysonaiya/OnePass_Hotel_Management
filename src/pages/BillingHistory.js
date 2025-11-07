import React, { useState } from "react";
import "./billinghistory.css";
import CommonTable from "../components/common/Table";
import DateHoursFilter from "../components/DateHoursFilter";
import { billingData } from "../utils/tableData";

const BillingHistory = () => {
  const [filters] = useState({
    invoiceNo: "",
    status: "",
    paymentMode: "",
    dateFrom: "",
    dateTo: "",
  });

  // Billing summary KPIs
  const billingKPIs = [
    {
      title: "Total Amount Paid",
      value: "₹1,12,500",
      color: "green",
      description: "Total payments received",
    },
    {
      title: "Total Credits Purchased",
      value: "2,350",
      color: "blue",
      description: "Total credits bought",
    },
    {
      title: "Successful Payments",
      value: "6",
      color: "teal",
      description: "Completed transactions",
    },
    {
      title: "Pending/Failed",
      value: "2",
      color: "orange",
      description: "Requires attention",
    },
  ];

  // Table configuration for CommonTable
  const headers = [
    "Invoice No.",
    "Invoice Date",
    "Credits Purchased",
    "Payment Mode",
    "Amount Paid",
    "Status",
    "Download Invoice",
  ];

  const defaultColumns = [
    { key: "invoiceNo", label: "Invoice No." },
    { key: "invoiceDate", label: "Invoice Date" },
    { key: "creditsPurchased", label: "Credits Purchased" },
    { key: "paymentMode", label: "Payment Mode" },
    { key: "amountPaid", label: "Amount Paid" },
    { key: "status", label: "Status" },
    { key: "downloadInvoice", label: "Download Invoice" },
  ];

  // Apply filters
  const filteredBillingData = billingData.filter((invoice) => {
    const invoiceDate = new Date(invoice.invoiceDate);
    const fromDate = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const toDate = filters.dateTo ? new Date(filters.dateTo) : null;

    return (
      invoice.invoiceNo
        .toLowerCase()
        .includes(filters.invoiceNo.toLowerCase()) &&
      (filters.status === "" || invoice.status === filters.status) &&
      (filters.paymentMode === "" ||
        invoice.paymentMode === filters.paymentMode) &&
      (!fromDate || invoiceDate >= fromDate) &&
      (!toDate || invoiceDate <= toDate)
    );
  });

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Billing History</h2>
        <p className="dashboard-subtitle">
          View your transaction history and download invoices
        </p>
      </header>

      {/* Billing Summary KPI Cards */}
      <div className="kpi-grid">
        {billingKPIs.map((kpi, index) => (
          <div key={index} className="kpi-card">
            <div className="kpi-header">
              <h5>{kpi.title}</h5>
              <button className="kpi-action">View more</button>
            </div>
            <div className="kpi-body">
              <div className="kpi-value">
                ${kpi.value.toFixed ? kpi.value.toFixed(2) : kpi.value}
              </div>
              <div className="kpi-subtext">$0.00 previous period</div>
              <div className="kpi-chart-line"></div>
              <div className="kpi-footer">Updated 1:37 PM</div>
            </div>
          </div>
        ))}
      </div>

      {/* Date Filter */}
      <div>
        <DateHoursFilter />
      </div>

      {/* CommonTable Component */}
      <CommonTable
        headers={headers}
        records={billingData}
        defaultColumns={defaultColumns}
      />

      {/* Table Footer Info */}
      <div className="table-footer">
        <div className="table-info">
          Showing {filteredBillingData.length} of {billingData.length} invoices
        </div>
        <div className="pagination-controls">
          <button className="pagination-btn" disabled>
            Previous
          </button>
          <span className="pagination-info">Page 1 of 1</span>
          <button className="pagination-btn" disabled>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingHistory;
