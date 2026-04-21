import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PatientLayout from "../../layouts/PatientLayout";
import {
  PatientAppointmentsProvider,
  usePatientAppointments,
} from "../../contexts/PatientAppointmentsContext";
import PatientAppointmentsList from "../../components/patient/PatientAppointmentsList";
import LoadingMessage from "../../components/common/LoadingMessage";

function PatientBookedAppointmentsContent() {
  const { user } = useContext(AuthContext)
  const {
    appointments,
    loadingAppointments,
    appointmentsError,
    loadPatientAppointments,
    deleteAppointment,
  } = usePatientAppointments();

  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    if (!user) return;
    loadPatientAppointments(sortOrder);
  }, [loadPatientAppointments, sortOrder]);

  return (
    <div className="container mt-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Időpontjaim</h2>

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc" ? "Legközelebbi elöl" : "Legtávolabbi elöl"}
        </button>
      </div>

      {loadingAppointments && <LoadingMessage text="Betöltés..." />}
      {appointmentsError && <p className="text-danger">{appointmentsError}</p>}

      {!loadingAppointments && !appointmentsError && (
        <PatientAppointmentsList
          appointments={appointments}
          onDelete={deleteAppointment}
        />
      )}
    </div>
  );
}

export default function PatientBookedAppointmentsPage() {
  return (
    <PatientLayout>
      <PatientAppointmentsProvider>
        <PatientBookedAppointmentsContent />
      </PatientAppointmentsProvider>
    </PatientLayout>
  );
}
