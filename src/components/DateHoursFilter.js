import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  FormControl,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import { CalendarToday, ExpandMore } from "@mui/icons-material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DateCalendar } from "@mui/x-date-pickers";
import { BiUndo } from "react-icons/bi";
import { HiOutlineDownload } from "react-icons/hi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const EvidenceFilter = ({ records }) => {
  const [filter, setFilter] = useState("is after");
  const [date, setDate] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [tempDate, setTempDate] = useState(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null);
  const [filterVisible, setFilterVisible] = useState(false);

  const toggleButtonRef = useRef(null);

  const [lastValue, setLastValue] = useState("");
  const [lastUnit, setLastUnit] = useState("days");

  // Autofocus refs
  const singleDateRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

  const systemFont = `-apple-system, BlinkMacSystemFont, "Segoe UI", "Helvetica Neue", Arial, sans-serif`;

  const filterShortNames = {
    "is in the last": "Last",
    "is equal to": "On",
    "is between": "Between",
    "is on or after": "From",
    "is before or on": "Until",
    "is after": "After",
  };

  const getFilterLabel = () => {
    const short = filterShortNames[filter] || filter;

    if (filter === "is in the last") {
      return `${short} ${lastValue || 0} ${lastUnit}`;
    }

    if (filter === "is between" && startDate && endDate) {
      return `${short} ${formatDate(startDate)} - ${formatDate(endDate)}`;
    }

    if (
      (filter === "is equal to" ||
        filter === "is after" ||
        filter === "is on or after" ||
        filter === "is before or on") &&
      date
    ) {
      return `${short} ${formatDate(date)}`;
    }

    return short;
  };

  useEffect(() => {
    setOpenCalendar(false);
    if (filter === "is after") {
      const today = new Date();
      setDate(today);
      setTempDate(today);
    } else {
      setDate(null);
      setStartDate(null);
      setEndDate(null);
      setTempDate(null);
    }
  }, [filter]);

  const handleDateFieldInteraction = useCallback(
    (field, value) => {
      if (!filterVisible || filter === "is in the last") return;
      setActiveField(field);
      setTempDate(value);
      setOpenCalendar(true);
    },
    [filterVisible, filter]
  );

  useEffect(() => {
    if (filterVisible) {
      const timeout = setTimeout(() => {
        if (filter === "is between") {
          startDateRef.current?.focus({ preventScroll: true });
          handleDateFieldInteraction("start", startDate);
        } else if (filter !== "is in the last") {
          singleDateRef.current?.focus({ preventScroll: true });
          handleDateFieldInteraction("single", date);
        }
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [filterVisible, filter, date, startDate, handleDateFieldInteraction]);

  const handleAccept = (newValue) => {
    if (filter === "is between") {
      if (activeField === "start") setStartDate(newValue);
      else if (activeField === "end") setEndDate(newValue);
    } else {
      setDate(newValue);
    }
  };

  const getAnchorEl = () => {
    if (filter === "is between") {
      return activeField === "start"
        ? document.getElementById("start-date-input")
        : document.getElementById("end-date-input");
    } else {
      return singleDateRef.current;
    }
  };

  const applyFilter = () => {
    setFilterVisible(false);
    setOpenCalendar(false);
  };
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(records);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "VerifiedGuests");
    XLSX.writeFile(workbook, "verified_guest_records.xlsx");
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Verified Guest Check-In Records", 14, 16);
    autoTable(doc, {
      startY: 22,
      head: [
        [
          "Hotel",
          "Reservation Number",
          "Guest Name",
          "Phone Number",
          "Verification Status",
          "Face Match Result",
          "Check-In Timestamp",
          "Staff Name",
        ],
      ],
      body: records.map((r) => [
        r.hotel,
        r.reservation,
        r.name,
        r.phone,
        r.verification,
        r.faceMatch,
        r.checkIn,
        r.staffName,
      ]),
    });
    doc.save("verified_guest_records.pdf");
  };
  return (
    <>
      <div className="d-flex align-items-center justify-content-between mb-3 flex-wrap gap-2">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box sx={{ p: 0, width: 330, fontFamily: systemFont }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              {/* 🔹 Relative wrapper for button + popup */}
              <Box sx={{ position: "relative", display: "inline-block" }}>
                <Box ref={toggleButtonRef} sx={{ fontFamily: systemFont }}>
                  <Button
                    onClick={() => {
                      setFilterVisible((prev) => {
                        const newValue = !prev;
                        if (!newValue) setOpenCalendar(false);
                        return newValue;
                      });
                    }}
                    variant="outlined"
                    sx={{
                      fontFamily: systemFont,
                      borderRadius: "30px",
                      textTransform: "none",
                      paddingY: "6px",
                      paddingX: "12px",
                      borderColor: "#ccc",
                      backgroundColor: "#f8f8f8",
                      fontSize: "12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      maxWidth: "100%",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#444",
                        fontFamily: systemFont,
                      }}
                    >
                      ✕ Evidence due by
                    </span>
                    <span
                      title={getFilterLabel()}
                      style={{
                        fontFamily: systemFont,
                        fontWeight: 600,
                        color: "#333",
                        maxWidth: "160px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        display: "inline-block",
                      }}
                    >
                      | {getFilterLabel()}
                    </span>
                    <ExpandMore sx={{ fontSize: 18, fontWeight: "600" }} />
                  </Button>
                </Box>

                {filterVisible && (
                  <ClickAwayListener
                    mouseEvent="onMouseDown"
                    onClickAway={(event) => {
                      const isInsidePopover =
                        !!event?.target?.closest(".MuiPopover-root");
                      const isInsidePanel = !!event?.target?.closest(
                        "#evidence-filter-panel"
                      );
                      const isInsideButton = toggleButtonRef.current?.contains(
                        event.target
                      );

                      if (
                        !isInsidePopover &&
                        !isInsidePanel &&
                        !isInsideButton
                      ) {
                        setFilterVisible(false);
                        setOpenCalendar(false);
                      }
                    }}
                  >
                    <Box
                      id="evidence-filter-panel"
                      sx={{
                        fontFamily: systemFont,
                        position: "absolute",
                        top: "calc(100% + 8px)",
                        left: 0,
                        zIndex: 1300,
                        p: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        backgroundColor: "#fff",
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        minWidth: "300px", // ✅ Added minimum width
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        fontSize={14}
                        fontWeight="600"
                        sx={{ fontFamily: systemFont }}
                      >
                        Filter by Evidence due by
                      </Typography>

                      <FormControl fullWidth size="small">
                        <Select
                          value={filter}
                          onChange={(e) => setFilter(e.target.value)}
                          variant="outlined"
                          displayEmpty
                          sx={{
                            ".MuiOutlinedInput-notchedOutline": {
                              border: "1px solid #ccc",
                            },
                            height: 40,
                            fontSize: "14px",
                            fontWeight: 600,
                          }}
                        >
                          <MenuItem value="is in the last">
                            is in the last
                          </MenuItem>
                          <MenuItem value="is equal to">is equal to</MenuItem>
                          <MenuItem value="is between">is between</MenuItem>
                          <MenuItem value="is on or after">
                            is on or after
                          </MenuItem>
                          <MenuItem value="is before or on">
                            is before or on
                          </MenuItem>
                          <MenuItem value="is after">is after</MenuItem>
                        </Select>
                      </FormControl>

                      {filter === "is in the last" ? (
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <BiUndo
                            size={25}
                            color="#2D9CDB"
                            style={{ transform: "scaleX(1) rotate(180deg)" }}
                          />
                          <TextField
                            inputMode="numeric"
                            value={lastValue}
                            onChange={(e) => setLastValue(e.target.value)}
                            variant="outlined"
                            size="small"
                            sx={{ width: "100px", fontFamily: systemFont }}
                          />
                          <FormControl size="small" sx={{ width: "100px" }}>
                            <Select
                              value={lastUnit}
                              onChange={(e) => setLastUnit(e.target.value)}
                              displayEmpty
                              variant="outlined"
                              sx={{ height: 40, fontFamily: systemFont }}
                            >
                              <MenuItem value="hours">hours</MenuItem>
                              <MenuItem value="days">days</MenuItem>
                              <MenuItem value="months">months</MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      ) : filter === "is between" ? (
                        <Box
                          className="calendar-input"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <BiUndo
                            size={25}
                            color="#2D9CDB"
                            style={{ transform: "scaleX(1) rotate(180deg)" }}
                          />
                          <CalendarToday
                            sx={{
                              color: "gray",
                              fontSize: 20,
                              fontFamily: systemFont,
                            }}
                          />
                          <TextField
                            id="start-date-input"
                            size="small"
                            value={formatDate(startDate)}
                            inputRef={startDateRef}
                            onFocus={() =>
                              handleDateFieldInteraction("start", startDate)
                            }
                            onClick={() =>
                              handleDateFieldInteraction("start", startDate)
                            }
                            autoComplete="off"
                            InputProps={{ sx: { height: 40 } }}
                            sx={{
                              width: "120px",
                              "& fieldset": { borderColor: "#ccc" },
                              fontFamily: systemFont,
                              fontSize: "14px !important",
                              fontWeight: 600,
                            }}
                          />

                          <Typography
                            sx={{
                              fontSize: "14px !important",
                              fontWeight: 600,
                              color: "#666",
                              fontFamily: systemFont,
                            }}
                          >
                            and
                          </Typography>

                          <TextField
                            id="end-date-input"
                            size="small"
                            value={formatDate(endDate)}
                            inputRef={endDateRef}
                            onFocus={() =>
                              handleDateFieldInteraction("end", endDate)
                            }
                            onClick={() =>
                              handleDateFieldInteraction("end", endDate)
                            }
                            autoComplete="off"
                            InputProps={{ sx: { height: 40 } }}
                            sx={{
                              width: "120px",
                              "& fieldset": { borderColor: "#ccc" },
                              fontFamily: systemFont,
                              fontSize: "14px !important",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          className="calendar-input"
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            fontSize: "14px !important",
                            fontFamily: systemFont,
                            fontWeight: 600,
                          }}
                        >
                          <BiUndo
                            size={25}
                            color="#1B3631"
                            style={{ transform: "scaleX(1) rotate(180deg)" }}
                          />
                          <CalendarToday
                            sx={{
                              color: "gray",
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: systemFont,
                            }}
                          />
                          <TextField
                            size="small"
                            inputRef={singleDateRef}
                            value={formatDate(date)}
                            onFocus={() =>
                              handleDateFieldInteraction("single", date)
                            }
                            onClick={() =>
                              handleDateFieldInteraction("single", date)
                            }
                            autoComplete="off"
                            InputProps={{
                              sx: {
                                height: 40,
                                "& input": {
                                  fontSize: "14px", // ✅ applies font size to input text
                                  fontWeight: 400,
                                },
                              },
                            }}
                            sx={{
                              width: "120px",
                              "& fieldset": { borderColor: "#ccc" },
                              fontSize: "14px !important",
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      )}

                      <Popper
                        open={openCalendar}
                        anchorEl={getAnchorEl()}
                        placement="bottom-start"
                        style={{ zIndex: 1300 }}
                      >
                        <Paper elevation={3}>
                          <DateCalendar
                            value={tempDate}
                            onChange={(newValue) => {
                              setTempDate(newValue);
                              handleAccept(newValue);
                              setOpenCalendar(false); // ✅ auto-close when date is picked
                            }}
                            sx={{
                              "& .MuiTypography-root": {
                                fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
                                fontSize: "14px",
                              },
                              "& .MuiPickersDay-root": {
                                fontSize: "14px", // dates inside the calendar
                                fontFamily: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`,
                              },
                            }}
                          />
                        </Paper>
                      </Popper>

                      <Button
                        variant="contained"
                        onClick={applyFilter}
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#1B3631",
                          height: 40,
                          "&:hover": {
                            backgroundColor: "#1B3631",
                            fontWeight: 600,
                            fontSize: "14px !important",
                          },
                        }}
                      >
                        Apply
                      </Button>
                    </Box>
                  </ClickAwayListener>
                )}
              </Box>
            </Box>
          </Box>
        </LocalizationProvider>
        <div className="d-flex gap-2">
          <button className="pill-btn" onClick={exportCSV}>
            <HiOutlineDownload size={18} /> Export Excel
          </button>
          <button className="pill-btn" onClick={exportPDF}>
            <HiOutlineDownload size={18} /> Export PDF
          </button>
        </div>
      </div>
    </>
  );
};

export default EvidenceFilter;
