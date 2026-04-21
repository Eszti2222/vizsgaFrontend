import React, { useState } from "react";
import { usePatients } from "../../contexts/PatientConext";

const initialFormState = {
  name: "",
  email: "",
  social_security_number: "",
  birth_date: "",
};

export default function DoctorPatientCreateForm({ onSuccess, onCancel }) {
  const { createPatient } = usePatients();
  const [formData, setFormData] = useState(initialFormState);
  const [formErrors, setFormErrors] = useState({});
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  function validateForm() {
    const nextErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = "A név megadása kötelező.";
    }

    if (!formData.email.trim()) {
      nextErrors.email = "Az email cím megadása kötelező.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      nextErrors.email = "Az email cím formátuma nem megfelelő.";
    }

    if (!formData.social_security_number.trim()) {
      nextErrors.social_security_number = "A TAJ szám megadása kötelező.";
    } else if (!/^\d{9}$/.test(formData.social_security_number)) {
      nextErrors.social_security_number = "A TAJ szám 9 számjegyből álljon.";
    }

    if (!formData.birth_date) {
      nextErrors.birth_date = "A születési dátum megadása kötelező.";
    }

    return nextErrors;
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setSaveError("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setFormErrors(nextErrors);
      return;
    }

    setSaving(true);
    setSaveError("");

    try {
      const createdPatient = await createPatient(formData);

      setFormData(initialFormState);
      setFormErrors({});
      if (onSuccess) {
        onSuccess(createdPatient);
      }
    } catch (requestError) {
      if (requestError.response?.status === 422 && requestError.response.data?.errors) {
        setFormErrors(requestError.response.data.errors);
        setSaveError("Az adatok ellenőrzése sikertelen.");
      } else if (requestError.response?.status === 403) {
        setSaveError("Nincs jogosultság új páciens felvitelére.");
      } else {
        setSaveError("Nem sikerült rögzíteni az új pácienst.");
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form className="patient-create-form" onSubmit={handleSubmit}>
      <div className="patient-create-form-grid">
        <div className="patient-form-field">
          <label htmlFor="name">Teljes név</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Páciens neve"
          />
          {formErrors.name && <span className="field-error">{formErrors.name}</span>}
        </div>
        <div className="patient-form-field">
          <label htmlFor="email">Email cím</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="pelda@email.hu"
          />
          {formErrors.email && <span className="field-error">{formErrors.email}</span>}
        </div>
        <div className="patient-form-field">
          <label htmlFor="social_security_number">TAJ szám</label>
          <input
            id="social_security_number"
            name="social_security_number"
            type="text"
            inputMode="numeric"
            maxLength="9"
            value={formData.social_security_number}
            onChange={handleInputChange}
            placeholder="123456789"
          />
          {formErrors.social_security_number && (
            <span className="field-error">{formErrors.social_security_number}</span>
          )}
        </div>
        <div className="patient-form-field">
          <label htmlFor="birth_date">Születési dátum</label>
          <input
            id="birth_date"
            name="birth_date"
            type="date"
            value={formData.birth_date}
            onChange={handleInputChange}
          />
          {formErrors.birth_date && <span className="field-error">{formErrors.birth_date}</span>}
        </div>
      </div>
      {saveError && <p className="form-error-message">{saveError}</p>}
      <div className="patient-create-actions">
        <button className="patient-create-button patient-cancel-button" type="button" onClick={onCancel}>
          Mégse
        </button>
        <button className="patient-save-button" type="submit" disabled={saving}>
          {saving ? "Mentés..." : "Páciens mentése"}
        </button>
      </div>
    </form>
  );
}
