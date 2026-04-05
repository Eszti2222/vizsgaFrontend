
import React, { useEffect, useState, useContext } from "react";
import DoctorLayout from "../../layouts/DoctorLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";

function formatAppointmentDate(appointmentTime) {
	if (!appointmentTime) return "-";

	if (typeof appointmentTime === "string") {
		const [datePart] = appointmentTime.split(" ");
		if (/^\d{4}-\d{2}-\d{2}$/.test(datePart)) {
			const [year, month, day] = datePart.split("-");
			return `${year}.${month}.${day}.`;
		}
	}

	const date = new Date(appointmentTime);
	if (Number.isNaN(date.getTime())) return appointmentTime;

	return date.toLocaleDateString("hu-HU");
}

function formatAppointmentTime(appointmentTime) {
	if (!appointmentTime) return "-";

	if (typeof appointmentTime === "string") {
		const parts = appointmentTime.split(" ");
		if (parts.length >= 2 && /^\d{2}:\d{2}:\d{2}$/.test(parts[1])) {
			return parts[1].slice(0, 5);
		}
	}

	const date = new Date(appointmentTime);
	if (Number.isNaN(date.getTime())) return appointmentTime;

	return date.toLocaleTimeString("hu-HU", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

export default function BookedTimes() {
	const { user } = useContext(AuthContext);
	const [appointments, setAppointments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		if (!user || user.role !== "doctor") return;

		const loadAppointments = async () => {
			setLoading(true);
			setError(null);

			try {
				const res = await myAxios.get("/api/doctor/appointments");
				setAppointments(Array.isArray(res.data) ? res.data : []);
			} catch (error) {
				setError("Nem sikerült lekérni az időpontokat.");
			} finally {
				setLoading(false);
			}
		};

		loadAppointments();
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
								<th>Státusz</th>
							</tr>
						</thead>
						<tbody>
							{appointments.map((appt) => (
								<tr key={appt.id}>
									<td>{appt.patient_name}</td>
									<td>{formatAppointmentDate(appt.appointment_time)}</td>
									<td>{formatAppointmentTime(appt.appointment_time)}</td>
									<td>{appt.status || "-"}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</DoctorLayout>
	);
}
