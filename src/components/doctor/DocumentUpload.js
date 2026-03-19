import React, { useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";
import "../css/documentupload.css";

export default function DocumentUpload() {
	const { user } = useContext(AuthContext);
	const [file, setFile] = useState(null);
	const [patientTaj, setPatientTaj] = useState("");
	const [specialization, setSpecialization] = useState("");
	const [date, setDate] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		if (!file || !patientTaj || !specialization || !date) {
			setError("Minden mező kitöltése kötelező!");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		formData.append("taj", patientTaj);
		formData.append("specialization", specialization);
		formData.append("date", date);
		setLoading(true);
		try {
			await myAxios.post("/api/documents", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setMessage("Dokumentum sikeresen feltöltve!");
			setFile(null);
			setPatientTaj("");
			setSpecialization("");
			setDate("");
		} catch (err) {
			setError("Hiba történt a feltöltés során.");
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
						Kitölthető űrlap szakterület megnevezésével, dokumentum feltöltéssel
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
									<label htmlFor="specialization">Szakterület</label>
									<input
										id="specialization"
										type="text"
										value={specialization}
										onChange={(e) => setSpecialization(e.target.value)}
										required
										placeholder="Pl. Kardiológia"
									/>
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
								<button className="upload-btn" type="submit" disabled={loading}>
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
