// import React from 'react';

// const VisitorLoadBalancing = () => (
//   <div className="header_title">
//       <h4 className="mb-3">Visitor Load Balancing</h4>
//   </div>
// );

// export default VisitorLoadBalancing;

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

const VisitorLoadBalancing = () => {
  const [activeFilter, setActiveFilter] = useState("Normal");

  const mainFilters = [
    "Normal",
    "High Traffic",
    "Overloaded",
    "Underutilized",
    "Idle",
  ];

  const tableData = [
    {
      id: 1,
      Zone: "Lobby",
      CurrentVisitors: 25,
      Capacity: 50,
      LoadStatus: "Normal",
      Remarks: "Smooth flow",
    },
    {
      id: 2,
      Zone: "Conference Hall A",
      CurrentVisitors: 85,
      Capacity: 100,
      LoadStatus: "High Traffic",
      Remarks: "Event in progress",
    },
    {
      id: 3,
      Zone: "Cafeteria",
      CurrentVisitors: 120,
      Capacity: 80,
      LoadStatus: "Overloaded",
      Remarks: "Lunch rush",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Visitor Load Balancing Report", 14, 10);

    const tableColumn = [
      "Zone",
      "Current Visitors",
      "Capacity",
      "Load Status",
      "Remarks",
    ];

    const tableRows = tableData.map((row) => [
      row.Zone,
      row.CurrentVisitors,
      row.Capacity,
      row.LoadStatus,
      row.Remarks,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("visitor_load_balancing_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visitor Load Balancing");
    XLSX.writeFile(wb, "visitor_load_balancing_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Visitor Load Balancing</h4>
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
              <th className="table-cell">Zone</th>
              <th className="table-cell">Current Visitors</th>
              <th className="table-cell">Capacity</th>
              <th className="table-cell">Load Status</th>
              <th className="table-cell">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.Zone}</td>
                <td className="table-cell">{row.CurrentVisitors}</td>
                <td className="table-cell">{row.Capacity}</td>
                <td className="table-cell">{row.LoadStatus}</td>
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

export default VisitorLoadBalancing;
