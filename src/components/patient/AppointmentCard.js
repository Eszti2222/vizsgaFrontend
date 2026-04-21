export default function AppointmentCard({ appt, onDelete }) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <h5 className="text-primary">{appt.doctor_name}</h5>

        <p><strong>Időpont:</strong><br />
          {new Date(appt.appointment_time).toLocaleString("hu-HU")}
        </p>

        <p><strong>Szakterület:</strong><br />
          {appt.specialization || "Nincs megadva"}
        </p>

        <p><strong>Rendelő:</strong><br />
          {appt.office_location || "Nincs megadva"}
        </p>

        <button
          className="btn btn-outline-danger btn-sm mt-2"
          onClick={() => onDelete(appt.id)}
        >
          Időpont törlése
        </button>
      </div>
    </div>
  );
}