import React, { useState, useRef, useEffect } from "react";
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
import testData from "../../testData.json";
import "@fontsource/inter/400.css";

const formatDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
};

const mockData = testData;

const EvidenceFilter = () => {
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
  const [filteredData, setFilteredData] = useState([]);

  // Autofocus refs
  const singleDateRef = useRef(null);
  const startDateRef = useRef(null);
  const endDateRef = useRef(null);

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
  }, [filterVisible, filter]);

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

  const handleDateFieldInteraction = (field, value) => {
    if (!filterVisible || filter === "is in the last") return;
    setActiveField(field);
    setTempDate(value);
    setOpenCalendar(true);
  };

  const applyFilter = () => {
    const now = new Date();
    const results = mockData.filter((item) => {
      const itemDate = new Date(item.evidenceDueBy);

      switch (filter) {
        case "is equal to":
          return itemDate.toDateString() === new Date(date).toDateString();

        case "is after":
          return itemDate > new Date(date);

        case "is on or after":
          return itemDate >= new Date(date);

        case "is before or on":
          return (
            itemDate.setHours(0, 0, 0, 0) <=
            new Date(date).setHours(23, 59, 59, 999)
          );

        case "is between":
          return (
            itemDate >= new Date(startDate).setHours(0, 0, 0, 0) &&
            itemDate <= new Date(endDate).setHours(23, 59, 59, 999)
          );

        case "is in the last":
          const amount = parseInt(lastValue, 10) || 0;
          const fromDate = new Date();
          if (lastUnit === "days")
            fromDate.setDate(fromDate.getDate() - amount);
          if (lastUnit === "months")
            fromDate.setMonth(fromDate.getMonth() - amount);
          if (lastUnit === "hours")
            fromDate.setHours(fromDate.getHours() - amount);
          return itemDate >= fromDate && itemDate <= now;

        default:
          return true;
      }
    });

    setFilteredData(results);
    setFilterVisible(false);
    setOpenCalendar(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 0, width: 330 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* 🔹 Relative wrapper for button + popup */}
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <Box ref={toggleButtonRef} sx={{ fontFamily: "Inter, sans-serif" }}>
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
                  fontFamily: "Inter, sans-serif",
                  borderRadius: "30px",
                  textTransform: "none",
                  paddingY: "4px",
                  paddingX: "12px",
                  borderColor: "#ccc",
                  backgroundColor: "#f8f8f8",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  maxWidth: "100%",
                }}
              >
                <span
                  style={{
                    fontSize: "14px",
                    color: "#444",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  ✕ Evidence due by
                </span>
                <span
                  title={getFilterLabel()}
                  style={{
                    fontWeight: 500,
                    color: "#333",
                    maxWidth: "160px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    fontFamily: "Inter, sans-serif",
                  }}
                >
                  | {getFilterLabel()}
                </span>
                <ExpandMore sx={{ fontSize: 18 }} />
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

                  if (!isInsidePopover && !isInsidePanel && !isInsideButton) {
                    setFilterVisible(false);
                    setOpenCalendar(false);
                  }
                }}
              >
                <Box
                  id="evidence-filter-panel"
                  sx={{
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
                    fontFamily: "Inter, sans-serif",
                    "*": { fontFamily: "Inter, sans-serif !important" },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    fontFamily={"Inter, sans-serif"}
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
                      }}
                    >
                      <MenuItem value="is in the last">is in the last</MenuItem>
                      <MenuItem value="is equal to">is equal to</MenuItem>
                      <MenuItem value="is between">is between</MenuItem>
                      <MenuItem value="is on or after">is on or after</MenuItem>
                      <MenuItem value="is before or on">
                        is before or on
                      </MenuItem>
                      <MenuItem value="is after">is after</MenuItem>
                    </Select>
                  </FormControl>

                  {filter === "is in the last" ? (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                        sx={{ width: "100px" }}
                      />
                      <FormControl size="small" sx={{ width: "100px" }}>
                        <Select
                          value={lastUnit}
                          onChange={(e) => setLastUnit(e.target.value)}
                          displayEmpty
                          variant="outlined"
                          sx={{ height: 40 }}
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
                      <CalendarToday sx={{ color: "gray", fontSize: 20 }} />
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
                        }}
                      />

                      <Typography sx={{ fontSize: "12px", color: "#666" }}>
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
                        }}
                      />
                    </Box>
                  ) : (
                    <Box
                      className="calendar-input"
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <BiUndo
                        size={25}
                        color="#1B3631"
                        style={{ transform: "scaleX(1) rotate(180deg)" }}
                      />
                      <CalendarToday sx={{ color: "gray", fontSize: 20 }} />
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
                        InputProps={{ sx: { height: 40 } }}
                        sx={{
                          width: "120px",
                          "& fieldset": { borderColor: "#ccc" },
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
  );
};

export default EvidenceFilter;
