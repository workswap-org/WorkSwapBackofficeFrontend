import { useLocation, Outlet } from "react-router-dom";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { 
    useAuth,
    apiFetch,
    ActivePageContext
} from "@core/lib";
import { useState } from "react";

export default function Layout() {
    const location = useLocation();
    const { user } = useAuth();
    const [sidebarVisible, setSidebarVisible] = useState(false);

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

    function toggleSidebar() {
        setSidebarVisible(!sidebarVisible);
    }
    
    const handleLogout = () => {
        apiFetch("/logout", { method: "POST", credentials: "include" }).then(() => {});
    };

    return (
        <ActivePageContext.Provider value={{ activePage }}>
            <div className="admin-layout">
                <Sidebar 
                    sidebarVisible={sidebarVisible}
                    setSidebarVisible={setSidebarVisible}
                />
                <main className="admin-main">
                    <Header
                        activePage={activePage}
                        user={user || undefined}
                        onLogout={handleLogout}
                        toggleSidebar={toggleSidebar}
                    />
                    <Outlet />
                </main>
                {/* Глобальные модалки можно держать тут */}
                {/* <ErrorModal /> */}
                {/* <AdminModalPortal /> */}
            </div>
        </ActivePageContext.Provider>
    );
}