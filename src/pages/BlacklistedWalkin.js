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

// Reuse Export Icon
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

const BlacklistedWalkIn = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Flagged", "Recently Added", "High Risk"];

  const tableData = [
    {
      id: 1,
      DetectedTime: "Aug 8, 10:15 AM",
      Name: "Robert Smith",
      Reason: "Prior incident",
      VisitType: "Walk-in",
      RiskLevel: "High",
      Status: "Blocked",
      Notes: "Attempted to enter main lobby",
    },
    {
      id: 2,
      DetectedTime: "Aug 8, 1:42 PM",
      Name: "Sarah Connor",
      Reason: "Security violation",
      VisitType: "Walk-in",
      RiskLevel: "Medium",
      Status: "Blocked",
      Notes: "Previously escorted out",
    },
    {
      id: 3,
      DetectedTime: "Aug 8, 3:10 PM",
      Name: "Jason Lee",
      Reason: "Harassment complaint",
      VisitType: "Walk-in",
      RiskLevel: "High",
      Status: "Blocked",
      Notes: "Known to staff",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Blacklisted Walk-in Report", 14, 10);

    const tableColumn = [
      "Detected Time",
      "Name",
      "Reason",
      "Visit Type",
      "Risk Level",
      "Status",
      "Notes",
    ];

    const tableRows = tableData.map((row) => [
      row.DetectedTime,
      row.Name,
      row.Reason,
      row.VisitType,
      row.RiskLevel,
      row.Status,
      row.Notes,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("blacklisted_walkin_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Blacklisted Walk-in");
    XLSX.writeFile(wb, "blacklisted_walkin_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Blacklisted Walk-in</h4>
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
              <th>Detected Time</th>
              <th>Name</th>
              <th>Reason</th>
              <th>Visit Type</th>
              <th>Risk Level</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td>{row.DetectedTime}</td>
                <td>{row.Name}</td>
                <td>{row.Reason}</td>
                <td>{row.VisitType}</td>
                <td>{row.RiskLevel}</td>
                <td>{row.Status}</td>
                <td>{row.Notes}</td>
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

export default BlacklistedWalkIn;
