import React, { useEffect, useState } from "react";
import { myAxios } from "../../services/api";

export default function PatientDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await myAxios.get("/api/documents");
        setDocuments(data);
      } catch (error) {
        console.error("Hiba a dokumentumok betöltésekor:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Dokumentumok betöltése...</p>;

  return (
    <div className="container mt-4">
      <h2>Dokumentumaim</h2>

      {documents.length === 0 ? (
        <p>Nincs feltöltött dokumentum.</p>
      ) : (
        documents.map((doc) => (
          <div key={doc.id} className="card mb-3">
            <div className="card-body">
              <h5>{doc.type}</h5>
              <p><strong>Orvos:</strong> {doc.doctor_name}</p>
              <p><strong>Leírás:</strong> {doc.description || "—"}</p>
              <p>
                <strong>Dátum:</strong>{" "}
                {new Date(doc.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}