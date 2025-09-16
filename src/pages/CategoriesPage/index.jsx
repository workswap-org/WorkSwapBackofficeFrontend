import "@/css/pages/categories-page.css";
import { useEffect, useState } from "react";
import CategoryTree from "./CategoryTree";
import { useAuth } from "@/contexts/auth/useAuth";
import { apiFetch } from "@/components/functions/apiClient";

const CategoriesPage = () => {
    const { accessToken } = useAuth();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await apiFetch(`/api/categories`);
                const data = await res;
                setCategories(data.categories || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, [accessToken]);

    const onAddCategory = () => {
        console.log("TODO: add category");
    };

    const onEditCategory = (id) => {
        console.log("TODO: edit category", id);
    };

    const onDeleteCategory = (id) => {
        console.log("TODO: delete category", id);
    };

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <>
            <nav className="breadcrumbs">
                <a href="/dashboard">Панель управления</a>
                <span> / </span>
                <span href="/locations">Управление категориями</span>
            </nav>
            <div className="card admin-page">
                <div className="card-body">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Список категорий</h2>
                            <button
                                onClick={onAddCategory}
                                className="btn-admin btn-admin-primary btn-overlay"
                            >
                                <i className="fa-solid fa-plus"></i> Категория
                            </button>
                        </div>
                    </div>

                    <div className="categories-page">
                        {/* Таблица */}
                        <div
                            className="flex-column"
                            style={{ overflow: "auto", maxWidth: "50%" }}
                        >
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Название</th>
                                        <th>Родительская категория</th>
                                        <th>Действия</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories.length > 0 ? (
                                        categories.map((category) => (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>
                                                    {category.parent
                                                        ? category.parent.name
                                                        : "—"}
                                                </td>
                                                <td>
                                                    <div className="button-actions">
                                                        <button
                                                            className="btn-admin btn-admin-primary mr-1"
                                                            onClick={() =>
                                                                onEditCategory(
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn-admin btn-admin-danger"
                                                            onClick={() =>
                                                                onDeleteCategory(
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="6"
                                                className="text-center"
                                            >
                                                Нет категорий
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Дерево категорий */}
                        <div className="flex-column" style={{ overflow: "auto" }}>
                            <div
                                className="category-tree"
                                id="categoryTree"
                            >
                                <CategoryTree categories={categories} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriesPage;