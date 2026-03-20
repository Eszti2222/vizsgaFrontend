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
                    console.log(users);
                    setLoading(false);
                })
                .catch(() => {
                    setError("Nem sikerült lekérni a felhasználókat.");
                    setLoading(false);
                });
        }, [user]);

    return(
        <AdminLayout>
            <div className="admin-users-list-page">
                <h2>Felhasználók lista</h2>
				{loading && <p>Betöltés...</p>}
				{error && <p className="text-danger">{error}</p>}
				{!loading && !error && users.length === 0 && <p>Nincs páciens.</p>}
				{!loading && !error && users.length > 0 && (
					<table className="admin_users_table">
						<thead>
							<tr>
								{/*<th>id</th>   ki kene irni*/}
								<th>Név</th>
								<th>Email</th>  {/*sorrendben nem itt van */}
                                {/** <th>PECSÉT SZÁM</th> */}
                                <th>Specializáció</th>
								<th>Rendelő száma</th>
							</tr>
						</thead>
						<tbody>
							{users.map((user) => (
								<tr key={user.id}>
									<td>{user.email}</td>
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