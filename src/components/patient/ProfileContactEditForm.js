import React, { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa";
import { myAxios } from "../../services/api";

export default function ProfileContactEditForm({ user, loadUser }) {
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState("");
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    postal_code: "",
    street_address: "",
    phone_number: "",
  });

  useEffect(() => {
    if (!user) return;

    setFormData({
      country: user.country || "",
      city: user.city || "",
      postal_code: user.postal_code || "",
      street_address: user.street_address || "",
      phone_number: user.phone_number || "",
    });
  }, [user]);

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveError("");
    setSaveSuccess("");
  }

  function startEditing() {
    setIsEditing(true);
    setSaveError("");
    setSaveSuccess("");
  }

  function cancelEditing() {
    if (user) {
      setFormData({
        country: user.country || "",
        city: user.city || "",
        postal_code: user.postal_code || "",
        street_address: user.street_address || "",
        phone_number: user.phone_number || "",
      });
    }

    setIsEditing(false);
    setSaveError("");
    setSaveSuccess("");
  }

  async function saveProfileFields() {
    setSaving(true);
    setSaveError("");
    setSaveSuccess("");

    const payload = {
      country: formData.country.trim(),
      city: formData.city.trim(),
      postal_code: formData.postal_code.trim(),
      street_address: formData.street_address.trim(),
      phone_number: formData.phone_number.trim(),
    };

    try {
      await myAxios.get("/sanctum/csrf-cookie");

      try {
        await myAxios.patch("/api/profile", payload);
      } catch (patchError) {
        if (patchError.response?.status === 404 || patchError.response?.status === 405) {
          await myAxios.put("/api/profile", payload);
        } else {
          throw patchError;
        }
      }

      await loadUser();
      setIsEditing(false);
      setSaveSuccess("Profil adatok sikeresen mentve.");
    } catch (error) {
      if (error.response?.status === 422) {
        setSaveError("Hibás adatok. Kérlek ellenőrizd a mezőket.");
      } else if (error.response?.status === 403) {
        setSaveError("Nincs jogosultság a profil szerkesztéséhez.");
      } else {
        setSaveError("Nem sikerült menteni a profil adatokat.");
      }
    } finally {
      setSaving(false);
    }
  }

  const editableFields = [
    { key: "country", label: "Ország" },
    { key: "city", label: "Város" },
    { key: "postal_code", label: "Irányítószám" },
    { key: "street_address", label: "Cím" },
    { key: "phone_number", label: "Telefonszám" },
  ];

  return (
    <div className="profile-edit-section">
      {saveError && <p className="profile-message error">{saveError}</p>}
      {saveSuccess && <p className="profile-message success">{saveSuccess}</p>}

      {!isEditing && (
        <div className="profile-editable-list">
          {editableFields.map((field) => (
            <div className="profile-row" key={field.key}>
              <span className="profile-label">{field.label}:</span>
              <div className="profile-editable-right">
                <span>{user?.[field.key] || "Nincs megadva"}</span>
                <button
                  className="profile-icon-btn"
                  type="button"
                  onClick={startEditing}
                  aria-label={`${field.label} szerkesztése`}
                  title="Szerkesztés"
                >
                  <FaPen size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isEditing && (
        <div className="profile-edit-grid">
          <label className="profile-input-group">
            <span>Ország</span>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              placeholder="Pl. Magyarország"
            />
          </label>

          <label className="profile-input-group">
            <span>Város</span>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Pl. Budapest"
            />
          </label>

          <label className="profile-input-group">
            <span>Irányítószám</span>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleInputChange}
              placeholder="Pl. 1111"
            />
          </label>

          <label className="profile-input-group">
            <span>Cím</span>
            <input
              type="text"
              name="street_address"
              value={formData.street_address}
              onChange={handleInputChange}
              placeholder="Utca, házszám"
            />
          </label>

          <label className="profile-input-group">
            <span>Telefonszám</span>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleInputChange}
              placeholder="+36..."
            />
          </label>

          <div className="profile-edit-actions">
            <button
              className="profile-action-btn secondary"
              type="button"
              onClick={cancelEditing}
              disabled={saving}
            >
              Mégse
            </button>
            <button
              className="profile-action-btn"
              type="button"
              onClick={saveProfileFields}
              disabled={saving}
            >
              {saving ? "Mentés..." : "Mentés"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
