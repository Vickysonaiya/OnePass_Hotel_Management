// import React from 'react';

// const VisitorRiskProfile = () => (
//   <div className="header_title">
//       <h4 className="mb-3">Visitor Risk Profile</h4>
//   </div>
// );

// export default VisitorRiskProfile;

import React, { useState } from "react";
import "./visits.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import UnitFilter from "../components/MoreFilters/UnitFilter/UnitFilter";
import StatusFilter from "../components/MoreFilters/StatusFilter/StatusFilter";
import DeskFilter from "../components/MoreFilters/DeskFilter/DeskFilter";
import PropertyFilter from "../components/MoreFilters/PropertyFilter/PropertyFilter";
import DateHourFilter from "../components/Filter/DateHoursFilter";

const ExportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-download"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

const VisitorRiskProfile = () => {
  const [activeFilter, setActiveFilter] = useState("Low Risk");

  const mainFilters = [
    "Low Risk",
    "Medium Risk",
    "High Risk",
    "Blacklisted",
    "Under Review",
  ];

  const tableData = [
    {
      id: 1,
      VisitorName: "John Doe",
      VisitPurpose: "Business Meeting",
      RiskLevel: "Low Risk",
      Status: "Approved",
      Remarks: "No prior incidents",
    },
    {
      id: 2,
      VisitorName: "Sarah Connor",
      VisitPurpose: "Vendor Delivery",
      RiskLevel: "High Risk",
      Status: "Flagged",
      Remarks: "Suspicious behavior in past visit",
    },
    {
      id: 3,
      VisitorName: "David Lee",
      VisitPurpose: "Maintenance",
      RiskLevel: "Medium Risk",
      Status: "Under Review",
      Remarks: "Pending clearance from security",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Visitor Risk Profile Report", 14, 10);

    const tableColumn = [
      "Visitor Name",
      "Visit Purpose",
      "Risk Level",
      "Status",
      "Remarks",
    ];

    const tableRows = tableData.map((row) => [
      row.VisitorName,
      row.VisitPurpose,
      row.RiskLevel,
      row.Status,
      row.Remarks,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("visitor_risk_profile_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitor Risk Profile");
    XLSX.writeFile(wb, "visitor_risk_profile_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Visitor Risk Profile</h4>
      <div className="dashboard-container">
        {/* Main Filter Buttons */}
        <div className="flex-wrap gap-2 mb-3">
          {mainFilters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`main-filter-button ${
                activeFilter === filter ? "active" : ""
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Right side action buttons */}
        <div className="flex-wrap gap-2 justify-content-between">
          <div className="flex-wrap gap-2">
            <UnitFilter />
            <StatusFilter />
            <DeskFilter />
            <PropertyFilter />
            <DateHourFilter />
          </div>
          <div className="exportBtn">
            <button
              className="secondary-button"
              onClick={exportPDF}
              style={{ marginRight: "5px" }}
            >
              <ExportIcon />
              Export PDF
            </button>
            <button className="secondary-button" onClick={exportExcel}>
              <ExportIcon />
              Export Excel
            </button>
          </div>
        </div>
      </div>

      <hr className="hrLine" />
      {/* Data Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th className="table-cell">Visitor Name</th>
              <th className="table-cell">Visit Purpose</th>
              <th className="table-cell">Risk Level</th>
              <th className="table-cell">Status</th>
              <th className="table-cell">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.VisitorName}</td>
                <td className="table-cell">{row.VisitPurpose}</td>
                <td className="table-cell">{row.RiskLevel}</td>
                <td className="table-cell">{row.Status}</td>
                <td className="table-cell">{row.Remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Results Count */}
        <div className="text-gray-500 text-sm mb-4">
          {tableData.length} results
        </div>
      </div>
    </div>
  );
};

export default VisitorRiskProfile;
