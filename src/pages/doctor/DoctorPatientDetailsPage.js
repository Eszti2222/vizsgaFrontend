import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";
import DoctorAppointmentsList from "../../components/doctor/DoctorAppointmentsList";
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
        const response = await myAxios.get(`/api/doctor/patients/${id}`);
        const nextPatient = getPatientFromResponse(response.data);

        setPatient(nextPatient);
        setAppointments(getAppointmentsFromResponse(response.data));
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
  }, [id, user]);

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

        {loading && <p>Betöltés...</p>}
        {error && <p className="text-danger">{error}</p>}

        {!loading && !error && patient && (
          <>
            <section className="doctor-patient-detail-card">
              <h3>Személyes adatok</h3>
              <dl className="doctor-patient-detail-list doctor-patient-details-grid">
                <div>
                  <dt>Név</dt>
                  <dd>{patient.name || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>TAJ</dt>
                  <dd>{patient.social_security_number || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Születési dátum</dt>
                  <dd>{patient.birth_date || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{patient.email || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Telefonszám</dt>
                  <dd>{patient.phone_number || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Ország</dt>
                  <dd>{patient.country || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Város</dt>
                  <dd>{patient.city || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Irányítószám</dt>
                  <dd>{patient.postal_code || "Nincs megadva"}</dd>
                </div>
                <div>
                  <dt>Cím</dt>
                  <dd>{patient.street_address || "Nincs megadva"}</dd>
                </div>
              </dl>
            </section>

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