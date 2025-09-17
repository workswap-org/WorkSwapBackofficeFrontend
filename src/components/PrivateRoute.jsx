// PrivateRoute.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/contexts/auth/AuthContext";
import EmptyPage from "@/pages/EmptyPage";
import { useEffect } from "react";
import { apiFetch } from "@/lib/apiClient";

const PrivateRoute = () => {
    const { accessToken, loading } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const data = await apiFetch("/api/user/current");
                if (!data.user) {
                    const fullRedirect = `${window.location.origin}${location.pathname}`;
                    window.location.replace(`/login?redirect=${encodeURIComponent(fullRedirect)}`);
                }
            } catch (err) {
                console.error(err);
                const fullRedirect = `${window.location.origin}${location.pathname}`;
                window.location.replace(`/login?redirect=${encodeURIComponent(fullRedirect)}`);
            }
        };

        verifyUser();
    }, [location.pathname]);

    if (loading) {
        return <EmptyPage />; // или спиннер
    }

    if (!accessToken) {
        const fullRedirect = `${window.location.origin}${location.pathname}`;
        return <Navigate to={`/login?redirect=${encodeURIComponent(fullRedirect)}`} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;