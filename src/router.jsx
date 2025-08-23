import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import CategoriesPage from "./pages/CategoriesPage";
/* import DashboardPage from "./pages/DashboardPage"; */
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPage";
import LoginSuccessPage from "./pages/LoginSuccessPage";
import RouteLogger from "./components/logging/RouteLogger";

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
                    <Route path="categories" element={<CategoriesPage />} />
                    {/* потом можно добавить и другие */}
                    {/* <Route path="dashboard" element={<DashboardPage />} /> */}
                </Route>
            </Routes>
        </>
    );
};

export default AppRouter;