import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import "./FloorPlanEditor.css";
import floorplanImage from "../../assets/images/floorplan.png";
import { Bluetooth, Plus } from "lucide-react";

const FloorPlanEditor = () => {
  const [activeTab, setActiveTab] = useState("EDIT ROOMS");
  const [selectedAction, setSelectedAction] = useState(null);
  const [generatedRooms, setGeneratedRooms] = useState([]);
  const [drawPoints, setDrawPoints] = useState([]);
  const [polygons, setPolygons] = useState([]);
  const [selectedPolygonId, setSelectedPolygonId] = useState(null);
  const [namingPolygonId, setNamingPolygonId] = useState(null);
  const [newPolygonName, setNewPolygonName] = useState("");
  const [mouseDownPos, setMouseDownPos] = useState(null);
  const [beacons, setBeacons] = useState([]);
  const [showBeacons, setShowBeacons] = useState(true);

  const [namingBeaconId, setNamingBeaconId] = useState(null);
  const [newBeaconName, setNewBeaconName] = useState("");

  const floorplanRef = useRef(null);
  const beaconPressTimer = useRef(null);

  const tabs = ["OVERVIEW", "EDIT ROOMS", "COLOR PICKER", "INSTALLATION HINT"];

  const handleActionClick = (action) => {
    setSelectedAction(action === selectedAction ? null : action);
    setDrawPoints([]);
    setSelectedPolygonId(null);
    if (action === "generate") {
      const newRooms = [
        { id: 1, x: 136, y: 71, width: 515, height: 251 },
        { id: 2, x: 656, y: 70, width: 202, height: 253 },
        { id: 3, x: 136, y: 328, width: 213, height: 199 },
        { id: 4, x: 353, y: 328, width: 191, height: 199 },
      ];
      setGeneratedRooms(newRooms);
    } else if (action === "delete") {
      setGeneratedRooms([]);
      setPolygons([]);
    }
  };

  const isPointInsidePolygon = (point, polygon) => {
    const { x, y } = point;
    let inside = false;
    const points = polygon.points;
    for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
      const xi = points[i].x,
        yi = points[i].y;
      const xj = points[j].x,
        yj = points[j].y;
      const intersect =
        ((yi > y) !== (yj > y)) &&
        (x < (((xj - xi) * (y - yi)) / ((yj - yi) + 0.00001) + xi));
      if (intersect) inside = !inside;
    }
    return inside;
  };

  const handleImageClick = (e) => {
    if (selectedAction !== "draw") return;
    if (e.target.tagName !== "IMG") return;

    const boundingBox = floorplanRef.current.getBoundingClientRect();
    const x = e.clientX - boundingBox.left;
    const y = e.clientY - boundingBox.top;
    const image = floorplanRef.current.querySelector("img");
    const imageWidth = image.offsetWidth;
    const imageHeight = image.offsetHeight;

    if (x < 0 || y < 0 || x > imageWidth || y > imageHeight) return;

    const newPoint = { x, y };
    const MIN_DISTANCE = 10;
    const first = drawPoints[0];

    if (drawPoints.length >= 3) {
      const dx = first.x - newPoint.x;
      const dy = first.y - newPoint.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < MIN_DISTANCE) {
        const newId = Date.now();
        const polygon = {
          id: newId,
          points: [...drawPoints],
          name: "",
        };
        setPolygons((prev) => [...prev, polygon]);
        setDrawPoints([]);
        setNamingPolygonId(newId);
        setNewPolygonName("");
        return;
      }
    }

    const isNearExistingPoint = drawPoints.slice(1).some((pt) => {
      const dx = pt.x - newPoint.x;
      const dy = pt.y - newPoint.y;
      return Math.sqrt(dx * dx + dy * dy) < MIN_DISTANCE;
    });
    if (isNearExistingPoint) return;

    const isInside = polygons.some((poly) =>
      isPointInsidePolygon(newPoint, poly)
    );
    if (isInside && drawPoints.length === 0) return;

    setDrawPoints((prev) => [...prev, newPoint]);
  };

  const submitPolygonName = () => {
    setPolygons((prev) =>
      prev.map((poly) =>
        poly.id === namingPolygonId ? { ...poly, name: newPolygonName } : poly
      )
    );
    setNamingPolygonId(null);
    setNewPolygonName("");
  };

  const pointToSegmentDistance = (p, v, w) => {
    const l2 = (v.x - w.x) ** 2 + (v.y - w.y) ** 2;
    if (l2 === 0) return Math.hypot(p.x - v.x, p.y - v.y);
    let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
    t = Math.max(0, Math.min(1, t));
    const projection = { x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y) };
    return Math.hypot(p.x - projection.x, p.y - projection.y);
  };

  const insertPointInPolygon = (polyId, newPoint) => {
    const MAX_DISTANCE = 20;
    setPolygons((prevPolys) =>
      prevPolys.map((poly) => {
        if (poly.id !== polyId) return poly;
        let closestIndex = 0;
        let minDistance = Infinity;
        for (let i = 0; i < poly.points.length; i++) {
          const p1 = poly.points[i];
          const p2 = poly.points[(i + 1) % poly.points.length];
          const distance = pointToSegmentDistance(newPoint, p1, p2);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = i;
          }
        }
        if (minDistance > MAX_DISTANCE) return poly;
        const newPoints = [...poly.points];
        newPoints.splice(closestIndex + 1, 0, newPoint);
        return { ...poly, points: newPoints };
      })
    );
  };

  const handlePolygonClick = (e, id) => {
    e.stopPropagation();
    const boundingBox = floorplanRef.current.getBoundingClientRect();
    const clickX = e.clientX - boundingBox.left;
    const clickY = e.clientY - boundingBox.top;
    const clickPoint = { x: clickX, y: clickY };
    const poly = polygons.find((p) => p.id === id);
    if (!poly) return;
    const MAX_DISTANCE = 20;
    if (selectedPolygonId === id) {
      setSelectedPolygonId(null);
      return;
    }
    const isNearExistingPoint = poly.points.some((pt) => {
      const dx = pt.x - clickPoint.x;
      const dy = pt.y - clickPoint.y;
      return Math.sqrt(dx * dx + dy * dy) < MAX_DISTANCE;
    });
    if (isNearExistingPoint) {
      setSelectedPolygonId(id);
      return;
    }
    let isNearEdge = false;
    for (let i = 0; i < poly.points.length; i++) {
      const p1 = poly.points[i];
      const p2 = poly.points[(i + 1) % poly.points.length];
      const distance = pointToSegmentDistance(clickPoint, p1, p2);
      if (distance <= MAX_DISTANCE) {
        isNearEdge = true;
        break;
      }
    }
    if (isNearEdge) {
      insertPointInPolygon(id, clickPoint);
    }
    setSelectedPolygonId(id);
  };

  const handlePointDrag = (polyId, pointIndex, dx, dy) => {
    setPolygons((prevPolys) =>
      prevPolys.map((poly) => {
        if (poly.id !== polyId) return poly;
        const newPoints = [...poly.points];
        newPoints[pointIndex] = {
          x: newPoints[pointIndex].x + dx,
          y: newPoints[pointIndex].y + dy,
        };
        return { ...poly, points: newPoints };
      })
    );
  };

  const deletePolygon = (id) => {
    setPolygons((prev) => prev.filter((poly) => poly.id !== id));
    setSelectedPolygonId(null);
  };

  const updateRoom = (id, data) => {
    setGeneratedRooms((prev) =>
      prev.map((room) => (room.id === id ? { ...room, ...data } : room))
    );
  };

  const handleMouseDown = (e) => {
    if (e.target.tagName !== "IMG") return;
    const boundingBox = floorplanRef.current.getBoundingClientRect();
    const x = e.clientX - boundingBox.left;
    const y = e.clientY - boundingBox.top;

    beaconPressTimer.current = setTimeout(() => {
      setBeacons((prev) => [...prev, { x, y }]);
    }, 500);

    setMouseDownPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = (e) => {
    clearTimeout(beaconPressTimer.current);
    if (!mouseDownPos) return;
    const dx = e.clientX - mouseDownPos.x;
    const dy = e.clientY - mouseDownPos.y;
    const moved = Math.sqrt(dx * dx + dy * dy);
    if (moved < 5) handleImageClick(e);
    setMouseDownPos(null);
  };

  const handleBackgroundClick = (e) => {
    const boundingBox = floorplanRef.current.getBoundingClientRect();
    const clickX = e.clientX - boundingBox.left;
    const clickY = e.clientY - boundingBox.top;
    const clickPoint = { x: clickX, y: clickY };
    const isClickInsideAnyPolygon = polygons.some((poly) =>
      isPointInsidePolygon(clickPoint, poly)
    );
    if (!isClickInsideAnyPolygon) {
      setSelectedPolygonId(null);
    }
  };

  const handleFloorplanClick = (e) => {
    handleImageClick(e);
    handleBackgroundClick(e);
  };
  const handleAddBeacon = () => {
    const container = floorplanRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const defaultX = rect.width / 2;
    const defaultY = rect.height / 2;

    setBeacons((prev) => [
      ...prev,
      {
        id: Date.now(),
        x: defaultX,
        y: defaultY,
        name: "", // <-- new field
      },
    ]);
  };

  const renderBeacons = () =>
    beacons.map((beacon, idx) => (
      <Rnd
        key={beacon.id}
        default={{
          x: beacon.x,
          y: beacon.y,
          width: 32,
          height: 32,
        }}
        bounds="parent"
        onDragStop={(e, d) => {
          setBeacons((prev) =>
            prev.map((b) => (b.id === beacon.id ? { ...b, x: d.x, y: d.y } : b))
          );
        }}
        style={{
          position: "absolute",
          zIndex: 10,
        }}
        onClick={() => {
          setNamingBeaconId(beacon.id);
          setNewBeaconName(beacon.name || "");
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#007bff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Bluetooth size={18} color="#fff" />

          {beacon.name && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: "50%",
                transform: "translateX(-50%)",
                marginTop: "4px",
                background: "#fff",
                padding: "2px 4px",
                borderRadius: "4px",
                fontSize: "10px",
                color: "#333",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
              }}
            >
              {beacon.name}
            </div>
          )}
        </div>
      </Rnd>
    ));

  return (
    <div className="container">
      <div className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "OVERVIEW" ? (
        <div className="editor">
          <div className="floorplan-box" ref={floorplanRef}>
            <img
              src={floorplanImage}
              alt="Floor Plan"
              className="floorplan-img"
            />
            {showBeacons && renderBeacons()}
          </div>

          <div className="side-panel">
            <div className="panel-section">
              <div className="beacon-toggle-wrapper">
                <h4 className="beacon-label">BEACONS</h4>

                {/* Custom toggle button */}
                <div
                  className="custom-toggle-button"
                  onClick={() => {
                    setShowBeacons(!showBeacons);
                    setNamingBeaconId(null);
                  }}
                >
                  <div className="toggle-left">
                    <Bluetooth />
                  </div>
                  <div className="toggle-right">
                    <Plus />
                  </div>
                </div>
              </div>

              {/* Show only if beacons are visible */}
              {showBeacons && (
                <button className="panel-btn" onClick={handleAddBeacon}>
                  + Add Beacon
                </button>
              )}
            </div>

            {/* <div className="panel-section">
              <h4>ROOMS</h4>
              <button className="panel-btn">👁 Toggle Rooms</button>
            </div> */}
            {/* <div className="panel-section disabled">
              <h4>GATEWAYS</h4>
              <button className="panel-btn disabled">+ Add</button>
            </div> */}
            {/* <div className="panel-section disabled">
              <h4>POI</h4>
              <button className="panel-btn disabled">+ Add</button>
            </div> */}
            {/* <div className="panel-section disabled">
              <h4>FENCES</h4>
              <button className="panel-btn disabled">+ Add</button>
            </div> */}
            {/* <div className="panel-section disabled">
              <h4>PATHS</h4>
              <button className="panel-btn disabled">+ Add</button>
            </div> */}
          </div>
        </div>
      ) : activeTab === "EDIT ROOMS" ? (
        <div className="editor">
          <div
            className="floorplan-box"
            ref={floorplanRef}
            // onClick={handleImageClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onClick={handleFloorplanClick} // ✅ add this line
          >
            <img
              src={floorplanImage}
              alt="Floor Plan"
              className="floorplan-img"
            />

            {generatedRooms.map((room) => (
              <Rnd
                key={room.id}
                size={{ width: room.width, height: room.height }}
                position={{ x: room.x, y: room.y }}
                bounds="parent"
                onDragStop={(e, d) => updateRoom(room.id, { x: d.x, y: d.y })}
                onResizeStop={(e, direction, ref, delta, position) => {
                  updateRoom(room.id, {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    x: position.x,
                    y: position.y,
                  });
                }}
                style={{
                  backgroundColor: "rgba(144, 238, 144, 0.5)",
                  border: "2px solid darkgreen",
                  borderRadius: "4px",
                }}
              />
            ))}

            <svg className="polygon-canvas">
              {drawPoints.map((point, i) => (
                <circle key={i} cx={point.x} cy={point.y} r={5} fill="blue" />
              ))}
              {drawPoints.length > 1 && (
                <polyline
                  points={drawPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                  fill="none"
                  stroke="blue"
                  strokeWidth="2"
                />
              )}
            </svg>

            <svg className="polygon-canvas">
              {polygons.map((poly) => {
                const p1 = poly.points[0];
                const p2 = poly.points[1 % poly.points.length];
                const edgeMidX = (p1.x + p2.x) / 2;
                const edgeMidY = (p1.y + p2.y) / 2;

                const centerX =
                  poly.points.reduce((sum, p) => sum + p.x, 0) /
                  poly.points.length;
                const centerY =
                  poly.points.reduce((sum, p) => sum + p.y, 0) /
                  poly.points.length;

                return (
                  <g
                    key={poly.id}
                    onClick={(e) => handlePolygonClick(e, poly.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <polygon
                      points={poly.points.map((p) => `${p.x},${p.y}`).join(" ")}
                      fill="rgba(144, 238, 144, 0.5)"
                      stroke={
                        selectedPolygonId === poly.id ? "red" : "darkgreen"
                      }
                      strokeWidth={2}
                    />
                    {poly.name && (
                      <text
                        x={centerX}
                        y={centerY}
                        fill="black"
                        fontSize="12"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {poly.name}
                      </text>
                    )}
                    {selectedPolygonId === poly.id && (
                      <foreignObject
                        x={edgeMidX - 12}
                        y={edgeMidY - 12}
                        width={24}
                        height={24}
                      >
                        <button
                          style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: "50%",
                            width: "24px",
                            height: "24px",
                            cursor: "pointer",
                          }}
                          onClick={() => deletePolygon(poly.id)}
                        >
                          ❌
                        </button>
                      </foreignObject>
                    )}
                    {selectedPolygonId === poly.id &&
                      poly.points.map((point, index) => (
                        <circle
                          key={index}
                          cx={point.x}
                          cy={point.y}
                          r={6}
                          fill="white"
                          stroke="black"
                          strokeWidth={2}
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            let prevX = e.clientX;
                            let prevY = e.clientY;

                            const handleMouseMove = (moveEvent) => {
                              const dx = moveEvent.clientX - prevX;
                              const dy = moveEvent.clientY - prevY;
                              handlePointDrag(poly.id, index, dx, dy);
                              prevX = moveEvent.clientX;
                              prevY = moveEvent.clientY;
                            };

                            const handleMouseUp = () => {
                              window.removeEventListener(
                                "mousemove",
                                handleMouseMove
                              );
                              window.removeEventListener(
                                "mouseup",
                                handleMouseUp
                              );
                            };

                            window.addEventListener(
                              "mousemove",
                              handleMouseMove
                            );
                            window.addEventListener("mouseup", handleMouseUp);
                          }}
                        />
                      ))}
                  </g>
                );
              })}
            </svg>

            {namingPolygonId && (
              <div
                className="polygon-name-popup"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  placeholder="Enter room name"
                  value={newPolygonName}
                  onChange={(e) => setNewPolygonName(e.target.value)}
                  autoFocus
                />
                <button onClick={submitPolygonName}>Save</button>
              </div>
            )}
          </div>

          <div className="side-panel">
            <button
              className={`delete-btn ${
                selectedAction === "delete" ? "selected" : ""
              }`}
              onClick={() => handleActionClick("delete")}
            >
              🗑 DELETE ALL ROOMS
            </button>
            <button
              className={`generate-btn ${
                selectedAction === "generate" ? "selected" : ""
              }`}
              onClick={() => handleActionClick("generate")}
            >
              + GENERATE AUTOMATICALLY
            </button>
            <button
              className={`draw-btn ${
                selectedAction === "draw" ? "selected" : ""
              }`}
              onClick={() => handleActionClick("draw")}
            >
              ✎ DRAW (Click points, then close loop)
            </button>
          </div>
        </div>
      ) : (
        <div className="placeholder-tab-content">
          <h2>{activeTab} Content</h2>
          <p>
            This is placeholder content for the <strong>{activeTab}</strong>{" "}
            tab.
          </p>
        </div>
      )}

      {namingBeaconId && (
        <div
          className="beacon-name-popup"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#fff",
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "8px",
            zIndex: 1000,
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="Enter beacon name"
            value={newBeaconName}
            onChange={(e) => setNewBeaconName(e.target.value)}
            autoFocus
            style={{
              padding: "6px 10px",
              fontSize: "14px",
              width: "200px",
              marginRight: "8px",
            }}
          />
          <button
            onClick={() => {
              setBeacons((prev) =>
                prev.map((b) =>
                  b.id === namingBeaconId ? { ...b, name: newBeaconName } : b
                )
              );
              setNamingBeaconId(null);
              setNewBeaconName("");
            }}
            style={{
              padding: "6px 12px",
              fontSize: "14px",
              cursor: "pointer",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default FloorPlanEditor;
