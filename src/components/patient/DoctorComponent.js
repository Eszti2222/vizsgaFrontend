import React from "react";
import { Link } from "react-router";

export default function DoctorComponent({ doctor }) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{doctor.name}</h5>

        <p className="card-text">
          <strong>Szakterület:</strong>{" "}
          {doctor.specialization || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Rendelő:</strong>{" "}
          {doctor.office_location || "Nincs megadva"}
        </p>

        {/* Részletek gomb – átvisz az adott orvos oldalára */}
        <Link
          to={`/doctors/${doctor.id}`}
          className="btn btn-primary mt-2"
        >
          Részletek
        </Link>
      </div>
    </div>
  );
}