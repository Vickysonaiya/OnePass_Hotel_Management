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

const FrequentVisitorWatchlist = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Under Review", "Flagged", "Cleared"];

  const tableData = [
    {
      id: 1,
      VisitDate: "Aug 9, 9:15 AM",
      VisitorName: "Michael Brown",
      VisitCount: 35,
      LastVisit: "Aug 8, 5:45 PM",
      RiskLevel: "High",
      Status: "Flagged",
      Notes: "Visited multiple sensitive areas frequently",
    },
    {
      id: 2,
      VisitDate: "Aug 9, 10:30 AM",
      VisitorName: "Jessica Taylor",
      VisitCount: 28,
      LastVisit: "Aug 7, 3:20 PM",
      RiskLevel: "Medium",
      Status: "Under Review",
      Notes: "Frequent unaccompanied visits to restricted floors",
    },
    {
      id: 3,
      VisitDate: "Aug 9, 11:00 AM",
      VisitorName: "William Harris",
      VisitCount: 20,
      LastVisit: "Aug 6, 2:00 PM",
      RiskLevel: "Low",
      Status: "Cleared",
      Notes: "Regular vendor deliveries",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Frequent Visitor Watchlist Report", 14, 10);

    const tableColumn = [
      "Visit Date",
      "Visitor Name",
      "Visit Count",
      "Last Visit",
      "Risk Level",
      "Status",
      "Notes",
    ];

    const tableRows = tableData.map((row) => [
      row.VisitDate,
      row.VisitorName,
      row.VisitCount,
      row.LastVisit,
      row.RiskLevel,
      row.Status,
      row.Notes,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("frequent_visitor_watchlist_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Frequent Visitor Watchlist");
    XLSX.writeFile(wb, "frequent_visitor_watchlist_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Frequent Visitor Watchlist</h4>
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
              <th>Visit Date</th>
              <th>Visitor Name</th>
              <th>Visit Count</th>
              <th>Last Visit</th>
              <th>Risk Level</th>
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
                <td>{row.VisitDate}</td>
                <td>{row.VisitorName}</td>
                <td>{row.VisitCount}</td>
                <td>{row.LastVisit}</td>
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

export default FrequentVisitorWatchlist;
