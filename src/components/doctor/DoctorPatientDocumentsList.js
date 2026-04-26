import React from "react";
import myAxios from "../../services/api";

export default function DoctorPatientDocumentsList({
  documents,
  emptyMessage = "Ehhez a pácienshez még nincs feltöltött dokumentum.",
}) {
  const handleViewDocument = async (docId) => {
    try {
      const response = await myAxios.get(`/api/doctor/documents/${docId}/view`, {
        responseType: "blob",
        withCredentials: true,
      });

      const fileURL = window.URL.createObjectURL(response.data);
      window.open(fileURL);
    } catch (docError) {
      if (docError.response?.status === 404) {
        alert("Ehhez a dokumentumhoz nem tartozik feltöltött fájl.");
      } else if (docError.response?.status === 401) {
        alert("A munkamenet lejárt. Jelentkezz be újra.");
      } else if (docError.response?.status === 403) {
        alert("Nincs jogosultság a dokumentum megnyitásához.");
      } else {
        alert("Nem sikerült megnyitni a dokumentumot.");
      }
    }
  };

  if (!documents || documents.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <>
      {documents.map((doc) => (
        <div key={doc.id} className="card mb-3 shadow-sm">
          <div className="card-body">
            <h5>{doc.type}</h5>
            <p>
              <strong>Dátum:</strong>{" "}
              {new Date(doc.created_at).toLocaleDateString("hu-HU")}
            </p>
            <button
              className="btn btn-outline-primary btn-sm"
              onClick={() => handleViewDocument(doc.id)}
            >
              Dokumentum megtekintése
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
