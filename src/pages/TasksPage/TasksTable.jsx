import { apiFetch } from "@core/lib/services/apiClient";
import { useState, useEffect } from "react";
import Avatar from "@core/components/common/Avatar";

const TaskTable = ({ onSelectTask }) => {

    const [sort, setSort] = useState("created");
    const [taskType, setTaskType] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const [taskTypeList, setTaskTypeList] = useState([]);
    const [taskStatusList, setTaskStatusList] = useState([]);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadSortedTasks() {
            const params = {};

            if (taskType) params.type = taskType;
            if (sort) params.sort = sort;
            if (taskStatus) params.status = taskStatus;

            try {
                const res = await apiFetch("/api/tasks/get-tasks", {}, params);
                const data = await res;
                setTasks(data.tasks || []);
            } catch (err) {
                console.error(err);
            }
        };
    
        loadSortedTasks();
    }, [sort, taskStatus, taskType]);

    useEffect(() => {
    // Загружаем метаданные только один раз при загрузке страницы
        async function loadSettings() {
            try {
                const res = await apiFetch(`/api/tasks/metadata`);
                const data = await res;
                setTaskTypeList(data.taskTypeList || []);
                setTaskStatusList(data.taskStatusList || []);
            } catch (err) {
                console.error(err);
            }
        }

        loadSettings();
    }, []); 

    return (
        <div className="task-container">
            <div className="tasks-list-container">
                <div className="tasks-list-header task-sort">
                    <select
                        name="sort"
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        required
                    >
                        <option value="created">По дате создания</option>
                        <option value="deadline">По дате дедлайна</option>
                        <option value="completed">По дате выполнения</option>
                    </select>

                    <select
                        name="taskType"
                        id="taskType"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        required
                    >
                        <option value="">Тип задачи</option>
                        {taskTypeList.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        name="taskStatus"
                        id="taskStatus"
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                        required
                    >
                        <option value="">Статус</option>
                        {taskStatusList.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="tasks-list" id="tasksTable">
                    <TasksList 
                        tasks={tasks}
                        onSelectTask={onSelectTask} 
                    />
                </div>
            </div>
        </div>
    );
};

const TasksList = ({ tasks, user, onSelectTask = () => {}}) => {
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
                    <tr key={task.id} 
                        className="task-item" 
                        data-task-id={task.id}
                        onClick={() => onSelectTask(task.id)}
                    >
                        <td className={
                            task.status === "Новая" ? "status-new" :
                            task.status === "В процессе" ? "status-progress" :
                            task.status === "Завершена" ? "status-done" :
                            "status-cancelled"
                        }>
                            {task.status === "Новая" && (
                                <i className="fa-solid fa-file-circle-plus"></i>
                            )}
                            {task.status === "В процессе" && (
                                <i className="fa-solid fa-timer"></i>
                            )}
                            {task.status === "Завершена" && (
                                <i className="fa-solid fa-badge-check"></i>
                            )}
                            {task.status === "Отменена" && (
                                <i className="fa-solid fa-ban"></i>
                            )}
                        </td>
                        <td>#{task.id}</td>
                        <td>{task.name}</td>
                        <td>{task.taskType}</td>
                        <td>
                            {task.status !== "Завершена" ? (
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