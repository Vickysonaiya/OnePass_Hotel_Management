import React, { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./locationsetup.css";
import {
  PlusCircle,
  Square,
  Delete,
  Pencil,
  Bluetooth,
  FileUp,
  X,
} from "lucide-react";

const FloorPlanEditor = () => {
  const [floorPlanImage, setFloorPlanImage] = useState(null);
  const [elements, setElements] = useState({ rooms: [] });
  const [selectedElement, setSelectedElement] = useState(null);
  const [currentMode, setCurrentMode] = useState("select");
  const [drawingPoints, setDrawingPoints] = useState([]);
  const [roomNameInput, setRoomNameInput] = useState("");
  const [editingRoomId, setEditingRoomId] = useState(null);
  const [beaconPopup, setBeaconPopup] = useState(null);
  const [beaconNameInput, setBeaconNameInput] = useState("");
  const svgRef = useRef(null);
  const isDragging = useRef(false);
  const dragInfo = useRef({});

  // Helper function to find a room by its ID
  const roomById = (id) =>
    elements.rooms.find((r) => r.id === id) || { bluetooths: [] };

  const parsePoints = (str) =>
    str.split(" ").map((p) => {
      const [x, y] = p.split(",").map(Number);
      return { x, y };
    });

  const formatPoints = (arr) => arr.map((p) => `${p.x},${p.y}`).join(" ");

  const getCentroid = (pointsStr) => {
    const points = parsePoints(pointsStr);
    const x = points.reduce((a, p) => a + p.x, 0) / points.length;
    const y = points.reduce((a, p) => a + p.y, 0) / points.length;
    return { x, y };
  };

  // Synchronize the beaconNameInput with the beacon being edited
  useEffect(() => {
    if (beaconPopup) {
      const room = elements.rooms.find((r) => r.id === beaconPopup.roomId);
      if (room) {
        const beacon = room.bluetooths[beaconPopup.btIndex];
        if (beacon) {
          setBeaconNameInput(beacon.name);
        }
      }
    }
  }, [beaconPopup, elements.rooms]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setFloorPlanImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleCanvasClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const svgX = e.clientX - rect.left;
    const svgY = e.clientY - rect.top;

    if (currentMode === "draw_room") {
      const newRoom = {
        id: uuidv4(),
        name: `Room ${elements.rooms.length + 1}`,
        points: `${svgX - 80},${svgY - 60} ${svgX + 80},${svgY - 60} ${
          svgX + 80
        },${svgY + 60} ${svgX - 80},${svgY + 60}`,
        bluetooths: [],
      };
      setElements((prev) => ({
        ...prev,
        rooms: [...prev.rooms, newRoom],
      }));
      setCurrentMode("select");
      setSelectedElement({ type: "room", ...newRoom });
      setRoomNameInput(newRoom.name);
      setEditingRoomId(newRoom.id);
    } else if (currentMode === "draw_point") {
      setDrawingPoints((prev) => [...prev, { x: svgX, y: svgY }]);
    } else {
      if (e.target === svgRef.current) {
        setSelectedElement(null);
        setEditingRoomId(null);
      }
    }
  };

  const handleMouseDown = (e, room, pointIndex = null) => {
    if (currentMode !== "select") return;
    e.stopPropagation();

    isDragging.current = true;
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      roomId: room.id,
      pointIndex,
      draggingBluetooth: false,
    };
    if (pointIndex !== null) {
      setSelectedElement({ type: "point", room, pointIndex });
      setEditingRoomId(null);
    } else {
      setSelectedElement({ type: "room", ...room });
      setRoomNameInput(room.name);
      setEditingRoomId(room.id);
    }
  };

  const handleBluetoothMouseDown = (e, room, btIndex) => {
    e.stopPropagation();
    isDragging.current = true;
    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      roomId: room.id,
      draggingBluetooth: true,
      btIndex,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;

    const dx = e.clientX - dragInfo.current.startX;
    const dy = e.clientY - dragInfo.current.startY;

    setElements((prev) => {
      const updatedRooms = prev.rooms.map((room) => {
        if (room.id === dragInfo.current.roomId) {
          if (dragInfo.current.draggingBluetooth) {
            const newBTs = [...(room.bluetooths || [])];
            newBTs[dragInfo.current.btIndex] = {
              ...newBTs[dragInfo.current.btIndex],
              x: newBTs[dragInfo.current.btIndex].x + dx,
              y: newBTs[dragInfo.current.btIndex].y + dy,
            };
            return { ...room, bluetooths: newBTs };
          }

          const points = parsePoints(room.points);
          if (dragInfo.current.pointIndex !== null) {
            points[dragInfo.current.pointIndex].x += dx;
            points[dragInfo.current.pointIndex].y += dy;
          } else {
            points.forEach((p) => {
              p.x += dx;
              p.y += dy;
            });
          }
          return { ...room, points: formatPoints(points) };
        }
        return room;
      });
      return { ...prev, rooms: updatedRooms };
    });

    dragInfo.current.startX = e.clientX;
    dragInfo.current.startY = e.clientY;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const finishPolygon = () => {
    if (drawingPoints.length < 3) return;
    const newRoom = {
      id: uuidv4(),
      name: `Custom Room ${elements.rooms.length + 1}`,
      points: formatPoints(drawingPoints),
      bluetooths: [],
    };
    setElements((prev) => ({
      ...prev,
      rooms: [...prev.rooms, newRoom],
    }));
    setDrawingPoints([]);
    setCurrentMode("select");
    setSelectedElement({ type: "room", ...newRoom });
    setRoomNameInput(newRoom.name);
    setEditingRoomId(newRoom.id);
  };

  const handleAddBluetooth = () => {
    if (selectedElement?.type === "room") {
      const centroid = getCentroid(selectedElement.points);
      const newBluetooth = {
        ...centroid,
        name: `Beacon ${
          selectedElement.bluetooths ? selectedElement.bluetooths.length + 1 : 1
        }`,
        uuid: uuidv4(),
        major: 1,
        minor: 10001,
        battery: 100,
      };

      setElements((prev) => {
        const updatedRooms = prev.rooms.map((r) =>
          r.id === selectedElement.id
            ? { ...r, bluetooths: [...(r.bluetooths || []), newBluetooth] }
            : r
        );
        return { ...prev, rooms: updatedRooms };
      });
    }
  };

  return (
    <div
      className="main-container"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <div className="header">
        <label className="button upload-btn">
          <FileUp className="icon" />
          <span className="button-text">Upload Floor Plan</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden-input"
          />
        </label>
        <button
          className={`button ${currentMode === "draw_room" ? "active" : ""}`}
          onClick={() => setCurrentMode("draw_room")}
        >
          <Square className="icon" />
          <span className="button-text">Draw Room</span>
        </button>
        <button
          className={`button ${currentMode === "draw_point" ? "active" : ""}`}
          onClick={() =>
            setCurrentMode(
              currentMode === "draw_point" ? "select" : "draw_point"
            )
          }
        >
          <Pencil className="icon" />
          <span className="button-text">Draw Polygon Room</span>
        </button>
        {currentMode === "draw_point" && (
          <button className="button finish-btn" onClick={finishPolygon}>
            <Pencil className="icon" />
            <span className="button-text">Finish Polygon</span>
          </button>
        )}
        <button
          className="button add-beacon-btn"
          onClick={handleAddBluetooth}
          disabled={!selectedElement?.type === "room"}
        >
          <PlusCircle className="icon" />
          <span className="button-text">Add Bluetooth Beacon</span>
        </button>
        <button
          className="button delete-btn"
          onClick={() => {
            if (selectedElement?.type === "room") {
              setElements((prev) => ({
                ...prev,
                rooms: prev.rooms.filter((r) => r.id !== selectedElement.id),
              }));
              setSelectedElement(null);
              setRoomNameInput("");
              setEditingRoomId(null);
            }
          }}
          disabled={!selectedElement}
        >
          <Delete className="icon" />
          <span className="button-text">Delete Room</span>
        </button>
      </div>

      {selectedElement?.type === "room" &&
        editingRoomId === selectedElement.id && (
          <div className="input-container">
            <input
              type="text"
              value={roomNameInput}
              onChange={(e) => setRoomNameInput(e.target.value)}
              onBlur={() => {
                setElements((prev) => ({
                  ...prev,
                  rooms: prev.rooms.map((r) =>
                    r.id === selectedElement.id
                      ? { ...r, name: roomNameInput }
                      : r
                  ),
                }));
                setEditingRoomId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setElements((prev) => ({
                    ...prev,
                    rooms: prev.rooms.map((r) =>
                      r.id === selectedElement.id
                        ? { ...r, name: roomNameInput }
                        : r
                    ),
                  }));
                  setEditingRoomId(null);
                  e.target.blur();
                }
              }}
              className="room-name-input"
              placeholder="Enter room name"
              autoFocus
            />
          </div>
        )}

      <div className="canvas-container">
        <svg
          ref={svgRef}
          width="1070px"
          height="450px"
          className="canvas"
          onClick={handleCanvasClick}
          style={{
            backgroundImage: floorPlanImage ? `url(${floorPlanImage})` : "none",
          }}
        >
          {elements.rooms.map((room) => (
            <g key={room.id}>
              <polygon
                points={room.points}
                className={`room ${
                  selectedElement?.id === room.id ? "selected" : ""
                }`}
                onMouseDown={(e) => handleMouseDown(e, room)}
              />
              <text
                x={getCentroid(room.points).x}
                y={getCentroid(room.points).y}
                textAnchor="middle"
                alignmentBaseline="middle"
                className="room-label"
              >
                {room.name}
              </text>

              {(room.bluetooths || []).map((bt, i) => (
                <g
                  key={i}
                  onMouseDown={(e) => handleBluetoothMouseDown(e, room, i)}
                  transform={`translate(${bt.x}, ${bt.y})`}
                  className="beacon-group"
                  onDoubleClick={(e) => {
                    e.stopPropagation();
                    setBeaconPopup({
                      roomId: room.id,
                      btIndex: i,
                      x: bt.x,
                      y: bt.y,
                    });
                  }}
                >
                  <circle cx={0} cy={0} r="15" className="beacon-circle" />
                  <g style={{ pointerEvents: 'none' }}>
                    <foreignObject x={-12} y={-12} width={24} height={24} style={{ overflow: 'visible' }}>
                      <Bluetooth className="beacon-icon" style={{ width: 22, height: 22, display: 'block', margin: 0 }} />
                    </foreignObject>
                  </g>
                  {bt.name && (
                    <text
                      x={0}
                      y={32}
                      textAnchor="middle"
                      className="beacon-label"
                    >
                      {bt.name}
                    </text>
                  )}
                </g>
              ))}

              {selectedElement?.id === room.id &&
                parsePoints(room.points).map((p, i) => (
                  <circle
                    key={i}
                    cx={p.x}
                    cy={p.y}
                    r="6"
                    className="point-handle"
                    onMouseDown={(e) => handleMouseDown(e, room, i)}
                  />
                ))}
            </g>
          ))}
          {currentMode === "draw_point" && drawingPoints.length > 0 && (
            <>
              <polyline
                points={formatPoints(drawingPoints)}
                className="drawing-polyline"
              />
              {drawingPoints.map((p, i) => (
                <circle
                  key={i}
                  cx={p.x}
                  cy={p.y}
                  r="4"
                  className="drawing-point"
                />
              ))}
            </>
          )}
        </svg>
      </div>

      {beaconPopup && (
        <div
          className="beacon-popup"
          style={{
            left: beaconPopup.x + 120,
            top: beaconPopup.y + 80,
          }}
        >
          <div className="popup-header">
            <div className="popup-icon-container">
              <Bluetooth className="popup-icon" />
            </div>
            <span className="popup-title">Beacon Details</span>
          </div>
          <div className="popup-section">
            <label className="popup-label">Name:</label>
            <input
              type="text"
              value={beaconNameInput}
              onChange={(e) => setBeaconNameInput(e.target.value)}
              onBlur={() => {
                setElements((prev) => ({
                  ...prev,
                  rooms: prev.rooms.map((r) =>
                    r.id === beaconPopup.roomId
                      ? {
                          ...r,
                          bluetooths: r.bluetooths.map((b, idx) =>
                            idx === beaconPopup.btIndex
                              ? { ...b, name: beaconNameInput }
                              : b
                          ),
                        }
                      : r
                  ),
                }));
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setElements((prev) => ({
                    ...prev,
                    rooms: prev.rooms.map((r) =>
                      r.id === beaconPopup.roomId
                        ? {
                            ...r,
                            bluetooths: r.bluetooths.map((b, idx) =>
                              idx === beaconPopup.btIndex
                                ? { ...b, name: beaconNameInput }
                                : b
                            ),
                          }
                        : r
                    ),
                  }));
                  setBeaconPopup(null);
                }
              }}
              className="popup-input"
              placeholder="Beacon Name"
              autoFocus
            />
          </div>
          <div className="popup-grid">
            <div className="popup-info">
              <span className="info-label">UUID:</span>{" "}
              {roomById(beaconPopup.roomId).bluetooths[beaconPopup.btIndex]
                .uuid || "N/A"}
            </div>
            <div className="popup-info">
              <span className="info-label">Major:</span>{" "}
              {roomById(beaconPopup.roomId).bluetooths[beaconPopup.btIndex]
                .major || 1}
            </div>
            <div className="popup-info">
              <span className="info-label">Minor:</span>{" "}
              {roomById(beaconPopup.roomId).bluetooths[beaconPopup.btIndex]
                .minor || 10001}
            </div>
            <div className="popup-info">
              <span className="info-label">Battery:</span>{" "}
              <span className="battery-level">
                {roomById(beaconPopup.roomId).bluetooths[beaconPopup.btIndex]
                  .battery || 100}
                %
              </span>
            </div>
          </div>
          <div className="popup-buttons">
            <button
              className="popup-button delete"
              onClick={() => {
                setElements((prev) => ({
                  ...prev,
                  rooms: prev.rooms.map((r) =>
                    r.id === beaconPopup.roomId
                      ? {
                          ...r,
                          bluetooths: r.bluetooths.filter(
                            (_, idx) => idx !== beaconPopup.btIndex
                          ),
                        }
                      : r
                  ),
                }));
                setBeaconPopup(null);
              }}
            >
              <Delete className="button-icon" />
              Delete
            </button>
            <button
              className="popup-button close"
              onClick={() => setBeaconPopup(null)}
            >
              <X className="button-icon" />
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloorPlanEditor;
