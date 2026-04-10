import React, { useEffect, useState } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { myAxios } from "../../services/api";
import "../css/documentupload.css";

export default function DocumentUpload() {
	const [file, setFile] = useState(null);
	const [patientTaj, setPatientTaj] = useState("");
	const [selectedType, setSelectedType] = useState("");
	const [documentTypes, setDocumentTypes] = useState([]);
	const [typesLoading, setTypesLoading] = useState(true);
	const [date, setDate] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		let mounted = true;

		async function loadDocumentTypes() {
			setTypesLoading(true);
			setError("");

			const endpoints = [
				"/api/document-types",
				"/api/document_types",
				"/api/document-type",
				"/document-types",
				"/document_types",
				"/document-type",
			];
			let loaded = false;

			for (const endpoint of endpoints) {
				try {
					const { data } = await myAxios.get(endpoint);
					const source = Array.isArray(data)
						? data
						: Array.isArray(data?.data)
							? data.data
							: Object.values(data ?? {}).find((value) => Array.isArray(value)) || [];

					const normalized = source
						.map((item) => {
							if (typeof item === "string") {
								return { id: item, type: item };
							}

							if (item && typeof item === "object") {
								const typeValue = item.type || item.name || item.document_type;
								if (!typeValue) return null;

								return {
									id: item.id || item.document_type_id || typeValue,
									type: typeValue,
								};
							}

							return null;
						})
						.filter(Boolean);

					if (mounted) {
						setDocumentTypes(normalized);
						if (normalized.length > 0) {
							setSelectedType((prev) => prev || normalized[0].type);
						}
					}

					loaded = true;
					break;
				} catch (_err) {
					// Try next endpoint variant.
				}
			}

			if (!loaded && mounted) {
				setError("Nem sikerült betölteni a dokumentumtípusokat.");
			}

			if (mounted) {
				setTypesLoading(false);
			}
		}

		loadDocumentTypes();

		return () => {
			mounted = false;
		};
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		if (!file || !patientTaj || !selectedType || !date) {
			setError("Minden mező kitöltése kötelező!");
			return;
		}

		const normalizedTaj = patientTaj.trim();
		if (!/^\d{9}$/.test(normalizedTaj)) {
			setError("A TAJ szám 9 számjegy legyen.");
			return;
		}

		const formData = new FormData();
		formData.append("file", file);
		formData.append("taj", normalizedTaj);
		formData.append("social_security_number", normalizedTaj);
		formData.append("patient_social_security_number", normalizedTaj);
		formData.append("type", selectedType);
		formData.append("document_type", selectedType);

		const selectedTypeEntry = documentTypes.find((docType) => docType.type === selectedType);
		if (selectedTypeEntry?.id) {
			formData.append("document_type_id", selectedTypeEntry.id);
			formData.append("type_id", selectedTypeEntry.id);
		}

		formData.append("date", date);
		formData.append("document_date", date);
		setLoading(true);
		try {
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
				return;
			}

			setMessage("Dokumentum sikeresen feltöltve!");
			setFile(null);
			setPatientTaj("");
			setSelectedType(documentTypes[0]?.type || "");
			setDate("");
		} catch (err) {
			if (err.response?.status === 422) {
				setError(err.response?.data?.message || "Validációs hiba. Ellenőrizd a mezőket.");
			} else if (err.response?.status === 403) {
				setError("Nincs jogosultság dokumentum feltöltéshez.");
			} else if (err.response?.status === 404) {
				setError("A dokumentum feltöltési végpont nem található.");
			} else {
				setError(err.response?.data?.message || "Hiba történt a feltöltés során.");
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<DoctorLayout>
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
									disabled={loading || typesLoading || documentTypes.length === 0}
								>
									{loading ? "Feltöltés..." : "Feltöltés"}
								</button>
								{message && <div className="upload-success">{message}</div>}
								{error && <div className="upload-error">{error}</div>}
							</div>
						</div>
					</form>
					{/* Új bal alsó sarok elem */}
					<div className="card-corner-bottom-left">
						<span role="img" aria-label="lightbulb">💡</span> <span style={{ fontWeight: 600 }}>Tipp: PDF vagy kép feltölthető</span>
					</div>
				</div>
			</div>
		</DoctorLayout>
	);
}
