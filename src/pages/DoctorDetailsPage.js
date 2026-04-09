import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { myAxios } from "../services/api";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data } = await myAxios.get(`/api/doctors/${id}`);
        setDoctor(data);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 404) {
          setError("Az orvos nem található.");
        } else if (err.response?.status === 403) {
          setError("Nincs jogosultságod az orvos adatainak megtekintéséhez.");
        } else {
          setError("Nem sikerült betölteni az orvos adatait.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-4">
        <p>Betöltés...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/doctors" className="btn btn-secondary mt-2">
          Vissza az orvosokhoz
        </Link>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="container mt-4">
        <p>Nincs megjeleníthető adat az orvosról.</p>
        <Link to="/doctors" className="btn btn-secondary mt-2">
          Vissza az orvosokhoz
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="mb-3">
        <Link to="/doctors" className="btn btn-outline-secondary btn-sm">
          ← Vissza az orvosokhoz
        </Link>
      </div>

      <div className="mb-3">
        <Link to="/specialorders" className="btn btn-outline-secondary btn-sm">
          ← Vissza a szakrendelésekhez
        </Link>
      </div>

      <Link
        to={`/doctors/${id}/timetable`}
        state={{ doctorName: doctor.name }}
        className="btn btn-primary mt-3"
      >
        Időpont foglalása ehhez az orvoshoz
      </Link>

      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">{doctor.name}</h3>

          <p className="mb-2">
            <strong>Email:</strong> {doctor.email}
          </p>
          <p className="mb-2">
            <strong>Szakterület:</strong>{" "}
            {doctor.specialization || "Nincs megadva"}
          </p>
          <p className="mb-2">
            <strong>Telefonszám:</strong>{" "}
            {doctor.phone_number || "Nincs megadva"}
          </p>
          <p className="mb-2">
            <strong>Rendelő:</strong>{" "}
            {doctor.office_location || "Nincs megadva"}
          </p>
        </div>
      </div>
    </div>
  );
}
