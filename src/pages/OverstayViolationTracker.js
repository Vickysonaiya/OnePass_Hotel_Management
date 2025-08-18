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

const OverstayViolationTracker = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Resolved", "Unresolved", "Flagged"];

  const tableData = [
    {
      id: 1,
      VisitorName: "John Doe",
      Unit: "A-101",
      AllowedTime: "2 hrs",
      ActualTime: "3 hrs 15 min",
      Overstay: "1 hr 15 min",
      Status: "Unresolved",
      Date: "Aug 9, 2025",
    },
    {
      id: 2,
      VisitorName: "Maria Lopez",
      Unit: "B-210",
      AllowedTime: "1 hr",
      ActualTime: "1 hr 5 min",
      Overstay: "5 min",
      Status: "Resolved",
      Date: "Aug 9, 2025",
    },
    {
      id: 3,
      VisitorName: "Ahmed Khan",
      Unit: "C-303",
      AllowedTime: "3 hrs",
      ActualTime: "4 hrs 50 min",
      Overstay: "1 hr 50 min",
      Status: "Flagged",
      Date: "Aug 8, 2025",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Overstay Violation Tracker", 14, 10);

    const tableColumn = [
      "Visitor Name",
      "Unit",
      "Allowed Time",
      "Actual Time",
      "Overstay",
      "Status",
      "Date",
    ];

    const tableRows = tableData.map((row) => [
      row.VisitorName,
      row.Unit,
      row.AllowedTime,
      row.ActualTime,
      row.Overstay,
      row.Status,
      row.Date,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("overstay_violation_tracker.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Overstay Violations");
    XLSX.writeFile(wb, "overstay_violation_tracker.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Overstay Violation Tracker</h4>
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

        {/* Right side filters and export */}
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
              <th>Visitor Name</th>
              <th>Unit</th>
              <th>Allowed Time</th>
              <th>Actual Time</th>
              <th>Overstay</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.VisitorName}</td>
                <td>{row.Unit}</td>
                <td>{row.AllowedTime}</td>
                <td>{row.ActualTime}</td>
                <td>{row.Overstay}</td>
                <td>{row.Status}</td>
                <td>{row.Date}</td>
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

export default OverstayViolationTracker;
