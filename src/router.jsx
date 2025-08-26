import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";

import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";

import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import LoginSuccessPage from "./pages/LoginSuccessPage";
import RouteLogger from "./components/logging/RouteLogger";
import { Navigate } from "react-router-dom";

const AppRouter = () => {
    return (
        <>
            <RouteLogger />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/login/success" element={<LoginSuccessPage />} />

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