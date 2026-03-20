import React from "react";
import AdminLayout from "../../layouts/AdminLayout";
import AdminUserList from "../../components/admin/AdminUsersList";

export default function AdminDoctorsPage() {
  return (
    <AdminLayout>
      <div className="admin-doctors-page">
        <h1>Üdvözöljük az admin felületen!</h1>
        <p>Itt kezelheti a felhasználókat, jogosultságokat és rendszerbeállításokat.</p>
        <AdminUserList></AdminUserList>
      </div>
    </AdminLayout>
  );
}
