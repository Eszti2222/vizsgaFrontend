import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";
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

function formatAppointmentDate(appointment) {
  const appointmentTime = getAppointmentTimestamp(appointment);

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

function formatAppointmentTime(appointment) {
  const appointmentTime = getAppointmentTimestamp(appointment);

  if (!appointmentTime) return "-";

  if (typeof appointmentTime === "string") {
    const parts = appointmentTime.split(" ");
    if (parts.length >= 2 && /^\d{2}:\d{2}(:\d{2})?$/.test(parts[1])) {
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

export default function DoctorPatientDetailsPage() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [patient, setPatient] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
              {appointments.length === 0 ? (
                <p>Ehhez a pácienshez még nincs foglalt időpont.</p>
              ) : (
                <div className="booked-times-page">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Dátum</th>
                        <th>Időpont</th>
                        <th>Státusz</th>
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map((appointment) => (
                        <tr key={appointment.id || getAppointmentTimestamp(appointment)}>
                          <td>{formatAppointmentDate(appointment)}</td>
                          <td>{formatAppointmentTime(appointment)}</td>
                          <td>{appointment.status || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </DoctorLayout>
  );
}