import { useEffect, useState } from "react";
import CategoryTree from "./CategoryTree";
import { getCategories } from "@core/lib";

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getCategories();
                const data = await res;
                setCategories(data.categories || []);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

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
                <div className="card__body">
                    <div className="card__header">
                        <div className="flex-column justify-content-between align-items-center">
                            <h2>Список категорий</h2>
                            <button
                                onClick={onAddCategory}
                                className="btn btn-primary btn-overlay"
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
                                                <td>{category.parent ? category.parent.name : "—"}</td>
                                                <td>
                                                    <div className="button-actions">
                                                        <button
                                                            className="btn btn-primary mr-1"
                                                            onClick={() =>
                                                                onEditCategory(
                                                                    category.id
                                                                )
                                                            }
                                                        >
                                                            <i className="fa-solid fa-edit"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger"
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
                                            <td colSpan="6">Нет категорий</td>
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