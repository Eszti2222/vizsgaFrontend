import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { usePatients } from "../../contexts/PatientConext";
import PatientComponent from "../../components/doctor/PatientComponent";
import DoctorAppointmentsList from "../../components/doctor/DoctorAppointmentsList";
import LoadingMessage from "../../components/common/LoadingMessage";
import "../../components/css/doctorpatients.css";
import "../css/bookedtimes.css";

function getAppointmentTimestamp(appointment) {
  return (
    appointment?.appointment_time ||
    appointment?.date_time ||
    appointment?.start_time ||
    appointment?.starts_at ||
    ""
  );
}

function getAppointmentsFromResponse(data) {
  return Array.isArray(data?.appointments) ? data.appointments : [];
}

function getPatientFromResponse(data) {
  return data?.patient ?? null;
}

export default function DoctorPatientDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const { loadPatientDetails } = usePatients();
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizedAppointments = appointments.map((appointment, index) => ({
    id: appointment.id || `appointment-${index}`,
    appointment_time: getAppointmentTimestamp(appointment),
    status: appointment.status,
    patient_name: patient?.name,
  }));

  useEffect(() => {
    if (!user || user.role !== "doctor") {
      setLoading(false);
      setError("Nincs jogosultságod a páciens adatainak megtekintéséhez.");
      return;
    }

    const loadPatient = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await loadPatientDetails(id);
        setPatient(data.patient);
        setAppointments(data.appointments);
      } catch (requestError) {
        if (requestError.response?.status === 404) {
          setError("A páciens nem található.");
        } else if (requestError.response?.status === 403) {
          setError("Nincs jogosultságod a páciens adatainak megtekintéséhez.");
        } else {
          setError("Nem sikerült betölteni a páciens adatait.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadPatient();
  }, [id, loadPatientDetails, user]);

  return (
    <DoctorLayout>
      <div className="doctor-patients-list-page doctor-patient-details-page">
        <div className="doctor-patient-details-header">
          <div>
            <h2>Páciens adatai</h2>
            {!loading && patient && <p>{patient.name || "Ismeretlen páciens"}</p>}
          </div>
          <Link to="/patients" className="doctor-patient-back-link">
            Vissza a páciensek listájához
          </Link>
        </div>

        {loading && <LoadingMessage />}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && patient && (
          <>
            <PatientComponent patient={patient} showLink={false} />

            <section className="doctor-patient-appointments-card">
              <h3>A páciens időpontjai</h3>
              <div className="booked-times-page">
                <DoctorAppointmentsList
                  appointments={normalizedAppointments}
                  showPatientName={false}
                  emptyMessage="Ehhez a pácienshez még nincs foglalt időpont."
                />
              </div>
            </section>
          </>
        )}
      </div>
    </DoctorLayout>
  );
}