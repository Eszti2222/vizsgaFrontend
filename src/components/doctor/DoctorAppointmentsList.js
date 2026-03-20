import React from "react";
import "../css/doctorappointments.css";

export default function DoctorAppointmentsList() {
  return (
    <div className="doctor-appointments-bg">
      <div className="doctor-appointments-card">
        <h2>Foglalat időpontok</h2>
        <div className="doctor-appointments-filters">
          <select>
            <option>Szak szerint szűrés</option>
            {/* ...további opciók... */}
          </select>
          <span className="doctor-appointments-desc">
            év, honap, nap, dátum táblázatban, páciensek nevével, tajszám szerint
          </span>
        </div>
        <div className="doctor-appointments-filters">
          <select>
            <option>Dátum szerinti szűrés</option>
            {/* ...további opciók... */}
          </select>
        </div>
      </div>
    </div>
  );
}
