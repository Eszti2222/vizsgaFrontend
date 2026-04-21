import React from "react";
import { Link } from "react-router";

export default function PatientComponent({ patient, showLink = true }) {
  // Detail view - csak az adatok, link nélkül
  if (!showLink) {
    return (
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
    );
  }

  // List view - kártya, linkkel
  return (
    <Link
      to={`/patients/${patient.id}`}
      className="card mb-3 patient-card-link"
      aria-label={`${patient.name} adatainak megnyitása`}
    >
      <div className="card-body">
        <div className="patient-card-header">
          <h5 className="card-title">{patient.name}</h5>
          <span className="patient-card-action">Részletek</span>
        </div>

        <p className="card-text">
          <strong>TAJ:</strong>{" "}
          {patient.social_security_number || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Születési dátum:</strong>{" "}
          {patient.birth_date || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Email:</strong>{" "}
          {patient.email || "Nincs megadva"}
        </p>

        <p className="card-text">
          <strong>Telefon szám:</strong>{" "}
          {patient.phone_number || "Nincs megadva"}
        </p>
      </div>
    </Link>
  );
}