import React, { useEffect, useState } from "react";
import { myAxios } from "../../services/api";
import DocumentCard from "../../components/patient/DocumentCard";
import LoadingMessage from "../../components/common/LoadingMessage";

export default function PatientDocumentsPage() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await myAxios.get("/api/documents");
      setDocuments(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <LoadingMessage text="Dokumentumok betöltése..." />;

  return (
    <div className="container mt-4">
      <h2>Dokumentumaim</h2>

      {documents.length === 0 ? (
        <p>Nincs feltöltött dokumentum.</p>
      ) : (
        documents.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))
      )}
    </div>
  );
}
