// src/pages/AadhaarVerificationStatus.js

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./aadhaarverificationstatus.css"; // Create a new CSS file for this component

const AadhaarVerificationStatus = () => {
  const [status, setStatus] = useState("Waiting for guest verification...");
  const [isFailed, setIsFailed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { phoneNumber } = location.state || {};

  useEffect(() => {
    // Simulate the external Aadhaar verification flow.
    // In a real application, this would be a WebSocket or long-polling API call
    // to your backend, which would be listening for the guest's verification status.

    const simulationTimeout = setTimeout(() => {
      // Randomly simulate success or failure for demonstration
      const success = Math.random() > 0.3; // 70% chance of success

      if (success) {
        setStatus("Verification Successful! Face capture initiated.");
        setIsFailed(false);
        // Navigate to the next screen after a short delay to show the success message
        setTimeout(() => {
          navigate("/face-capture", { state: { phoneNumber } });
        }, 1500); // 1.5-second delay
      } else {
        setStatus("Verification Failed. Please try again or proceed with manual check-in.");
        setIsFailed(true);
      }
    }, 5000); // Wait 5 seconds to simulate guest completing the process on their phone

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(simulationTimeout);
  }, [navigate, phoneNumber]);

  const handleRetry = () => {
    // Logic to resend the verification link or navigate back
    setStatus("Resending verification link...");
    setIsFailed(false);
    setTimeout(() => {
      navigate("/guest-phone-entry", { state: { phoneNumber } });
    }, 1000); // Simulate resending and returning to the phone entry screen
  };

  const handleManualOverride = () => {
    // Logic for manual check-in
    console.log("Manual override initiated for guest with number:", phoneNumber);
    // In a real app, you would navigate to a manual check-in form.
    navigate("/face-capture", { state: { phoneNumber } });
  };

  return (
    <div className="status-container">
      <div className="status-card">
        <h2 className="header">Aadhaar Verification</h2>
        <p className="subheader">A verification link has been sent to guest's phone.</p>
        <div className="status-message">
          <p className={isFailed ? "status-failed" : "status-pending"}>{status}</p>
          {!isFailed && <div className="spinner"></div>}
        </div>
        
        {isFailed && (
          <div className="action-buttons">
            <button className="retry-button" onClick={handleRetry}>Retry</button>
            <button className="manual-button" onClick={handleManualOverride}>Manual Override</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AadhaarVerificationStatus;