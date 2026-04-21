import React from "react";

export default function SpecializationList({ specializations, onSelect }) {
  return (
    <div className="row g-3 mt-3">
      {specializations.map((spec) => (
        <div key={spec} className="col-12 col-md-6 col-lg-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column">
              <h5 className="card-title">{spec}</h5>
              <button
                type="button"
                className="btn btn-primary mt-auto"
                onClick={() => onSelect(spec)}
              >
                Orvosok megtekintése
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}