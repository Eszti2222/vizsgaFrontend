import React from "react";
import DocumentCard from "./DocumentCard";

export default function PatientDocumentsList({
  documents,
  emptyMessage = "Nincs feltöltött dokumentum.",
}) {
  if (!documents || documents.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <>
      {documents.map((doc) => (
        <DocumentCard key={doc.id} doc={doc} />
      ))}
    </>
  );
}