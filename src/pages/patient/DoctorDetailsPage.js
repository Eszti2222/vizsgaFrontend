import { useParams, Link } from "react-router";
import { useEffect, useState } from "react";
import { myAxios } from "../../services/api";
import DoctorDetailsCard from "../../components/patient/DoctorDetailsCard";
import LoadingMessage from "../../components/common/LoadingMessage";
import ErrorMessage from "../../components/common/ErrorMessage";

export default function DoctorDetailsPage() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await myAxios.get(`/api/doctors/${id}`);
        setDoctor(data);
      } catch {
        setError("Nem sikerült betölteni az orvos adatait.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <LoadingMessage />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mt-4">
      <div className="mb-3 d-flex gap-2 flex-wrap">
        <Link to="/doctors" className="btn btn-outline-secondary btn-sm">
          ← Vissza az orvosokhoz
        </Link>

        <Link to="/specialorders" className="btn btn-outline-secondary btn-sm">
          ← Vissza a szakrendelésekhez
        </Link>

        <Link
          to={`/doctors/${id}/timetable`}
          state={{ doctorName: doctor.name }}
          className="btn btn-primary btn-sm"
        >
          Időpont foglalása
        </Link>
      </div>
      <div className="row">
        <div className="col-12 col-lg-8">
          <DoctorDetailsCard doctor={doctor} />
        </div>
      </div>
    </div>
  );
}
