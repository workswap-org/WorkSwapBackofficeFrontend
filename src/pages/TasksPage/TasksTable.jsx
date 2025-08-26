import { apiFetch } from "@/components/functions/apiClient";
import { useState, useEffect } from "react";

const TaskTable = () => {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadSortedTasks() {
            const type = document.getElementById("taskType")?.value || "";
            const status = document.getElementById('taskStatus')?.value || "";
            const sort = document.getElementById("sort")?.value || "date";

            const params = {};

            if (type) params.type = type;
            if (sort) params.sort = sort;
            if (status) params.status = status;

            const queryString = new URLSearchParams(params);

            try {
                const res = await apiFetch(`/api/tasks/get-tasks?${queryString.toString()}`);
                const data = await res;
                setTasks(data.tasks || []);
            } catch (err) {
                console.error(err);
            }
        };
        
        loadSortedTasks();
    }, []);

    return (
        <div className="task-container">
            <div className="tasks-list-container">
                <div className="tasks-list-header task-sort">
                    <select name="sort" id="sort" onchange="loadSortedTasks()" required>
                        <option value="created" selected>По дате создания</option>
                        <option value="deadline">По дате дедлайна</option>
                        <option value="completed">По дате выполнения</option>
                    </select>

                    <select name="taskType" id="taskType" onchange="loadSortedTasks()" required>
                        <option value="" selected>Тип задачи</option>
                        <option th:each="type : ${taskTypes}"
                                th:value="${type}"
                                th:text="${type.getDisplayName()}">
                        </option>
                    </select>

                    <select name="taskType" id="taskStatus" onchange="loadSortedTasks()" required>
                        <option value="" selected>Статус</option>
                        <option th:each="status : ${taskStatuses}"
                                th:value="${status}"
                                th:text="${status.getDisplayName()}">
                        </option>
                    </select>
                </div>
                <div className="tasks-list" id="tasksTable">
                    <TasksList 
                        tasks={tasks}
                    />
                </div>
            </div>
        </div>
    );
};

const TasksList = ({ tasks, user }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <table className="admin-table">
                <tbody>
                    <tr>
                        <td colSpan="6" className="text-center">Нет задач</td>
                    </tr>
                </tbody>
            </table>
        );
    }

    return (
        <table className="admin-table">
            <tbody>
                {tasks.map(task => (
                    <tr key={task.id} className="task-item" data-task-id={task.id}>
                        <td className={
                            task.status.displayName === "Новая" ? "status-new" :
                            task.status.displayName === "В процессе" ? "status-progress" :
                            task.status.displayName === "Завершена" ? "status-done" :
                            "status-cancelled"
                        }>
                            {task.status.displayName === "Новая" && (
                                <i className="fa-solid fa-file-circle-plus"></i>
                            )}
                            {task.status.displayName === "В процессе" && (
                                <i className="fa-solid fa-timer"></i>
                            )}
                            {task.status.displayName === "Завершена" && (
                                <i className="fa-solid fa-badge-check"></i>
                            )}
                            {task.status.displayName === "Отменена" && (
                                <i className="fa-solid fa-ban"></i>
                            )}
                        </td>
                        <td>#{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.taskType?.displayName}</td>
                        <td>
                            {task.status.code !== "COMPLETED" ? (
                                <span>{/* сюда можно вставить твой timeCounter компонент */}</span>
                            ) : (
                                <Avatar
                                    user={task.executor}
                                    size={32}
                                    className=""
                                />
                            )}
                        </td>
                        <td className="overlay-td">
                            <div className="button-actions task-actions">
                                {(task.status.code === "CANCELED" || task.status.code === "NEW") && (
                                    <button
                                        data-task={task.id}
                                        className="btn-admin btn-admin-primary pickup-task-btn"
                                    >
                                        <i className="fa-solid fa-download"></i>
                                    </button>
                                )}

                                {user?.id === task.executor?.id && task.status.code === "IN_PROGRESS" && (
                                    <>
                                        <button
                                            data-task={task.id}
                                            className="btn-admin btn-admin-confirm complete-task-btn"
                                        >
                                            <i className="fa-solid fa-check"></i>
                                        </button>
                                        <button
                                            data-task={task.id}
                                            className="btn-admin btn-admin-danger cancel-task-btn"
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                        <button
                                            className="btn-admin btn-admin-primary"
                                        >
                                            <i className="fa-solid fa-edit"></i>
                                        </button>
                                    </>
                                )}

                                {task.status.code === "NEW" && (
                                    <button
                                        data-task={task.id}
                                        className="btn-admin btn-admin-danger cancel-task-btn"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                )}
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TaskTable;