export default function DocumentCard({ doc }) {
  return (
    <div className="card mb-3">
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
  );
}