import { createContext, useCallback, useContext, useState } from "react";
import { createContext, use { myAxios } from "../services/api";

const PatientDocumentContext = createContext();

export function PatientDocumentProvider({ children }) {
  const [documents, setDocuments] = useState([]);
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [documentError, setDocumentError] = useState("");

  const loadDocuments = useCallback(async () => {
    try {
      setLoadingDocuments(true);
      setDocumentError("");

      const { data } = await myAxios.get("/api/documents");
      setDocuments(Array.isArray(data) ? data : []);
    } catch (_error) {
      setDocumentError("Nem sikerült betölteni a dokumentumokat.");
    } finally {
      setLoadingDocuments(false);
    }
  }, []);

  return (
    <PatientDocumentContext.Provider
      value={{
        documents,
        loadingDocuments,
        documentError,
        loadDocuments,
      }}
    >
      {children}
    </PatientDocumentContext.Provider>
  );
}

export function usePatientDocuments() {
  return useContext(PatientDocumentContext);
}