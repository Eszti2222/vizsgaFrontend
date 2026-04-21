import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import PatientLayout from "../../layouts/PatientLayout";
import {
  PatientSpecializationProvider,
  usePatientSpecializations,
} from "../../contexts/PatientSpecializationContext";
import SpecializationList from "../../components/patient/SpecializationList";
import DoctorComponent from "../../components/patient/DoctorComponent";
import LoadingMessage from "../../components/common/LoadingMessage";

function SpecialordersContent() {
  const {
    specializations,
    doctors,
    loadingSpecializations,
    loadingDoctors,
    error,
    loadSpecializations,
    loadDoctorsBySpecialization,
  } = usePatientSpecializations();

  const [selectedSpec, setSelectedSpec] = useState(null);

  useEffect(() => {
    loadSpecializations();
  }, [loadSpecializations]);

  const handleSelectSpecialization = async (spec) => {
    setSelectedSpec(spec);
    await loadDoctorsBySpecialization(spec);
  };

  return (
    <div className="container mt-4">
      <h2>Szakrendelések</h2>
      <p className="text-muted">
        Válassz egy szakterületet, hogy lásd az ahhoz tartozó orvosokat.
      </p>

      {loadingSpecializations && <LoadingMessage text="Szakrendelések betöltése..." />}
      {error && <p className="text-danger">{error}</p>}

      {!loadingSpecializations && !error && (
        <SpecializationList
          specializations={specializations}
          onSelect={handleSelectSpecialization}
        />
      )}

      {selectedSpec && (
        <div className="mt-5">
          <h3>{selectedSpec} szak orvosai</h3>

          {loadingDoctors && <LoadingMessage text="Orvosok betöltése..." />}

          {!loadingDoctors && doctors.length === 0 && (
            <p>Nincs elérhető orvos ebben a szakban.</p>
          )}

          <div className="row g-3">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
                <DoctorComponent doctor={doctor} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpecialordersPage() {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== "patient") {
    return <PatientLayout />;
  }

  return (
    <PatientLayout>
      <PatientSpecializationProvider>
        <SpecialordersContent />
      </PatientSpecializationProvider>
    </PatientLayout>
  );
}