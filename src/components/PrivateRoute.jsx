// PrivateRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/auth/useAuth";

const PrivateRoute = ({ children }) => {
    const { accessToken } = useAuth();
    const location = useLocation();

    if (!accessToken) {
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }

    return children;
};

export default PrivateRoute;