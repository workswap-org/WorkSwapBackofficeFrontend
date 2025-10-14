import { 
    Routes, 
    Route,
    Navigate
} from "react-router-dom";

import Layout from "./components/layout/Layout";

import CategoriesPage from "./pages/CategoriesPage";
import DashboardPage from "./pages/DashboardPage";
import TasksPage from "./pages/TasksPage";
import PermissionsPage from "./pages/PermissionsPage";

/* Страницы логина */
import {
    LoginPage,
    RegisterPage,
    LoginSuccessPage,
    LogoutPage
} from "@core/pages";

import {
    PrivateRoute,
    AuthGuard
} from "@core/routes";

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