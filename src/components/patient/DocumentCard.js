import myAxios from "../../services/api";

export default function DocumentCard({ doc }) {

  const handleViewDocument = async (docId) => {
    try {
      const response = await myAxios.get(
        `/api/documents/${docId}/view`,
        {
          responseType: "blob",
          withCredentials: true,
        }
      );

      const fileURL = window.URL.createObjectURL(response.data);
      window.open(fileURL);
    } catch (error) {
      if (error.response?.status === 404) {
        alert("Ehhez a dokumentumhoz nem tartozik feltöltött fájl.");
      } else if (error.response?.status === 401) {
        alert("Nincs jogosultság a dokumentum megnyitásához.");
      } else {
        alert("Nem sikerült megnyitni a dokumentumot.");
      }
    }
  };

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5>{doc.type}</h5>

        <p>
          <strong>Orvos:</strong> {doc.doctor_name}
        </p>

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
  );
}