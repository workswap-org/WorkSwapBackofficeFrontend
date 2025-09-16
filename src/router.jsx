import { Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";

import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";

/* Страницы логина */
import LoginPage from "./pages/login/LoginPage";
import RegisterPage from "./pages/login/RegisterPage";
import LoginSuccessPage from "./pages/login/LoginSuccessPage";
import LogoutPage from "./pages/login/LogoutPage";

import PrivateRoute from "./components/PrivateRoute";
import RouteLogger from "./components/logging/RouteLogger";
import { Navigate } from "react-router-dom";

const AppRouter = () => {
    return (
        <>
            <RouteLogger />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login/success" element={<LoginSuccessPage />} />
                <Route path="/logout" element={<LogoutPage />} />
                

                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <Layout />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />

                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="tasks" element={<TasksPage />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;