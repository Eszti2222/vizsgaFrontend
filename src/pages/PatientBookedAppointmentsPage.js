import React, { useEffect, useState } from "react";
import { myAxios } from "../services/api";
import { Link } from "react-router";

export default function PatientBookedAppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchAppointments = async (order = "asc") => {
    try {
      const { data } = await myAxios.get(`/api/appointments?order=${order}`);
      setAppointments(data);
    } catch (error) {
      console.error("Hiba /api/appointments híváskor:", error);
    }
  };

  useEffect(() => {
    fetchAppointments(sortOrder);
  }, [sortOrder]);

  const handleDelete = async (id) => {
    const ok = window.confirm(
      "Biztosan törlöd ezt az időpontot? Ez a művelet nem visszavonható.",
    );
    if (!ok) return;

    try {
      await myAxios.delete(`/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((appt) => appt.id !== id));
      alert("Időpont sikeresen törölve.");
    } catch (error) {
      console.error("Hiba az időpont törlésekor:", error);
      alert(
        error.response?.data?.message ||
          "Hiba történt az időpont törlése közben.",
      );
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Időpontjaim</h2>

        <div className="d-flex gap-2">
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc" ? "Legközelebbi elöl" : "Legtávolabbi elöl"}
          </button>

          <Link to="/doctors" className="btn btn-primary">
            Új időpont foglalása
          </Link>
        </div>
      </div>

      {appointments.length === 0 && <p>Még nincs foglalt időpontod.</p>}

      {appointments.length > 0 && (
        <div className="row g-3">
          {appointments.map((appt) => (
            <div key={appt.id} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">
                    {appt.doctor_name}
                  </h5>

                  <p className="card-text mb-1">
                    <strong>Időpont:</strong>
                    <br />
                    {new Date(appt.appointment_time).toLocaleString("hu-HU")}
                  </p>

                  <p className="card-text mb-1">
                    <strong>Szakterület:</strong>
                    <br />
                    {appt.specialization || "Nincs megadva"}
                  </p>

                  <p className="card-text mb-1">
                    <strong>Rendelő:</strong>
                    <br />
                    {appt.office_location || "Nincs megadva"}
                  </p>

                  <p className="card-text mb-0">
                    <strong>Státusz:</strong> {appt.status === "scheduled" ? "foglalva" : appt.status}
                  </p>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm mt-2"
                    onClick={() => handleDelete(appt.id)}
                  >
                    Időpont törlése
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
