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

const HostSLABreach = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Warning", "Critical", "Resolved"];

  const tableData = [
    {
      id: 1,
      BreachTime: "Aug 8, 10:10 AM",
      VisitorName: "Robert Miller",
      HostName: "John Smith",
      SLA: "15 min",
      Delay: "20 min",
      Severity: "Critical",
      Status: "Pending",
      Notes: "Host did not arrive within SLA time",
    },
    {
      id: 2,
      BreachTime: "Aug 8, 1:45 PM",
      VisitorName: "Emily Johnson",
      HostName: "Sarah Lee",
      SLA: "10 min",
      Delay: "12 min",
      Severity: "Warning",
      Status: "Resolved",
      Notes: "Host was late due to meeting",
    },
    {
      id: 3,
      BreachTime: "Aug 8, 3:20 PM",
      VisitorName: "Daniel White",
      HostName: "Mark Davis",
      SLA: "5 min",
      Delay: "8 min",
      Severity: "Warning",
      Status: "Pending",
      Notes: "Security notified host twice",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Host SLA Breach Report", 14, 10);

    const tableColumn = [
      "Breach Time",
      "Visitor Name",
      "Host Name",
      "SLA",
      "Delay",
      "Severity",
      "Status",
      "Notes",
    ];

    const tableRows = tableData.map((row) => [
      row.BreachTime,
      row.VisitorName,
      row.HostName,
      row.SLA,
      row.Delay,
      row.Severity,
      row.Status,
      row.Notes,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("host_sla_breach_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Host SLA Breach");
    XLSX.writeFile(wb, "host_sla_breach_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Host SLA Breach</h4>
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
              <th>Breach Time</th>
              <th>Visitor Name</th>
              <th>Host Name</th>
              <th>SLA</th>
              <th>Delay</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.BreachTime}</td>
                <td>{row.VisitorName}</td>
                <td>{row.HostName}</td>
                <td>{row.SLA}</td>
                <td>{row.Delay}</td>
                <td>{row.Severity}</td>
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

export default HostSLABreach;
