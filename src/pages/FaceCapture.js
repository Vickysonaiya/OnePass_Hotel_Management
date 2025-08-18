// src/pages/FaceCapture.js

import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useLocation, useNavigate } from "react-router-dom";
import "./facecapture.css"; // Create this CSS file

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user" // Use the front camera
};

const FaceCapture = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [verificationStatus, setVerificationStatus] = useState("Pending");
  const [isCapturing, setIsCapturing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { phoneNumber } = location.state || {}; // Get phone number from previous screen

  // Simulate a stored face template for demonstration.
  // In a real app, this would be fetched from your database based on the user's ID.
  // const storedFaceTemplate = {
  //   features: "mock_face_features_of_verified_user_12345",
  //   isVerified: true
  // };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
    setIsCapturing(true);
    setVerificationStatus("Processing...");
    setShowConfirm(false);

    // Simulate the face match process with a delay
    setTimeout(() => {
      const matchSuccess = performFaceMatch(imageSrc);
      if (matchSuccess) {
        setVerificationStatus("Success");
        setShowConfirm(true);
      } else {
        setVerificationStatus("Failed");
      }
      setIsCapturing(false);
    }, 2000); // 2-second delay to simulate processing
  }, [webcamRef]);

  const performFaceMatch = (liveImage) => {
    // This is where the core logic would go.
    // In a real application, you would:
    // 1. Send `liveImage` to a facial recognition API.
    // 2. The API compares it to the `storedFaceTemplate`.
    // 3. The API returns a confidence score or a simple true/false.
    
    // We will simulate success based on a simple check or a random chance.
    // Let's assume a match is successful 80% of the time.
    const isMatch = Math.random() > 0.2;
    return isMatch;
  };

  const handleRetry = () => {
    setImgSrc(null);
    setVerificationStatus("Pending");
    setShowConfirm(false);
  };

  const handleConfirm = () => {
    // Actions after successful verification
    console.log("Face match confirmed for:", phoneNumber);
    // You would now update the guest's check-in status in your system.
    navigate("/verification-summary", { state: { phoneNumber } });
  };
  
  const handleManualVerification = () => {
    console.log("Manual verification selected for:", phoneNumber);
    navigate("/dependent-linking", { state: { phoneNumber } });
  };

  return (
    <div className="face-capture-container">
      <div className="face-capture-card">
        <h2 className="header">Guest Verification – Step 2: Face Capture</h2>
        <p className="subheader">Capture and verify guest’s live photo.</p>

        <div className="camera-area">
          {imgSrc ? (
            <img src={imgSrc} alt="Captured" className="captured-image" />
          ) : (
            <div className="webcam-container">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
                className="webcam-feed"
              />
            </div>
          )}
        </div>
        
        <div className="status-display">
          <p>Status: <span className={`status-${verificationStatus.toLowerCase()}`}>{verificationStatus}</span></p>
        </div>

        <div className="button-group">
          {imgSrc ? (
            <>
              <button className="secondary-button" onClick={handleRetry} disabled={isCapturing}>
                Retry Capture
              </button>
              {showConfirm && (
                <button className="primary-button" onClick={handleConfirm}>
                  Confirm Match
                </button>
              )}
            </>
          ) : (
            <button className="primary-button" onClick={capture}>
              Capture Face
            </button>
          )}
          
          <button className="fallback-button" onClick={handleManualVerification}>
            Manual Verification
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaceCapture;