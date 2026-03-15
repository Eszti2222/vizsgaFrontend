
import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";

export default function BookedTimes() {
	const { user } = useContext(AuthContext);
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user || user.role !== "doctor") return;
		setLoading(true);
		myAxios
			.get(`/api/appointments/${user.id}`)
			.then((res) => {
				setAppointments(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setError("Nem sikerült lekérni az időpontokat.");
				setLoading(false);
			});
	}, [user]);

	return (
		<DoctorLayout>
			<div className="booked-times-page">
				<h2>Foglalt időpontjaim</h2>
				{loading && <p>Betöltés...</p>}
				{error && <p className="text-danger">{error}</p>}
				{!loading && !error && appointments.length === 0 && <p>Nincs foglalt időpont.</p>}
				{!loading && !error && appointments.length > 0 && (
					<table className="table">
						<thead>
							<tr>
								<th>Páciens neve</th>
								<th>Dátum</th>
								<th>Időpont</th>
								<th>Megjegyzés</th>
							</tr>
						</thead>
						<tbody>
							{appointments.map((appt) => (
								<tr key={appt.id}>
									<td>{appt.patient_name}</td>
									<td>{appt.date}</td>
									<td>{appt.time}</td>
									<td>{appt.note || "-"}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</DoctorLayout>
	);
}
