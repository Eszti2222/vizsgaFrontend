import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { usePatients } from "../../contexts/PatientContext";
import PatientComponent from "./PatientComponent";
import DoctorPatientCreateForm from "./DoctorPatientCreateForm";
 import "../css/doctorpatients.css";

export default function DoctorPatientsList() {
	const { user } = useContext(AuthContext);
	const { patients, loadingPatients, patientError, loadPatients } = usePatients();
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [saveSuccess, setSaveSuccess] = useState("");

	useEffect(() => {
		if (!user || user.role !== "doctor") return;

		loadPatients();
	}, [user]);

	function toggleCreateForm() {
		setShowCreateForm((prev) => !prev);
		setSaveSuccess("");
	}

	async function handleCreateSuccess() {
		await loadPatients();
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
				{loadingPatients && <p>Betöltés...</p>}
				{patientError && <p className="text-danger">{patientError}</p>}
				{!loadingPatients && !patientError && patients.length === 0 && (
					<p>Nincs az orvoshoz foglalt időponttal rendelkező páciens.</p>
				)}
				{!loadingPatients && !patientError && patients.length > 0 && (
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
