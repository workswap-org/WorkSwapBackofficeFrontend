import { useEffect, useState } from "react";
import { getRecentUsers } from "@core/lib";

const RecentListingsTable = () => {

    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await getRecentUsers(3);
                setUsers(data.users);
            } catch (err) {
                console.error(err);
            }
        };

        loadUsers();
    }, []);

    const handleRowClick = () => {
        window.location.href = "/users";
    };

    return (
        <table className="admin-table">
            <thead style={{ cursor: "pointer" }} onClick={handleRowClick}>
                <tr>
                    <th>ID</th>
                    <th>Имя</th>
                    <th>Email</th>
                    <th>Регистрация</th>
                    <th>Статус</th>
                    <th>Действия</th>
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map((user) => (
                        <tr key={user.id}>
                            <td>#{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{new Date(user.createdAt).toLocaleDateString("ru-RU")}</td>
                            <td>
                                <span className={`badge ${user.enabled ? "bg-success" : "bg-danger"}`}>
                                    {user.enabled ? "Активен" : "Заблокирован"}
                                </span>
                            </td>
                            <td>
                                <a href={`/user/${user.id}`} className="btn btn-primary">
                                    <i className="fa-solid fa-user-cog"></i>
                                </a>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={6} className="text-center">
                            Нет пользователей
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default RecentListingsTable;

