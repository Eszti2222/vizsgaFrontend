import React from "react";

export default function CustomToolbar({ label, onNavigate }) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-2">

      <button
        className="btn btn-outline-secondary btn-sm"
        onClick={() => onNavigate("TODAY")}
      >
        Ma
      </button>

      <div>
        <button
          className="btn btn-outline-secondary btn-sm mx-1"
          onClick={() => onNavigate("PREV")}
        >
          ← Előző
        </button>

        <button
          className="btn btn-outline-secondary btn-sm mx-1"
          onClick={() => onNavigate("NEXT")}
        >
          Következő →
        </button>
      </div>

      <h5>{label}</h5>
    </div>
  );
}