import React, { useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";

export default function DocumentUpload() {
	const { user } = useContext(AuthContext);
	const [file, setFile] = useState(null);
	const [patientTaj, setPatientTaj] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setMessage("");
		setError("");
		if (!file || !patientTaj) {
			setError("Minden mező kitöltése kötelező!");
			return;
		}
		const formData = new FormData();
		formData.append("file", file);
		formData.append("taj", patientTaj);
		setLoading(true);
		try {
			await myAxios.post("/api/documents", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			setMessage("Dokumentum sikeresen feltöltve!");
			setFile(null);
			setPatientTaj("");
		} catch (err) {
			setError("Hiba történt a feltöltés során.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<DoctorLayout>
			<div className="document-upload-page">
				<h2>Dokumentum feltöltése pácienshez</h2>
				<form onSubmit={handleSubmit}>
					<div>
						<label>TAJ szám:</label>
						<input
							type="text"
							value={patientTaj}
							onChange={(e) => setPatientTaj(e.target.value)}
							required
						/>
					</div>
					<div>
						<label>Dokumentum:</label>
						<input
							type="file"
							onChange={(e) => setFile(e.target.files[0])}
							required
						/>
					</div>
					<button type="submit" disabled={loading}>
						{loading ? "Feltöltés..." : "Feltöltés"}
					</button>
				</form>
				{message && <p className="text-success">{message}</p>}
				{error && <p className="text-danger">{error}</p>}
			</div>
		</DoctorLayout>
	);
}
