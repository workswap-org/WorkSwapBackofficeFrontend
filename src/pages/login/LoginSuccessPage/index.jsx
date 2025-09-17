// LoginSuccessPage.jsx
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/contexts/auth/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { API_BASE } from "@/api/config";

const LoginSuccessPage = () => {
    const { setAccessToken, user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [redirect, setRedirect] = useState("")

    useEffect(() => {
        fetch(`${API_BASE}/api/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            setAccessToken(data.accessToken);

            const from = new URLSearchParams(location.search).get("redirect") || "/";
            setRedirect(from)
        })
        .catch(err => console.error("Auth failed:", err));
    }, [setAccessToken, navigate, location.search]);

    useEffect(() => {
        if (redirect && user) {
            navigate(redirect, { replace: true })
        }
    }, [navigate, redirect, user])

    return <></>;
};

export default LoginSuccessPage;