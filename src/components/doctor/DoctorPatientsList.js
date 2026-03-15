import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";

export default function DoctorPatientsList() {
	const { user } = useContext(AuthContext);
	const [patients, setPatients] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		if (!user || user.role !== "doctor") return;
		setLoading(true);
		myAxios
			.get(`/api/patient/${user.id}`)
			.then((res) => {
				setPatients(res.data);
				setLoading(false);
			})
			.catch(() => {
				setError("Nem sikerült lekérni a pácienseket.");
				setLoading(false);
			});
	}, [user]);

	return (
		<DoctorLayout>
			<div className="doctor-patients-list-page">
				<h2>Saját pácienseim</h2>
				{loading && <p>Betöltés...</p>}
				{error && <p className="text-danger">{error}</p>}
				{!loading && !error && patients.length === 0 && <p>Nincs páciens.</p>}
				{!loading && !error && patients.length > 0 && (
					<table className="table">
						<thead>
							<tr>
								<th>Név</th>
								<th>TAJ szám</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{patients.map((patient) => (
								<tr key={patient.id}>
									<td>{patient.name}</td>
									<td>{patient.taj}</td>
									<td>{patient.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</DoctorLayout>
	);
}
