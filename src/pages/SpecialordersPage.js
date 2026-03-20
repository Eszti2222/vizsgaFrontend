import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { myAxios } from "../services/api";

export default function SpecialordersPage() {
  const [specializations, setSpecializations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Szakterületek betöltése backendről
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

  const handleOpenSpecialization = (spec) => {
    // Átirányítás az orvos listára, szakterület szerint szűrve
    navigate(`/doctors?specialization=${encodeURIComponent(spec)}`);
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

      {specializations.length === 0 && (
        <p>Jelenleg nincs elérhető szakterület.</p>
      )}

      <div className="row g-3 mt-3">
        {specializations.map((spec) => (
          <div key={spec} className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{spec}</h5>
                <p className="card-text text-muted mb-3">
                  Az adott szakterülethez tartozó orvosok megtekintése.
                </p>
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
    </div>
  );
}