import { createContext, useCallback, useContext, useState } from "react";
import { myAxios } from "../services/api";

const DoctorDocumentContext = createContext();

export function DoctorDocumentProvider({ children }) {
  const [documentTypes, setDocumentTypes] = useState([]);
  const [typesLoading, setTypesLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const clearFeedback = useCallback(() => {
    setError("");
    setMessage("");
  }, []);

  const loadDocumentTypes = useCallback(async () => {
    try {
      setTypesLoading(true);
      setError("");

      const { data } = await myAxios.get("/api/doctor/document-types");
      if (!Array.isArray(data)) {
        throw new Error("Invalid document types response");
      }

      const normalized = data
        .map((item) => ({
          id: item.id,
          type: item.type || item.name,
        }))
        .filter((item) => item.type);

      setDocumentTypes(normalized);
    } catch (_error) {
      setError("Nem sikerült betölteni a dokumentumtípusokat.");
    } finally {
      setTypesLoading(false);
    }
  }, []);

  const uploadDocument = useCallback(
    async ({ file, patientTaj, selectedType, date }) => {
      try {
        setUploadLoading(true);
        clearFeedback();

        const formData = new FormData();
        formData.append("file", file);
        formData.append("taj", patientTaj);
        formData.append("social_security_number", patientTaj);
        formData.append("patient_social_security_number", patientTaj);
        formData.append("type", selectedType);
        formData.append("document_type", selectedType);

        const selectedTypeEntry = documentTypes.find(
          (docType) => docType.type === selectedType,
        );
        if (selectedTypeEntry?.id) {
          formData.append("document_type_id", selectedTypeEntry.id);
          formData.append("type_id", selectedTypeEntry.id);
        }

        formData.append("date", date);
        formData.append("document_date", date);

        await myAxios.get("/sanctum/csrf-cookie");

        const uploadEndpoints = ["/api/documents", "/documents"];
        let uploaded = false;

        for (const endpoint of uploadEndpoints) {
          try {
            await myAxios.post(endpoint, formData, {
              headers: { "Content-Type": "multipart/form-data" },
            });
            uploaded = true;
            break;
          } catch (uploadError) {
            if (uploadError.response?.status === 404) {
              continue;
            }

            throw uploadError;
          }
        }

        if (!uploaded) {
          setError("A dokumentum feltöltési végpont nem található.");
          return false;
        }

        setMessage("Dokumentum sikeresen feltöltve!");
        return true;
      } catch (err) {
        if (err.response?.status === 422) {
          setError(
            err.response?.data?.message ||
              "Validációs hiba. Ellenőrizd a mezőket.",
          );
        } else if (err.response?.status === 403) {
          setError("Nincs jogosultság dokumentum feltöltéshez.");
        } else if (err.response?.status === 404) {
          setError("A dokumentum feltöltési végpont nem található.");
        } else {
          setError(err.response?.data?.message || "Hiba történt a feltöltés során.");
        }

        return false;
      } finally {
        setUploadLoading(false);
      }
    },
    [clearFeedback, documentTypes],
  );

  return (
    <DoctorDocumentContext.Provider
      value={{
        documentTypes,
        typesLoading,
        uploadLoading,
        error,
        message,
        clearFeedback,
        loadDocumentTypes,
        uploadDocument,
      }}
    >
      {children}
    </DoctorDocumentContext.Provider>
  );
}

export function useDoctorDocuments() {
  return useContext(DoctorDocumentContext);
}
