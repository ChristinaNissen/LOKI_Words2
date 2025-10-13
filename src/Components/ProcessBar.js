import React from "react";
import "./ProcessBar.css";

const ProcessBar = ({ steps, currentStep }) => {
  console.log("ProcessStatusBar props:", steps, currentStep);
  return (
    <div
      className="process-status-bar"
      style={{ display: "flex", border: "1px solid red", padding: "10px" }}
    >
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        return (
          <div key={index} className="process-step">
            <div
              className={`step-icon ${
                stepNumber === currentStep ? "active" : stepNumber < currentStep ? "completed" : ""
              }`}
            >
              {stepNumber}
            </div>
            <div className="step-label">{step}</div>
            {index !== steps.length - 1 && <div className="step-divider" />}
          </div>
        );
      })}
    </div>
  );
};

export default ProcessBar;