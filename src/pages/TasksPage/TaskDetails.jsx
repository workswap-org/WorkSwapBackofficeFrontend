import { useEffect, useState } from "react";
import { apiFetch } from "@core/lib/services/apiClient";
import TimeCounter from "@core/components/common/TimeCounter";
import { useAuth } from "@core/lib/contexts/AuthContext";

const TaskDetails = ({taskId}) => {

    const { user } = useAuth();
    const [task, setTask] = useState([]);
    const [author, setAuthor] = useState([]);
    const [executor, setExecutor] = useState([]);

    useEffect(() => {
        if (!taskId) return;

        async function loadTaskDetails() {
            try {
                const data = await apiFetch(`/api/tasks/${taskId}/details`);
                setTask(data.task || {});
                setAuthor(data.author || {});
                setExecutor(data.executor || {});
            } catch (err) {
                console.error(err);
            }
        }
        
        loadTaskDetails();

        document.querySelector(".task-details")?.classList.add("active");

        return () => {
            // при размонтировании убираем
            document.querySelector(".task-details")?.classList.remove("active");
        };
    }, [taskId]);

    return (
        <div className="task-details">
            <p className="task-detail">
                <label className="task-detail-label">Название:</label> 
                <span>{task.name}</span>
            </p>
            <p className="task-detail">
                <label className="task-detail-label">Описание:</label> 
                <span>{task.description}</span>
            </p>
            <p className="task-detail">
                <label className="task-detail-label">Статус:</label> 
                <span>{task.status}</span>
            </p>

            <br />

            <p className="task-detail">
                <label className="task-detail-label">Автор:</label> 
                <span>{author.name}</span>
            </p>

            {task.status === "COMPLETED" && (
                <p className="task-detail">
                    <label className="task-detail-label">Выполнил:</label> 
                    <span>{executor.name}</span>
                </p>
            )}

            {task.status === "IN_PROGRESS" && (
                <p className="task-detail">
                    <label className="task-detail-label">Выполняющий:</label> 
                    <span>{executor.name}</span>
                </p>
            )}

            <br />

            <p className="task-detail">
                <label className="task-detail-label">Создана:</label> 
                <span>
                    {task.createdAt
                        ? new Date(task.createdAt).toLocaleString("ru-RU")
                        : "-"}
                </span>
            </p>

            {!task.completed && (
                <p className="task-detail">
                    <label className="task-detail-label">Дедлайн через:</label> 
                    <TimeCounter duration={task.duration} />
                </p>
            )}

            {task.completed && (
                <p className="task-detail">
                    <label className="task-detail-label">Завершена:</label> 
                    <span>{new Date(task.completed).toLocaleString("ru-RU")}</span>
                </p>
            )}

            <div className="button-actions">
                {(task.status === "CANCELED" || task.status === "NEW") && (
                    <button
                        data-task={task.id}
                        className="btn-admin btn-admin-primary pickup-task-btn"
                    >
                        <i className="fa-solid fa-download"></i>
                    </button>
                )}

                {user?.id === task.executorId && task.status === "IN_PROGRESS" && (
                    <button
                        data-task={task.id}
                        className="btn-admin btn-admin-confirm complete-task-btn"
                    >
                        <i className="fa-solid fa-check"></i>
                    </button>
                )}

                {((user?.id === task.executorId && task.status === "IN_PROGRESS") ||
                    task.status === "NEW") && (
                    <button
                        data-task={task.id}
                        className="btn-admin btn-admin-danger cancel-task-btn"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                )}

                {user?.id === executor.id && task.status === "IN_PROGRESS" && (
                    <button className="btn-admin btn-admin-primary">
                        <i className="fa-solid fa-edit"></i>
                    </button>
                )}

                <button
                    className="btn-admin btn-admin-gold comment-btn"
                    data-task-id={task.id}
                >
                    <i className="fa-solid fa-message"></i>
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;