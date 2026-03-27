import React from "react";
import { Link } from "react-router";

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

        {/* Részletek gomb – átvisz az adott orvos oldalára */}
        <Link
          to={`/doctors/${patient.id}`}
          className="btn btn-primary mt-2"
        >
          Részletek
        </Link>
      </div>
    </div>
  );
}