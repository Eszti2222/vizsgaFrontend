import React, { useContext, useEffect, useMemo, useState } from "react";
import { DoctorContext } from "../contexts/DoctorContext";
import DoctorComponent from "../components/patient/DoctorComponent";
import { myAxios } from "../services/api";

export default function DoctorsPage() {
  const { doctors, loadingDoctors, doctorError, loadDoctors } =
    useContext(DoctorContext);

  const [specializations, setSpecializations] = useState([]);
  const [selectedSpec, setSelectedSpec] = useState(""); // "" = összes
/*
  useEffect(() => {
    loadDoctors();
  }, [loadDoctors]);
*/
  useEffect(() => {
    (async () => {
      try {
        const { data } = await myAxios.get("/api/specializations");
        setSpecializations(data);
      } catch (err) {
        console.error("Error fetching specializations:", err);
      }
    })();
  }, []);

  //Szűrt lista (nem módosítja az eredeti sorrendet)
  const filteredDoctors = useMemo(() => {
    if (!selectedSpec) return doctors;
    return doctors.filter((d) => d.specialization === selectedSpec);
  }, [doctors, selectedSpec]);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Orvosaink</h2>

        {/* Dropdown filter */}
        <select
          className="form-select form-select-sm"
          style={{ width: 260 }}
          value={selectedSpec}
          onChange={(e) => setSelectedSpec(e.target.value)}
        >
          <option value="">Összes szakterület</option>
          {specializations.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
      </div>

      {loadingDoctors && <p>Orvosok betöltése...</p>}
      {doctorError && <p className="text-danger">{doctorError}</p>}

      {!loadingDoctors && filteredDoctors.length === 0 && (
        <p>Nincs megjeleníthető orvos.</p>
      )}
      <div className="row g-3">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
            <DoctorComponent doctor={doctor} />
          </div>
        ))}
      </div>
    </div>
  );
}
