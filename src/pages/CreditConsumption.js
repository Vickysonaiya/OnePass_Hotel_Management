import React from "react";
import "./creditconsumption.css";
import CommonTable from "../components/common/Table";
import { consumptionData } from "../utils/tableData";
import DateHoursFilter from "../components/DateHoursFilter";

const CreditOverview = () => {
  // Sample data - in real app, this would come from API
  const creditData = {
    totalPurchased: 1000,
    creditsRemaining: 247,
    creditUtilization: 75.3,
    averageDailyConsumption: 8.2,
    contractStartDate: "2024-01-15",
    contractEndDate: "2024-12-14",
    lastPurchaseDate: "2024-06-20",
    nextBillingDate: "2024-12-14",
  };

  // Property-wise credit consumption data

  const headers = [
    "Property Name",
    "property Id",
    "Credits Allocated",
    "Credits Used",
    "Remaining Credits",
    "Average Daily Usage",
    "Last Topup Date",
    "Credit Status",
  ];

  const defaultColumns = [
    { key: "propertyName", label: "Property Name" },
    { key: "propertyId", label: "Property ID" },
    { key: "creditsAllocated", label: "Credits Allocated" },
    { key: "creditsUsed", label: "Credits Used" },
    { key: "remainingCredits", label: "Remaining Credits" },
    { key: "averageDailyUsage", label: "Avg Daily Usage" },
    { key: "lastTopupDate", label: "Last Top-up Date" },
    { key: "creditStatus", label: "Credit Status" },
  ];

  const creditKPIs = [
    {
      title: "Total Credits Purchased",
      value: creditData.totalPurchased.toLocaleString(),
      color: "blue",
      description: "Total credits bought since contract start",
    },
    {
      title: "Credits Remaining",
      value: creditData.creditsRemaining.toLocaleString(),
      color: "green",
      description: "Credits available for usage",
    },
    {
      title: "Credit Utilization",
      value: `${creditData.creditUtilization}%`,
      color: "orange",
      description: "Percentage of credits used",
    },
    {
      title: "Avg Daily Consumption",
      value: creditData.averageDailyConsumption.toFixed(1),
      color: "purple",
      description: "Average credits used per day",
    },
  ];

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Credit Overview</h2>
        <p className="dashboard-subtitle">
          Monitor your credit usage and subscription details
        </p>
      </header>

      {/* KPI Cards Section */}
      <div className="kpi-grid">
  {creditKPIs.map((kpi, index) => (
    <div key={index} className="kpi-card">
      <div className="kpi-header">
        <h5>{kpi.title}</h5>
        <button className="kpi-action">View more</button>
      </div>
      <div className="kpi-body">
        <div className="kpi-value">${kpi.value.toFixed ? kpi.value.toFixed(2) : kpi.value}</div>
        <div className="kpi-subtext">$0.00 previous period</div>
        <div className="kpi-chart-line"></div>
        <div className="kpi-footer">Updated 1:37 PM</div>
      </div>
    </div>
  ))}
</div>

      {/* Property Credit Consumption Table */}
      <div className="table-section">
        <div className="table-header">
          <h3>Property-wise Credit Consumption</h3>
        </div>
        <div>
          <DateHoursFilter />
        </div>

        <CommonTable
          headers={headers}
          records={consumptionData}
          defaultColumns={defaultColumns}
        />
      </div>
    </div>
  );
};

export default CreditOverview;
