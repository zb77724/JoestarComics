import { useAuth } from "../hooks/useAuth";
import { checkSession } from "../context/AuthContext";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

export const RequireAuth = ({ role }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { role: authRole } = useAuth()?.auth || {};

    useEffect(() => {
        if (!authRole) {
            console.log("login first");
            navigate('signin', { replace: true , state: { from: location }});
        } else if (authRole !== role && authRole !== "admin") {
            console.log("Access denied!")
            navigate('/', { replace: true });
        }
    }, [authRole, location, navigate, role]);

    return authRole === "admin" ? (
        <Outlet />
    ) : role === authRole && (
        <Outlet />
    );
};