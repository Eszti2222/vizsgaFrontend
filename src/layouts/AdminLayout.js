import React, { useContext } from "react";
import Navigation from "../pages/Navigation";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminLayout({children}){
    const { user } = useContext(AuthContext);
    
        if (!user || user.role !== "admin") {
            return <div>A felület kizárólag adminisztrátori jogosultsággal érhető el.</div>;
        }
    
        return (
            <div className="admin-layout">
                <Navigation />
                <main className="admin-main">
                    {children}
                </main>
            </div>
        );
}