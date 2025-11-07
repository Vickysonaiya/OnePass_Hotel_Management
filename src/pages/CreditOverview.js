import React from "react";
import "./creditoverview.css";
import CommonTable from "../components/common/Table";
import { tableData } from "../utils/tableData";
import DateHoursFilter from "../components/DateHoursFilter";

const CreditOverview = () => {
  const headers = [
    "Period",
    "Credits Used",
    "Daily Average",
    "Peak Usage",
    "Cost Efficiency",
  ];
  const defaultColumns = [
    { key: "period", label: "Period" },
    { key: "totalCredits", label: "Credit Used" },
    { key: "averagePerDay", label: "Daily Average" },
    { key: "remainingCredits", label: "Peak Usage" },
    { key: "efficiency", label: "Cost Efficiency" },
  ];

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

      <div>
        <DateHoursFilter />
      </div>

      <CommonTable
        headers={headers}
        records={tableData}
        defaultColumns={defaultColumns}
      />
    </div>
  );
};

export default CreditOverview;
