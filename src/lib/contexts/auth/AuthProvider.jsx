import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "@/lib/apiClient";

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        console.log("Включаем загрузку");
        setLoading(true);
        try {
            const res = await apiFetch("/api/user/current", {}, {}, setAuthenticated);
            setUser(res.user);
            setAuthenticated(true);
        } catch (e) {
            console.error(e);
            setUser(null);
            setLoading(false);
        } finally {
            console.log("Выключаем загрузку");
            setLoading(false);
        }
    }, []);

    useEffect(() => {

        loadUser();
        
    }, [loadUser]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, setUser, loading, loadUser }}>
            {children}
        </AuthContext.Provider>
    );
};