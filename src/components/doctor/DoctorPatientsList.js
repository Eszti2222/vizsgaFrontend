import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";
import PatientComponent from "./PatientComponent";
import DoctorPatientCreateForm from "./DoctorPatientCreateForm";
 import "../css/doctorpatients.css";

export default function DoctorPatientsList() {
	const { user } = useContext(AuthContext);
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState("");

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

	useEffect(() => {
		if (!user || user.role !== "doctor") return;

		loadPatients();
	}, [user]);

	function toggleCreateForm() {
		setShowCreateForm((prev) => !prev);
		setSaveSuccess("");
	}

	function handleCreateSuccess(createdPatient) {
		if (createdPatient) {
			setPatients((prev) => {
				const alreadyExists = prev.some((patient) => {
					if (createdPatient.id && patient.id) {
						return patient.id === createdPatient.id;
					}

					return (
						patient.social_security_number &&
						createdPatient.social_security_number &&
						patient.social_security_number === createdPatient.social_security_number
					);
				});

				if (alreadyExists) {
					return prev;
				}

				return [createdPatient, ...prev];
			});
		}

		setShowCreateForm(false);
		setSaveSuccess("Az új páciens sikeresen rögzítve lett.");
	}

	return (
		<DoctorLayout>
			<div className="doctor-patients-list-page">
				<div className="doctor-patients-header">
					<h2>Saját pácienseim</h2>
					<button className="patient-create-button" type="button" onClick={toggleCreateForm}>
						{showCreateForm ? "Mégse" : "Új páciens felvitele"}
					</button>
				</div>
				{saveSuccess && <p className="form-success-message">{saveSuccess}</p>}
				{showCreateForm && (
					<DoctorPatientCreateForm onSuccess={handleCreateSuccess} onCancel={toggleCreateForm} />
				)}
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
