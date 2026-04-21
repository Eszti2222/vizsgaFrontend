import React, { useEffect, useState } from "react";
import myAxios from "../../services/api";
import DocumentCard from "../../components/patient/DocumentCard";
import LoadingMessage from "../../components/common/LoadingMessage";

export default function PatientDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const { data } = await myAxios.get("/api/documents");
      setDocuments(data);
    } catch (error) {
      console.error("Hiba a dokumentumok betöltésekor:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const sortedDocuments = [...documents].sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    return sortOrder === "asc"
      ? dateA - dateB
      : dateB - dateA;
  });

  if (loading) {
    return <LoadingMessage text="Dokumentumok betöltése..." />;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dokumentumaim</h2>

        <button
          className="btn btn-outline-secondary btn-sm"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }
        >
          {sortOrder === "asc"
            ? "Legújabb elöl"
            : "Legrégebbi elöl"}
        </button>
      </div>
      {sortedDocuments.length === 0 && (
        <p>Nincs feltöltött dokumentum.</p>
      )}

      {sortedDocuments.length > 0 &&
        sortedDocuments.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
    </div>
  );
}