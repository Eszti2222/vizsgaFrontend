import React, { useEffect, useState } from "react";
import { myAxios } from "../services/api";

export default function SpecialordersPage() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpec, setSelectedSpec] = useState(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchSpecializations = async () => {
      try {
        setLoading(true);
        const { data } = await myAxios.get("/api/specializations");
        setSpecializations(data);
      } catch (error) {
        console.error("Hiba a szakterületek betöltésekor:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecializations();
  }, []);

  const handleOpenSpecialization = async (spec) => {
    setSelectedSpec(spec);
    try {
      const { data } = await myAxios.get(
        `/api/doctors?specialization=${encodeURIComponent(spec)}`
      );
      setFilteredDoctors(data);
    } catch (error) {
      console.error("Hiba az orvosok betöltésekor:", error);
    }
  };

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Szakterületek betöltése...</p>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Szakrendelések</h2>
      <p className="text-muted">
        Válassz egy szakterületet, hogy lásd az ahhoz tartozó orvosokat.
      </p>

      <div className="row g-3 mt-3">
        {specializations.map((spec) => (
          <div key={spec} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{spec}</h5>
                <button
                  type="button"
                  className="btn btn-primary mt-auto"
                  onClick={() => handleOpenSpecialization(spec)}
                >
                  Orvosok megtekintése
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ORVOSLISTA SZŰRVE */}
      {selectedSpec && (
        <div className="mt-5">
          <h3>{selectedSpec} szak orvosai</h3>

          {filteredDoctors.length === 0 ? (
            <p>Nincs elérhető orvos ebben a szakban.</p>
          ) : (
            <div className="row g-3">
              {filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="col-12 col-md-6 col-lg-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{doctor.name}</h5>
                      <p className="card-text">
                        <strong>Email:</strong> {doctor.email}
                      </p>
                      <p className="card-text">
                        <strong>Rendelő:</strong>{" "}
                        {doctor.office_location || "Nincs megadva"}
                      </p>
                      {/* Ide fog jönni mindjárt a részletek gomb */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}