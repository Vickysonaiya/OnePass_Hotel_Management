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

const PatrolSchedulePlanner = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const mainFilters = ["All", "Morning", "Afternoon", "Night"];

  const tableData = [
    {
      id: 1,
      GuardID: "G-101",
      Name: "Ravi Kumar",
      PatrolArea: "Main Gate",
      Shift: "Morning",
      Schedule: "Mon-Wed-Fri 06:00 - 10:00",
    },
    {
      id: 2,
      GuardID: "G-202",
      Name: "Suresh Patel",
      PatrolArea: "Lobby Entrance",
      Shift: "Afternoon",
      Schedule: "Tue-Thu-Sat 14:00 - 18:00",
    },
    {
      id: 3,
      GuardID: "G-303",
      Name: "Amit Sharma",
      PatrolArea: "Parking Lot",
      Shift: "Night",
      Schedule: "Daily 22:00 - 02:00",
    },
  ];

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Patrol Schedule Planner", 14, 10);

    const tableColumn = [
      "Guard ID",
      "Name",
      "Patrol Area",
      "Shift",
      "Schedule",
    ];
    const tableRows = tableData.map((row) => [
      row.GuardID,
      row.Name,
      row.PatrolArea,
      row.Shift,
      row.Schedule,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 20,
    });

    doc.save("patrol_schedule_planner.pdf");
  };

  // Export Excel
  const exportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(tableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Patrol Schedule Planner");
    XLSX.writeFile(wb, "patrol_schedule_planner.xlsx");
  };

  return (
    <div className="header_title">
      <h4 className="mb-3">Patrol Schedule Planner</h4>
      <div className="dashboard-container">
        {/* Main Filters */}
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

        {/* Filters & Export Buttons */}
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

      {/* Schedule Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr className="text-gray-500 text-sm">
              <th>Guard ID</th>
              <th>Name</th>
              <th>Patrol Area</th>
              <th>Shift</th>
              <th>Schedule</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
              <tr
                key={row.id}
                className={"table-row"}
              >
                <td>{row.GuardID}</td>
                <td>{row.Name}</td>
                <td>{row.PatrolArea}</td>
                <td>{row.Shift}</td>
                <td>{row.Schedule}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Row Count */}
        <div className="text-gray-500 text-sm mb-4">
          {tableData.length} results
        </div>
      </div>
    </div>
  );
};

export default PatrolSchedulePlanner;
