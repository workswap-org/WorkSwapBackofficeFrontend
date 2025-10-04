import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext"; // твой хук авторизации

export default function AuthGuard() {
    const { user, isAuthenticated } = useAuth();

    if (user && user?.status == "PENDING") {
        return <Navigate to="/register" replace />;
    }

    if (isAuthenticated && !user?.roles.includes("ADMIN")) {
        return <Navigate to="/you-are-not-admin" replace />;
    }

    return <Outlet />;
}