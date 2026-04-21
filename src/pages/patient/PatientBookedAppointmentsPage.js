import React, { useEffect, useState } from "react";
import { myAxios } from "../../services/api";
import { Link } from "react-router";

import AppointmentCard from "../../components/patient/AppointmentCard";
import LoadingMessage from "../../components/common/LoadingMessage";



import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext"


export default function PatientBookedAppointmentsPage() {
  const { user, loading: authLoading } = useContext(AuthContext)
  const [appointments, setAppointments] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [loading, setLoading] = useState(true);

  const fetchAppointments = async (order = "asc") => {
    try {
      setLoading(true);
      const { data } = await myAxios.get(`/api/appointments?order=${order}`);
      setAppointments(data);
    } catch (error) {
      console.error("Hiba az időpontok betöltésekor:", error);
    } finally {
      setLoading(false);
    }
  };



useEffect(() => {
  if (authLoading) return;
  if (!user || user.role !== "patient") return;

  fetchAppointments(sortOrder);
}, [sortOrder, user, authLoading]);




  const handleDelete = async (id) => {
    const ok = window.confirm("Biztosan törlöd ezt az időpontot?");
    if (!ok) return;

    try {
      await myAxios.delete(`/api/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      alert("Nem sikerült törölni az időpontot.");
    }
  };

  if (loading) {
    return <LoadingMessage text="Időpontok betöltése..." />;
  }

  return (
    <div className="container mt-3">
      

      {/* 🧾 FEJLÉC */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Időpontjaim</h2>

        <div className="d-flex gap-2">
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortOrder === "asc"
              ? "Legközelebbi elöl"
              : "Legtávolabbi elöl"}
          </button>

          <Link to="/doctors" className="btn btn-primary">
            Új időpont foglalása
          </Link>
        </div>
      </div>

      {/* 📭 ÜRES ÁLLAPOT */}
      {appointments.length === 0 && (
        <p>Még nincs foglalt időpontod.</p>
      )}

      {/* 🗂️ KÁRTYÁK */}
      {appointments.length > 0 && (
        <div className="row g-3">
          {appointments.map((appt) => (
            <div key={appt.id} className="col-12 col-md-6 col-lg-4">
              <AppointmentCard
                appt={appt}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}