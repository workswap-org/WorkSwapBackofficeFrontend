// PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth/useAuth";

const PrivateRoute = ({ children }) => {
    const { accessToken } = useAuth();
    const location = useLocation();

    if (!accessToken) {
        const fullRedirect = `${window.location.origin}${location.pathname}`;
        return <Navigate to={`/login?redirect=${encodeURIComponent(fullRedirect)}`} replace />;
    }

    return children;
};

export default PrivateRoute;