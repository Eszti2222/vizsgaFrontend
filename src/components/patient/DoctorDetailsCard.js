import React from "react";


export default function DoctorDetailsCard({ doctor }) {

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h3 className="card-title mb-3">{doctor.name}</h3>

        <p>
          <strong>Email:</strong>{" "}
          {doctor.email || "Nincs megadva"}
        </p>

        <p>
          <strong>Szakterület:</strong>{" "}
          {doctor.specialization || "Nincs megadva"}
        </p>

        <p>
          <strong>Telefonszám:</strong>{" "}
          {doctor.phone_number || "Nincs megadva"}
        </p>

        <p>
          <strong>Rendelő:</strong>{" "}
          {doctor.office_location || "Nincs megadva"}
        </p>
      </div>
    </div>
  );
}
