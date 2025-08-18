// import React, { useState, useRef, useEffect } from "react";
// import "./UnitFilter.css";

// const UnitFilter = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedUnits, setSelectedUnits] = useState([
//     "Unit A",
//     "Unit B",
//     "Unit C",
//     "Unit D",
//   ]);
//   const [options] = useState(["Unit A", "Unit B", "Unit C", "Unit D"]);
//   const dropdownRef = useRef(null);

//   const toggleDropdown = () => {
//     setIsOpen(!isOpen);
//   };

//   const handleCheckboxChange = (unit) => {
//     setSelectedUnits((prev) =>
//       prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]
//     );
//   };

//   const handleApply = () => {
//     console.log("Applied Filters:", selectedUnits);
//     setIsOpen(false);
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   return (
//     <div className="unit-filter-container" ref={dropdownRef}>
//       <button className="unit-filter-btn" onClick={toggleDropdown}>
//         Unit Filter
//       </button>

//       {isOpen && (
//         <div className="unit-filter-dropdown">
//           <h4>Filter by Unit</h4>
//           {options.map((unit) => (
//             <label key={unit} className="checkbox-label">
//               <input
//                 type="checkbox"
//                 checked={selectedUnits.includes(unit)}
//                 onChange={() => handleCheckboxChange(unit)}
//               />
//               <span>{unit}</span>
//             </label>
//           ))}
//           <button className="apply-btn" onClick={handleApply}>
//             Apply
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UnitFilter;

// --**--

import React, { useState, useRef, useEffect } from "react";
import "./UnitFilter.css";

const UnitFilter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUnits, setSelectedUnits] = useState([
    "Unit A",
    "Unit B",
    "Unit C",
    "Unit D",
  ]);
  const [options] = useState(["Unit A", "Unit B", "Unit C", "Unit D"]);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleBackClick = () => {
    setIsOpen(false);
  };

  const handleCheckboxChange = (unit) => {
    setSelectedUnits((prev) =>
      prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]
    );
  };

  const handleApply = () => {
    console.log("Applied Filters:", selectedUnits);
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
        Unit Filter
      </button>

      {isOpen && (
        <div className="unit-filter-dropdown">
          <div className="filter-header">
            <button className="back-btn" onClick={handleBackClick}>
              ←
            </button>
            <h4>Filter by Dispute status</h4>
          </div>

          {options.map((unit) => (
            <label key={unit} className="checkbox-label">
              <input
                type="checkbox"
                checked={selectedUnits.includes(unit)}
                onChange={() => handleCheckboxChange(unit)}
              />
              <span>{unit}</span>
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

export default UnitFilter;
