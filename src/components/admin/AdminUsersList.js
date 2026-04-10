
//Átnevezni AdminDoctorList-re ---- most nem merem átnevezni, mert nem találtam meg minden hivatkozást és olyan hiba volt aminek nem találtuk a forrását

import React, { useEffect, useState, useContext } from "react";
import AdminLayout from "../../layouts/AdminLayout";
import { AuthContext } from "../../contexts/AuthContext";
import { myAxios } from "../../services/api";

export default function AdminUserList(){
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
            if (!user || user.role !== "admin") return;
            setLoading(true);
            myAxios
                .get(`/api/users`)
                .then((res) => {
                    setUsers(res.data);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Nem sikerült lekérni az orvosokat a hozzá tartozó adatokkal.");
                    setLoading(false);
                });
        }, [user]);

    return(
        <AdminLayout>
            <div className="admin-users-list-page">
                <h2>Orvos felhasználók listája</h2>
				{loading && <p>Betöltés...</p>}
				{error && <p className="text-danger">{error}</p>}
				{!loading && !error && users.length === 0 && <p>Nincs regisztrált orvos</p>}
				{!loading && !error && users.length > 0 && (
					<table className="admin_users_table">
						<thead>
							<tr>
								<th>id</th>
								<th>Név</th>
								<th>Email</th>
                                <th>Működési nyilvántartási szám</th>
                                <th>Specializáció</th>
								<th>Rendelő száma</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
									<td>{user.email}</td>
                                    <td>{user.license_number}</td>
									<td>{user.specialization}</td>
									<td>{user.office_location_id}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
            </div>
        </AdminLayout>
    );
}