import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { API_BASE } from "@/api/config";
import { apiFetch } from "@/components/functions/apiClient";

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(() => localStorage.getItem("accessToken"));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            if (accessToken) {
                // пробуем получить юзера по токену
                const res = await apiFetch(`/api/user/current`);
                if (res.ok) setUser(await res.json());
                
            } else {
                await refreshToken();
            }
            setLoading(false);
        };

        const refreshToken = async () => {
            try {
                const res = await fetch(`${API_BASE}/api/auth/refresh`, {
                    method: "POST",
                    credentials: "include",
                });
                if (res.ok) {
                    const data = await res.json();
                    setAccessToken(data.accessToken);
                    const meRes = await apiFetch(`/api/user/current`);
                    if (meRes.ok) setUser(await meRes);
                } else {
                    setAccessToken(null);
                    setUser(null);
                }
            } catch (e) {
                setAccessToken(null);
                setUser(null);
                console.error(e);
            }
        };

        init();
    }, [accessToken]);

    useEffect(() => {
        if (accessToken) localStorage.setItem("accessToken", accessToken);
        else localStorage.removeItem("accessToken");
    }, [accessToken]);

    return (
        <AuthContext.Provider value={{ accessToken, setAccessToken, user, setUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};