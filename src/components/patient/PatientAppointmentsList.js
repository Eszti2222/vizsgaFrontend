import React from "react";
import AppointmentCard from "./AppointmentCard";

export default function PatientAppointmentsList({
  appointments,
  onDelete,
  emptyMessage = "Még nincs foglalt időpontod.",
}) {
  if (!appointments || appointments.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <div className="row g-3">
      {appointments.map((appt) => (
        <div key={appt.id} className="col-12 col-md-6 col-lg-4">
          <AppointmentCard appt={appt} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}