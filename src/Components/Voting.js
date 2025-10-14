import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Footer from "./Footer";
import "./Voting-system.css";
import ProcessBar from "./ProcessBar.js"
import VoteContext from "../Contexts/VoteContext";
import { useContext } from "react";
const candidates = [
  { id: 1, name: "Alice T. Smith", party: "Party A" },
  { id: 2, name: "Mark Jones", party: "Party B" },
  { id: 3, name: "Martin Taylor", party: "Party C" },
  { id: 4, name: "Ann K. Brown", party: "Party D" },
  { id: 5, name: "Sofia Lee", party: "Party E" },
  { id: 6, name: "John Doe", party: "Party F" },
  { id: 7, name: "Emma White", party: "Party G" },
  { id: 8, name: "Lucas Green", party: "Party H" },
];

const Voting = () => {
  const location = useLocation();
  // Extract userSelectedYes from the navigation state; default false if not provided.
  const { userSelectedYes } = useContext(VoteContext);

  const [selected, setSelected] = useState("");
  const [error, setError] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selected) {
      setError("Please select a candidate before submitting your vote.");
      return;
    }
    setError("");
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    setShowConfirm(false);
    navigate("/confirmation");
    //navigate("/confirmation2");
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const selectedCandidate = candidates.find((c) => c.id === selected);

    // Define the steps for each flow
  const stepsNo = ["Voted Before", "Voting", "Ballot Confirmation"];
  const stepsYes = ["Voted Before", "Visual Selection", "Voting", "Ballot Confirmation"];

  // Determine which steps array and current step to use:
  // For "No": Voting is step 2; for "Yes": Voting is step 3.
  const steps = userSelectedYes ? stepsYes : stepsNo;
  const currentStep = userSelectedYes ? 3 : 2;

   console.log("Voting: userSelectedYes =", userSelectedYes);
  console.log("Voting: steps =", steps, "Length:", steps.length);
  console.log("Voting: currentStep =", currentStep);

  
  return (
    <div className="page-wrapper">
      <main className="welcome-main">
        
       <ProcessBar steps={steps} currentStep={currentStep} />

        <h1>Voting</h1>
        <p className="voting-desc">
          Please select your preferred candidate below.
        </p>
        <div className="card-wide">
          <h1>Ballot</h1>
          <form className="voting-form" onSubmit={handleSubmit}>
            {candidates.map((c, idx) => (
              <div
                className={`ballot-row${
                  idx !== candidates.length - 1 ? " ballot-row-border" : ""
                }`}
                key={c.id}
              >
                <input
                  type="radio"
                  name="ballot"
                  value={c.id}
                  checked={selected === c.id}
                  onChange={() => setSelected(c.id)}
                />
                <span className="ballot-candidate">{c.name}</span>
                <span className="ballot-party">{c.party}</span>
              </div>
            ))}
            {error && <div className="login-error">{error}</div>}
            <button
              type="submit"
              className="button"
              style={{ marginTop: "24px" }}
            >
              Cast Vote
            </button>
          </form>
        </div>
      </main>
      {showConfirm && (
        <div className="modal-backdrop">
          <div className="modal">
            <p>
              Are you sure you want to cast your vote for{" "}
              <strong>{selectedCandidate?.name}</strong>?
            </p>
            <div className="modal-actions">
              <button className="button" onClick={handleConfirm}>
                Yes, Cast Vote
              </button>
              <button className="button-secondary" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Voting;
