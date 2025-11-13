import { useEffect, useState } from "react";
import { TimeCounter } from "@core/components";
import { useAuth, getTaskDetails } from "@core/lib";

const TaskDetails = ({taskId}) => {

    const { user } = useAuth();
    const [task, setTask] = useState([]);
    const [author, setAuthor] = useState([]);
    const [executor, setExecutor] = useState([]);

    useEffect(() => {
        if (!taskId) return;

        async function loadTaskDetails() {
            try {
                const data = await getTaskDetails(taskId);
                setTask(data.task || {});
                setAuthor(data.author || {});
                setExecutor(data.executor || {});

                console.log(data);
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
                <h3 className="task-detail-title">Название:</h3> 
                <span>{task.name}</span>
            </p>
            <p className="task-detail">
                <h3 className="task-detail-title">Описание:</h3> 
                <span>{task.description}</span>
            </p>
            <p className="task-detail">
                <h3 className="task-detail-title">Статус:</h3> 
                <span>{task.status}</span>
            </p>

            <br />

            <p className="task-detail">
                <h3 className="task-detail-title">Автор:</h3> 
                <span>{author.name}</span>
            </p>

            {task.status === "Завершена" && (
                <p className="task-detail">
                    <h3 className="task-detail-title">Выполнил:</h3> 
                    <span>{executor.name}</span>
                </p>
            )}

            {task.status === "В процессе" && (
                <p className="task-detail">
                    <h3 className="task-detail-title">Выполняющий:</h3> 
                    <span>{executor.name}</span>
                </p>
            )}

            <br />

            <p className="task-detail">
                <h3 className="task-detail-title">Создана:</h3> 
                <span>
                    {task.createdAt
                        ? new Date(task.createdAt).toLocaleString("ru-RU")
                        : "-"}
                </span>
            </p>

            {!task.completed && (
                <p className="task-detail">
                    <h3 className="task-detail-title">Дедлайн через:</h3> 
                    <TimeCounter duration={task.duration} />
                </p>
            )}

            {task.completed && (
                <p className="task-detail">
                    <h3 className="task-detail-title">Завершена:</h3> 
                    <span>{new Date(task.completed).toLocaleString("ru-RU")}</span>
                </p>
            )}

            <div className="button-actions">
                {(task.status === "Отменена" || task.status.code === "NEW") && (
                    <button
                        data-task={task.id}
                        className="btn btn-primary pickup-task-btn"
                    >
                        <i className="fa-solid fa-download"></i>
                    </button>
                )}

                {user?.id === task.executorId && task.status.code === "IN_PROGRESS" && (
                    <button
                        data-task={task.id}
                        className="btn btn-confirm complete-task-btn"
                    >
                        <i className="fa-solid fa-check"></i>
                    </button>
                )}

                {((user?.id === task.executorId && task.status.code === "IN_PROGRESS") ||
                    task.status === "NEW") && (
                    <button
                        data-task={task.id}
                        className="btn btn-danger cancel-task-btn"
                    >
                        <i className="fa-solid fa-trash"></i>
                    </button>
                )}

                {user?.id === executor.id && task.status.code === "IN_PROGRESS" && (
                    <button className="btn btn-primary">
                        <i className="fa-solid fa-edit"></i>
                    </button>
                )}

                <button
                    className="btn btn-gold comment-btn"
                    data-task-id={task.id}
                >
                    <i className="fa-solid fa-message"></i>
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;