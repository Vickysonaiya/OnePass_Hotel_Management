// import React from 'react';

// const ResponseSLAClosureTimes = () => (
//   <div className="header_title">
//       <h4 className="mb-3">Response SLA & Times</h4>
//   </div>
// );

// export default ResponseSLAClosureTimes;

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

const ResponseSLAClosureTimes = () => {
  const [activeFilter, setActiveFilter] = useState("Within SLA");

  const mainFilters = [
    "Within SLA",
    "Breached SLA",
    "Pending Response",
    "Critical",
    "Acknowledged",
  ];

  const tableData = [
    {
      id: 1,
      RequestTime: "Aug 8, 3:00 PM",
      RequestType: "Maintenance",
      AssignedTo: "John Doe",
      SLA: "2 hrs",
      ActualResponseTime: "1 hr 30 min",
      Status: "Within SLA",
    },
    {
      id: 2,
      RequestTime: "Aug 8, 1:15 PM",
      RequestType: "Security Incident",
      AssignedTo: "Sarah Lee",
      SLA: "1 hr",
      ActualResponseTime: "1 hr 20 min",
      Status: "Breached SLA",
    },
    {
      id: 3,
      RequestTime: "Aug 8, 4:45 PM",
      RequestType: "Cleaning Request",
      AssignedTo: "David Kim",
      SLA: "3 hrs",
      ActualResponseTime: "2 hrs 50 min",
      Status: "Within SLA",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Response SLA & Times Report", 14, 10);

    const tableColumn = [
      "Request Time",
      "Request Type",
      "Assigned To",
      "SLA",
      "Actual Response Time",
      "Status",
    ];

    const tableRows = tableData.map((row) => [
      row.RequestTime,
      row.RequestType,
      row.AssignedTo,
      row.SLA,
      row.ActualResponseTime,
      row.Status,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("response_sla_times_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Response SLA & Times");
    XLSX.writeFile(wb, "response_sla_times_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Response SLA & Times</h4>
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
              <th className="table-cell">Request Time</th>
              <th className="table-cell">Request Type</th>
              <th className="table-cell">Assigned To</th>
              <th className="table-cell">SLA</th>
              <th className="table-cell">Actual Response Time</th>
              <th className="table-cell">Status</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">{row.RequestTime}</td>
                <td className="table-cell">{row.RequestType}</td>
                <td className="table-cell">{row.AssignedTo}</td>
                <td className="table-cell">{row.SLA}</td>
                <td className="table-cell">{row.ActualResponseTime}</td>
                <td className="table-cell">{row.Status}</td>
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

export default ResponseSLAClosureTimes;
