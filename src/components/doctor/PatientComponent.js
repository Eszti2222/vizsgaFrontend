import React from "react";

export default function PatientComponent({ patient }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{patient.name}</h5>

        <p className="card-text">
          <strong>TAJ:</strong>{" "}
          {patient.social_security_number || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Születési dátum:</strong>{" "}
          {patient.birth_date || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Email:</strong>{" "}
          {patient.email || "Nincs megadva"}
        </p>
      </div>
    </div>
  );
}