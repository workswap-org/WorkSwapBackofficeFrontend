import { useEffect, useMemo, useState } from "react";
import { TimeCounter } from "@core/components";
import { useAuth, getTaskDetails } from "@core/lib";

const TaskDetails = ({taskId}) => {

    const { user } = useAuth();
    const [task, setTask] = useState(null);
    const [author, setAuthor] = useState(null)
    const [executor, setExecutor] = useState(null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!taskId) return;
        setLoading(true);
        setError(null);

        getTaskDetails(taskId)
            .then((res) => {
                setTask(res.task || []);
                setAuthor(res.author || []);
                setExecutor(res.executor || [])
            })
            .catch(setError)
            .finally(() => setLoading(false));
    }, [taskId]);

    const isInProgress = task?.status?.code === "IN_PROGRESS";
    const isCanceled = task?.status?.code === "CANCELED";
    const isNew = task?.status?.code === "NEW";
    const isCompleted = Boolean(task?.completed);

    const canPickUp = isNew || isCanceled;
    const canComplete = user?.id === task?.executorId && isInProgress;
    const canCancel = canComplete || isNew;
    const canEdit = user?.id === executor?.id && isInProgress;

    const formattedCreatedAt = useMemo(
        () => (task?.createdAt ? new Date(task.createdAt).toLocaleString("ru-RU") : "-"),
        [task?.createdAt]
    );
    const formattedCompletedAt = useMemo(
        () => (task?.completed ? new Date(task.completed).toLocaleString("ru-RU") : null),
        [task?.completed]
    );

    if (loading) return <div className="task-details loading">Загрузка...</div>;
    if (error) return <div className="task-details error">Ошибка загрузки</div>;
    if (!taskId) return null;

    return (
        <div className={`task-details ${taskId ? "active" : ""}`}>
            <TaskDetail label="Название" value={task?.name} />
            <TaskDetail label="Описание" value={task?.description} />
            <TaskDetail label="Статус" value={task?.status?.name} />

            <br />

            <TaskDetail label="Автор" value={author?.name} />

            {isCanceled && <TaskDetail label="Выполнил" value={executor?.name} />}
            {isInProgress && <TaskDetail label="Выполняющий" value={executor?.name} />}

            <br />

            <TaskDetail label="Создана" value={formattedCreatedAt} />

            {!isCompleted && (
                <TaskDetail
                    label="Дедлайн через"
                    value={<TimeCounter duration={task?.duration} />}
                />
            )}
            {isCompleted && <TaskDetail label="Завершена" value={formattedCompletedAt} />}

            <div className="button-actions">
                {canPickUp && (
                    <ActionButton type="primary" icon="download" taskId={task?.id} />
                )}
                {canComplete && (
                    <ActionButton type="confirm" icon="check" taskId={task?.id} />
                )}
                {canCancel && (
                    <ActionButton type="danger" icon="trash" taskId={task?.id} />
                )}
                {canEdit && <ActionButton type="primary" icon="edit" />}
                <ActionButton type="gold" icon="message" taskId={task?.id} />
            </div>
        </div>
    );
};

const TaskDetail = ({ label, value }) => (
    <div className="task-detail">
        <h3 className="task-detail-title">{label}:</h3>
        <span>{value || "-"}</span>
    </div>
);

const ActionButton = ({ type, icon, taskId }) => (
    <button
        className={`btn btn-${type}`}
        data-task={taskId}
    >
        <i className={`fa-solid fa-${icon}`}></i>
    </button>
);

export default TaskDetails;