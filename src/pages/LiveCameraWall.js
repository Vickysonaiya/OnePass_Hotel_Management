import React from "react";
import "./livecamerawall.css";

const cameras = [
  {
    id: 1,
    name: "Cam 1",
    src: "https://www.youtube.com/embed/8DJi4PrdFCg?autoplay=1&mute=1&loop=1&playlist=8DJi4PrdFCg",
    borderColor: "#ff6f5e",
  },
  {
    id: 2,
    name: "Cam 2",
    src: "https://www.youtube.com/embed/8DJi4PrdFCg?autoplay=1&mute=1&loop=1&playlist=8DJi4PrdFCg",
    borderColor: "#6f1d1b",
  },
  {
    id: 3,
    name: "Cam 3",
    src: "https://www.youtube.com/embed/8DJi4PrdFCg?autoplay=1&mute=1&loop=1&playlist=8DJi4PrdFCg",
    borderColor: "#003f5c",
  },
  {
    id: 4,
    name: "Cam 4",
    src: "https://www.youtube.com/embed/8DJi4PrdFCg?autoplay=1&mute=1&loop=1&playlist=8DJi4PrdFCg",
    borderColor: "#2f4b7c",
  },
];

export default function SecurityGridAllYT() {
  return (
    <div className="header_title">
        <h4>Live Camera Wall</h4>
    <div className="grid-container">
      
      {cameras.map((cam) => (
        <div
          key={cam.id}
          className="video-card"
          style={{ borderColor: cam.borderColor }}
        >
          <iframe
            width="100%"
            height="100%"
            src={cam.src}
            title={cam.name}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
          <div className="camera-name">{cam.name}</div>
        </div>
      ))}
        </div>
    </div>
  );
}
