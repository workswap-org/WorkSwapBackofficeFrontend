import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import PermissionsPage from "./pages/PermissionsPage";

/* Страницы логина */
import LoginPage from "@core/pages/login/LoginPage";
import RegisterPage from "@core/pages/login/RegisterPage";
import LoginSuccessPage from "@core/pages/login/LoginSuccessPage";
import LogoutPage from "@core/pages/login/LogoutPage";

import PrivateRoute from "@core/routes/PrivateRoute";
import AuthGuard from "@core/routes/AuthGuard";
import { Navigate } from "react-router-dom";

const AppRouter = () => {
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login/success" element={<LoginSuccessPage />} />
                <Route path="/logout" element={<LogoutPage />} />

                {/* Один общий Layout */}
                <Route path="/" element={<AuthGuard />}>
                    <Route path="/" element={<Layout />}>
                        {/* публичные страницы */}

                        <Route element={<PrivateRoute />}>
                            <Route index element={<Navigate to="/dashboard" replace />} />

                            <Route path="categories" element={<CategoriesPage />} />
                            <Route path="permissions" element={<PermissionsPage />} />
                            <Route path="dashboard" element={<DashboardPage />} />
                            <Route path="tasks" element={<TasksPage />} />
                        </Route>
                    </Route>
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;