import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";
import PatientComponent from "./PatientComponent";
import "../css/doctorpatients.css";

export default function DoctorPatientsList() {
	const { user } = useContext(AuthContext);
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!user || user.role !== "doctor") return;

		const loadPatients = async () => {
			setLoading(true);
			setError("");

			try {
				const res = await myAxios.get("/api/doctor/patients");
				setPatients(Array.isArray(res.data) ? res.data : []);
			} catch (error) {
				setError("Nem sikerült lekérni a pácienseket.");
			} finally {
				setLoading(false);
			}
		};

		loadPatients();
	}, [user]);

	return (
		<DoctorLayout>
			<div className="doctor-patients-list-page">
				<h2>Saját pácienseim</h2>
				{loading && <p>Betöltés...</p>}
				{error && <p className="text-danger">{error}</p>}
				{!loading && !error && patients.length === 0 && (
					<p>Nincs az orvoshoz foglalt időponttal rendelkező páciens.</p>
				)}
				{!loading && !error && patients.length > 0 && (
					<div className="patients-grid">
						{patients.map((patient, i) => (
							<PatientComponent patient={patient} key={i} />
						))}
					</div>
				)}
			</div>
		</DoctorLayout>
	);
}
