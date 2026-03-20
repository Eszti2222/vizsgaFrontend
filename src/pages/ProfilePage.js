import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import "./css/profilepage.css";

export default function ProfilePage() {
    const { user } = useContext(AuthContext);
    if (!user) {
        return (
            <div className="profile-page">
                <h2>Nincs bejelentkezett felhasználó.</h2>
                <p>
                    Kérlek, jelentkezz be a folytatáshoz. <Link to="/login">Jelentkezz be!</Link>
                </p>
            </div>
        );
    }
    return (
        <div className="profile-page modern">
            <div className="profile-avatar">
                <FaUserCircle size={72} color="#1976d2" />
            </div>
            <h2 className="profile-title">Profilom</h2>
            <div className="profile-card modern">
                <div className="profile-row">
                    <span className="profile-label">Név:</span>
                    <span>{user.name}</span>
                </div>
                <div className="profile-row">
                    <span className="profile-label">Email:</span>
                    <span>{user.email}</span>
                </div>
                {user.role === "patient" && (
                  <>
                    {user.social_security_number && (
                        <div className="profile-row">
                            <span className="profile-label">TAJ szám:</span>
                            <span>{user.social_security_number}</span>
                        </div>
                    )}
                    {user.birth_date && (
                        <div className="profile-row">
                            <span className="profile-label">Születési dátum:</span>
                            <span>{user.birth_date}</span>
                        </div>
                    )}
                    {user.country && (
                        <div className="profile-row">
                            <span className="profile-label">Ország:</span>
                            <span>{user.country}</span>
                        </div>
                    )}
                    {user.city && (
                        <div className="profile-row">
                            <span className="profile-label">Város:</span>
                            <span>{user.city}</span>
                        </div>
                    )}
                    {user.postal_code && (
                        <div className="profile-row">
                            <span className="profile-label">Irányítószám:</span>
                            <span>{user.postal_code}</span>
                        </div>
                    )}
                    {user.street_address && (
                        <div className="profile-row">
                            <span className="profile-label">Cím:</span>
                            <span>{user.street_address}</span>
                        </div>
                    )}
                    {user.phone_number && (
                        <div className="profile-row">
                            <span className="profile-label">Telefonszám:</span>
                            <span>{user.phone_number}</span>
                        </div>
                    )}
                  </>
                )}
                {user.role && (
                    <div className="profile-row">
                        <span className="profile-label">Szerepkör:</span>
                        <span>{user.role === "doctor" ? "Orvos" : user.role === "admin" ? "Adminisztrátor" : "Páciens"}</span>
                    </div>
                )}
                {/* Orvos-specifikus adatok */}
                {user.role === "doctor" && (
                    <>
                        {user.license_number && (
                            <div className="profile-row">
                                <span className="profile-label">Orvosi pecsétszám:</span>
                                <span>{user.license_number}</span>
                            </div>
                        )}
                        {user.specialization && (
                            <div className="profile-row">
                                <span className="profile-label">Szakirány:</span>
                                <span>{user.specialization}</span>
                            </div>
                        )}
                        {user.office_location_id && (
                            <div className="profile-row">
                                <span className="profile-label">Rendelő azonosító:</span>
                                <span>{user.office_location_id}</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
