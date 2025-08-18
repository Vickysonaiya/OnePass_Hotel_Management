import React, { useState, useRef, useEffect } from "react";
import "./StatusFilter.css"; // ✅ Reuse same styling

const StatusFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([
    "Checked-in",
    "Scheduled",
    "Walk-in",
    "Overstay",
    "Checked-out",
  ]);
  const [options] = useState([
    "Checked-in",
    "Scheduled",
    "Walk-in",
    "Overstay",
    "Checked-out",
  ]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackClick = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const handleApply = () => {
    console.log("Applied Status Filters:", selectedStatuses);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="unit-filter-container" ref={dropdownRef}>
      <button className="unit-filter-btn" onClick={toggleDropdown}>
        Status Filter
      </button>

      {isOpen && (
        <div className="unit-filter-dropdown">
          {/* <h4>Filter by Status</h4> */}
          <div className="filter-header">
            <button className="back-btn" onClick={handleBackClick}>
              ←
            </button>
            <h4>Filter by Dispute status</h4>
          </div>
          {options.map((status) => (
            <label key={status} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedStatuses.includes(status)}
                onChange={() => handleCheckboxChange(status)}
              />
              <span>{status}</span>
            </label>
          ))}
          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default StatusFilter;
