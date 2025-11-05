import React, { useRef, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import "./dashboard.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const kpis = [
  { title: "Total Properties", value: 42, color: "", icon: "👥" },
  {
    title: "Total Check-ins (Current Month)",
    value: 26,
    color: "",
    icon: "🏢",
  },
  { title: "Total Credits (Remaining)", value: 2, color: "", icon: "⏳" },
  {
    title: "Average Credit Consumption per Day",
    value: 1,
    color: "",
    icon: "🚨",
  },
];

// Sample table data
const initialTableData = [
  {
    id: 1,
    propertyName: "Grand Plaza Hotel",
    location: "New York, NY",
    propertyId: "GP001",
    totalRooms: 150,
    activeCheckins: 45,
  },
  {
    id: 2,
    propertyName: "Sunset Resort",
    location: "Miami, FL",
    propertyId: "SR002",
    totalRooms: 200,
    activeCheckins: 89,
  },
  {
    id: 3,
    propertyName: "Mountain View Inn",
    location: "Denver, CO",
    propertyId: "MV003",
    totalRooms: 80,
    activeCheckins: 32,
  },
  {
    id: 4,
    propertyName: "Ocean Breeze Suites",
    location: "San Diego, CA",
    propertyId: "OB004",
    totalRooms: 120,
    activeCheckins: 67,
  },
  {
    id: 5,
    propertyName: "City Center Hotel",
    location: "Chicago, IL",
    propertyId: "CC005",
    totalRooms: 180,
    activeCheckins: 54,
  },
  {
    id: 6,
    propertyName: "Heritage Palace",
    location: "Boston, MA",
    propertyId: "HP006",
    totalRooms: 95,
    activeCheckins: 28,
  },
  {
    id: 7,
    propertyName: "Lakeside Retreat",
    location: "Seattle, WA",
    propertyId: "LR007",
    totalRooms: 60,
    activeCheckins: 18,
  },
  {
    id: 8,
    propertyName: "Desert Oasis",
    location: "Phoenix, AZ",
    propertyId: "DO008",
    totalRooms: 110,
    activeCheckins: 42,
  },
];

export default function Dashboard() {
  const chartRef = useRef(null);
  const [tableData, setTableData] = useState(initialTableData);
  const [filters, setFilters] = useState({
    propertyName: "",
    location: "",
    propertyId: "",
    totalRooms: "",
    activeCheckins: "",
  });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Filter handler
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Sort handler
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...tableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setTableData(sortedData);
  };

  // Apply filters
  const filteredData = tableData.filter((item) => {
    return (
      item.propertyName
        .toLowerCase()
        .includes(filters.propertyName.toLowerCase()) &&
      item.location.toLowerCase().includes(filters.location.toLowerCase()) &&
      item.propertyId
        .toLowerCase()
        .includes(filters.propertyId.toLowerCase()) &&
      (filters.totalRooms === "" ||
        item.totalRooms.toString().includes(filters.totalRooms)) &&
      (filters.activeCheckins === "" ||
        item.activeCheckins.toString().includes(filters.activeCheckins))
    );
  });

  const barChartData = {
    labels: [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
      "6 PM",
    ],
    datasets: [
      {
        label: "Visitors",
        data: [2, 10, 5, 15, 4, 3, 8, 4, 6, 9],
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradient.addColorStop(0, "#2196f3");
          gradient.addColorStop(0.5, "rgba(33,150,243,1)");
          gradient.addColorStop(1, "rgba(33,150,243,0.3)");
          return gradient;
        },
        borderRadius: { topLeft: 22, topRight: 22 },
        borderSkipped: false,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Hourly Reservations",
        font: { size: 20, weight: "bold" },
        color: "#0d47a1",
      },
      tooltip: {
        backgroundColor: "#fff",
        titleColor: "#0d47a1",
        bodyColor: "#333",
        borderColor: "#42a5f5",
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `${context.parsed.y} visitors`;
          },
        },
      },
      datalabels: {
        color: "#000",
        font: { weight: "bold", size: 14 },
        anchor: "end",
        align: "top",
        formatter: (value) => value,
      },
    },
    animation: {
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default") {
          delay = context.dataIndex * 150;
        }
        return delay;
      },
      duration: 1000,
      easing: "easeOutQuart",
      animateScale: true,
      animateRotate: false,
    },
    scales: {
      x: {
        ticks: { color: "#555", font: { size: 14, weight: "bold" } },
        grid: { display: false },
      },
      y: {
        ticks: { color: "#555", font: { size: 14, weight: "bold" } },
        grid: { color: "rgba(0,0,0,0.05)" },
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Reservations",
          font: { size: 14, weight: "bold" },
        },
      },
    },
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <h2>Security Command Dashboard</h2>
      </header>

      <div className="kpi-grid">
        {kpis.map((kpi, index) => (
          <div key={index} className={`kpi-card ${kpi.color}`}>
            <span className="kpi-icon">{kpi.icon}</span>
            <div>
              <h5>{kpi.title}</h5>
              <span className="kpi-value">{kpi.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="table-section">
        <div className="table-header">
          <h3>Properties Overview</h3>
          <div className="table-controls">
            <button className="export-btn">Export CSV</button>
            <button className="refresh-btn">Refresh Data</button>
          </div>
        </div>

        <div className="table-container">
          <table className="properties-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("propertyName")}>
                  Property Name
                  {sortConfig.key === "propertyName" && (
                    <span className="sort-indicator">
                      {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort("location")}>
                  Location
                  {sortConfig.key === "location" && (
                    <span className="sort-indicator">
                      {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort("propertyId")}>
                  Property ID
                  {sortConfig.key === "propertyId" && (
                    <span className="sort-indicator">
                      {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort("totalRooms")}>
                  Total Rooms
                  {sortConfig.key === "totalRooms" && (
                    <span className="sort-indicator">
                      {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
                <th onClick={() => handleSort("activeCheckins")}>
                  Active Check-ins (Today)
                  {sortConfig.key === "activeCheckins" && (
                    <span className="sort-indicator">
                      {sortConfig.direction === "asc" ? " ↑" : " ↓"}
                    </span>
                  )}
                </th>
              </tr>
              <tr className="filter-row">
                <td>
                  <input
                    type="text"
                    placeholder="Filter by name..."
                    value={filters.propertyName}
                    onChange={(e) =>
                      handleFilterChange("propertyName", e.target.value)
                    }
                    className="filter-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Filter by location..."
                    value={filters.location}
                    onChange={(e) =>
                      handleFilterChange("location", e.target.value)
                    }
                    className="filter-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Filter by ID..."
                    value={filters.propertyId}
                    onChange={(e) =>
                      handleFilterChange("propertyId", e.target.value)
                    }
                    className="filter-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Filter by rooms..."
                    value={filters.totalRooms}
                    onChange={(e) =>
                      handleFilterChange("totalRooms", e.target.value)
                    }
                    className="filter-input"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    placeholder="Filter by check-ins..."
                    value={filters.activeCheckins}
                    onChange={(e) =>
                      handleFilterChange("activeCheckins", e.target.value)
                    }
                    className="filter-input"
                  />
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((property) => (
                <tr key={property.id}>
                  <td>
                    <div className="property-name-cell">
                      <span className="property-avatar">
                        {property.propertyName.charAt(0)}
                      </span>
                      {property.propertyName}
                    </div>
                  </td>
                  <td>{property.location}</td>
                  <td>
                    <span className="property-id">{property.propertyId}</span>
                  </td>
                  <td>
                    <span className="rooms-count">{property.totalRooms}</span>
                  </td>
                  <td>
                    <div className="checkins-cell">
                      <span
                        className={`checkins-badge ${
                          property.activeCheckins > 50
                            ? "high"
                            : property.activeCheckins > 25
                            ? "medium"
                            : "low"
                        }`}
                      >
                        {property.activeCheckins}
                      </span>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${
                              (property.activeCheckins / property.totalRooms) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="no-data-message">
              No properties found matching the current filters.
            </div>
          )}
        </div>

        <div className="table-footer">
          <div className="table-info">
            Showing {filteredData.length} of {initialTableData.length}{" "}
            properties
          </div>
        </div>
      </div>

      <div className="main-grid">
        <div className="widget-card wide">
          <Bar ref={chartRef} data={barChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Properties Table Section */}
    </div>
  );
}
