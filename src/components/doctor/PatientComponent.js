import React from "react";
import { Link } from "react-router";

export default function PatientComponent({ patient }) {
  return (
    <Link
      to={`/patients/${patient.id}`}
      className="card mb-3 patient-card-link"
      aria-label={`${patient.name} adatainak megnyitása`}
    >
      <div className="card-body">
        <div className="patient-card-header">
          <h5 className="card-title">{patient.name}</h5>
          <span className="patient-card-action">Részletek</span>
        </div>

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

        <p className="card-text">
          <strong>Telefon szám:</strong>{" "}
          {patient.phone_number || "Nincs megadva"}
        </p>
      </div>
    </Link>
  );
}