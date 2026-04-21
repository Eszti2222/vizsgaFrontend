import React from "react";

function formatAppointmentDate(appointmentTime) {
  if (!appointmentTime) return "-";

  if (typeof appointmentTime === "string") {
    const [datePart] = appointmentTime.split(" ");
    if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
      const [year, month, day] = datePart.split("-");
      return `${year}.${month}.${day}.`;
    }
  }

  const date = new Date(appointmentTime);
  if (Number.isNaN(date.getTime())) return appointmentTime;

  return date.toLocaleDateString("hu-HU");
}

function formatAppointmentTime(appointmentTime) {
  if (!appointmentTime) return "-";

  if (typeof appointmentTime === "string") {
    const parts = appointmentTime.split(" ");
    if (parts.length >= 2 && /^\d{2}:\d{2}:\d{2}$/.test(parts[1])) {
      return parts[1].slice(0, 5);
    }
  }

  const date = new Date(appointmentTime);
  if (Number.isNaN(date.getTime())) return appointmentTime;

  return date.toLocaleTimeString("hu-HU", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DoctorAppointmentsList({ appointments }) {
  if (!appointments || appointments.length === 0) {
    return <p>Nincs foglalt időpont.</p>;
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Páciens neve</th>
          <th>Dátum</th>
          <th>Időpont</th>
          <th>Státusz</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appt) => (
          <tr key={appt.id}>
            <td>{appt.patient_name}</td>
            <td>{formatAppointmentDate(appt.appointment_time)}</td>
            <td>{formatAppointmentTime(appt.appointment_time)}</td>
            <td>{appt.status || "-"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
