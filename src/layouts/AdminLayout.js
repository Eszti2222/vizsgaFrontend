import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function AdminLayout({children}){
    const { user } = useContext(AuthContext);
    
        if (!user || user.role !== "admin") {
            return <div>A felület kizárólag adminisztrátori jogosultsággal érhető el.</div>;
        }
    
        return <>{children}</>;
}