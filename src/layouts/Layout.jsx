import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/auth/useAuth";
import "@/css/pages/main-admin-page.css";
import { apiFetch } from "@/components/functions/apiClient";

export default function Layout() {
    const location = useLocation();
    /* console.log(location); */
    const { user } = useAuth();

    const activePage = (() => {
        if (location.pathname.startsWith("/dashboard")) return "dashboard";
        if (location.pathname.startsWith("/listings")) return "listings";
        if (location.pathname.startsWith("/resumes")) return "resumes";
        if (location.pathname.startsWith("/users")) return "users";
        if (location.pathname.startsWith("/news")) return "news";
        if (location.pathname.startsWith("/locations")) return "locations";
        if (location.pathname.startsWith("/categories")) return "categories";
        if (location.pathname.startsWith("/tasks")) return "tasks";
        if (location.pathname.startsWith("/localization")) return "localization";
        if (location.pathname.startsWith("/permissions")) return "permissions";
        return "dashboard";
    })();

    const handleLogout = () => {
        apiFetch("/logout", { method: "POST", credentials: "include" }).then(() => {});
    };

    return (
        <div className="admin-layout">
            <Sidebar />
            <main className="admin-main">
                <Header
                    activePage={activePage}
                    user={user || undefined}
                    onLogout={handleLogout}
                />
                <Outlet />
            </main>
            {/* Глобальные модалки можно держать тут */}
            {/* <ErrorModal /> */}
            {/* <AdminModalPortal /> */}
        </div>
    );
}