import { useState, useCallback, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { apiFetch } from "@/lib/apiClient";

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setAuthenticated] = useState(true);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadUser = useCallback(async () => {
        setLoading(true);
        try {
            setTimeout(async() => {
                const res = await apiFetch("/api/user/current", {}, {}, setAuthenticated);
                setAuthenticated(true);
                setUser(res.user);
            }, 0)
        } catch (e) {
            console.error(e);
            setUser(null);
            setLoading(false);
        } finally {
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