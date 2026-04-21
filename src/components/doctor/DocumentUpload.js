import React, { useEffect, useState } from "react";
import { useDoctorDocuments } from "../../contexts/DoctorDocumentContext";
import "../css/documentupload.css";

export default function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [patientTaj, setPatientTaj] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [date, setDate] = useState("");
  const [validationError, setValidationError] = useState("");
  const {
    documentTypes,
    typesLoading,
    uploadLoading,
    message,
    error,
    loadDocumentTypes,
    uploadDocument,
    clearFeedback,
  } = useDoctorDocuments();

  useEffect(() => {
    loadDocumentTypes();
  }, [loadDocumentTypes]);

  useEffect(() => {
    if (!selectedType && documentTypes.length > 0) {
      setSelectedType(documentTypes[0].type);
    }
  }, [documentTypes, selectedType]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidationError("");
    clearFeedback();

    if (!file || !patientTaj || !selectedType || !date) {
      setValidationError("Minden mező kitöltése kötelező!");
      return;
    }

    const normalizedTaj = patientTaj.trim();
    if (!/^\d{9}$/.test(normalizedTaj)) {
      setValidationError("A TAJ szám 9 számjegy legyen.");
      return;
    }

    const ok = await uploadDocument({
      file,
      patientTaj: normalizedTaj,
      selectedType,
      date,
    });

    if (ok) {
      setFile(null);
      setPatientTaj("");
      setSelectedType(documentTypes[0]?.type || "");
      setDate("");
    }
  };

  return (
    <div className="document-upload-page wireframe">
      <div className="upload-card wireframe">
        <h2>Dokumentum feltöltés</h2>
        <p className="upload-desc">
          Kitölthető űrlap dokumentumtípussal és dokumentum feltöltéssel
        </p>
        <form className="upload-form wireframe" onSubmit={handleSubmit}>
          <div className="upload-grid">
            <div className="upload-left">
              <div className="form-group">
                <label htmlFor="date">Dátum választó</label>
                <input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="image-placeholder">
                <span role="img" aria-label="image">
                  📄
                </span>
              </div>
            </div>
            <div className="upload-right">
              <div className="form-group">
                <label htmlFor="taj">TAJ szám szerinti keresés páciensekre</label>
                <input
                  id="taj"
                  type="text"
                  value={patientTaj}
                  onChange={(e) => setPatientTaj(e.target.value)}
                  required
                  placeholder="Pl. 123456789"
                />
              </div>
              <div className="form-group">
                <label htmlFor="documentType">Dokumentumtípus</label>
                <select
                  id="documentType"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  required
                  disabled={typesLoading || documentTypes.length === 0}
                >
                  {typesLoading && <option value="">Típusok betöltése...</option>}
                  {!typesLoading && documentTypes.length === 0 && (
                    <option value="">Nincs elérhető dokumentumtípus</option>
                  )}
                  {!typesLoading &&
                    documentTypes.map((docType) => (
                      <option key={docType.id} value={docType.type}>
                        {docType.type}
                      </option>
                    ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="file">Dokumentum</label>
                <div className="custom-file-input">
                  <input
                    id="file"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                  />
                  <label htmlFor="file" className="file-label">
                    {file ? file.name : "Fájl kiválasztása"}
                  </label>
                </div>
              </div>
              <button
                className="upload-btn"
                type="submit"
                disabled={uploadLoading || typesLoading || documentTypes.length === 0}
              >
                {uploadLoading ? "Feltöltés..." : "Feltöltés"}
              </button>
              {message && <div className="upload-success">{message}</div>}
              {validationError && <div className="upload-error">{validationError}</div>}
              {error && <div className="upload-error">{error}</div>}
            </div>
          </div>
        </form>
        <div className="card-corner-bottom-left">
          <span role="img" aria-label="lightbulb">
            💡
          </span>{" "}
          <span style={{ fontWeight: 600 }}>Tipp: PDF vagy kép feltölthető</span>
        </div>
      </div>
    </div>
  );
}
