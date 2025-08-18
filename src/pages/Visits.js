import React, { useState } from "react";
import "./visits.css";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "jspdf-autotable";
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

const Visits = () => {
  const [activeFilter, setActiveFilter] = useState("Checked-in");

  const mainFilters = [
    "Checked-in",
    "Scheduled",
    "Walk-in",
    "Overstay",
    "Checked-out",
  ];

  const tableData = [
    {
      id: 1,
      CheckedinTime: "Aug 8, 3:00 PM",
      Host: "John Doe",
      Purpose: "Meeting",
      VisitType: "Invite",
      VisitStatus: "Guest-In",
      Guest: "Vicky",
      Company: "Technova ltd",
    },
    {
      id: 2,
      CheckedinTime: "Aug 18, 2:00 PM",
      Host: "Nick John",
      Purpose: "Interview",
      VisitType: "Invite",
      VisitStatus: "Guest-out",
      Guest: "Rahul",
      Company: "Innovent Solutions",
    },
    {
      id: 3,
      CheckedinTime: "Sep 2, 11:00 AM",
      Host: "Tom Smith",
      Purpose: "Meeting",
      VisitType: "Invite",
      VisitStatus: "Guest-In",
      Guest: "Vikas",
      Company: "NextGen Corp",
    },
    {
      id: 4,
      CheckedinTime: "Aug 23, 4:00 PM",
      Host: "Jimmy Doe",
      Purpose: "Interview",
      VisitType: "Invite",
      VisitStatus: "Guest-out",
      Guest: "Hafiz",
      Company: "CyberLink Pvt Ltd",
    },
    {
      id: 5,
      CheckedinTime: "Aug 15, 1:00 PM",
      Host: "Alice Johnson",
      Purpose: "Admission",
      VisitType: "Invite",
      VisitStatus: "Guest-In",
      Guest: "John",
      Company: "Skyline Ventures",
    },
  ];

  // Export as PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Visits Report", 14, 10);

    const tableColumn = [
      "Check-in Time",
      "Host",
      "Purpose",
      "Visit Type",
      "Visit Status",
      "Guest",
      "Company",
    ];

    const tableRows = tableData.map((row) => [
      row.CheckedinTime,
      row.Host,
      row.Purpose,
      row.VisitType,
      row.VisitStatus,
      row.Guest,
      row.Company,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("visits_report.pdf");
  };

  // Export as Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Visits");
    XLSX.writeFile(wb, "visits_report.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Visits</h4>
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
              <th className="table-cell">Check-in Time</th>
              <th className="table-cell">Host</th>
              <th className="table-cell">Purpose</th>
              <th className="table-cell">Visit Type</th>
              <th className="table-cell">Visit Status</th>
              <th className="table-cell">Guest</th>
              <th className="table-cell">Company</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr key={row.id} className="table-row">
                <td className="table-cell">
                  <div className="flex-wrap gap-1">{row.CheckedinTime}</div>
                </td>
                <td className="table-cell">
                  <span>{row.Host}</span>
                </td>
                <td className="table-cell">{row.Purpose}</td>
                <td className="table-cell">{row.VisitType}</td>
                <td className="table-cell">
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <span
                      style={{
                        width: "7px",
                        height: "7px",
                        borderRadius: "50%",
                        backgroundColor:
                          row.VisitStatus === "Guest-In" ? "green" : "red",
                        display: "inline-block",
                      }}
                    ></span>
                    {row.VisitStatus}
                  </span>
                </td>
                <td className="table-cell">{row.Guest}</td>
                <td className="table-cell">{row.Company}</td>
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

export default Visits;
