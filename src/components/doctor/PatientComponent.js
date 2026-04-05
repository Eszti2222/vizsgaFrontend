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

         <p className="card-text">
          <strong>Telefon szám:</strong>{" "}
          {patient.phone_number || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Ország:</strong>{" "}
          {patient.country || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Város:</strong>{" "}
          {patient.city || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Irányítószám:</strong>{" "}
          {patient.postal_code || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Cím:</strong>{" "}
          {patient.street_address || "Nincs megadva"}
        </p>
      </div>
    </div>
  );
}