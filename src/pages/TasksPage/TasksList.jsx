import { Avatar } from "@core/components";

const TasksList = ({ tasks, user, onSelectTask = () => {}}) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <tbody>
                        <tr>
                            <td colSpan="6" className="text-center">Нет задач</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <div className="admin-table-wrapper" id="tasksTable">
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
                                            className="btn btn-primary pickup-task-btn"
                                        >
                                            <i className="fa-solid fa-download"></i>
                                        </button>
                                    )}

                                    {user?.id === task.executor?.id && task.status.code === "IN_PROGRESS" && (
                                        <>
                                            <button
                                                data-task={task.id}
                                                className="btn btn-confirm complete-task-btn"
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                            <button
                                                data-task={task.id}
                                                className="btn btn-danger cancel-task-btn"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                            <button
                                                className="btn btn-primary"
                                            >
                                                <i className="fa-solid fa-edit"></i>
                                            </button>
                                        </>
                                    )}

                                    {task.status.code === "NEW" && (
                                        <button
                                            data-task={task.id}
                                            className="btn btn-danger cancel-task-btn"
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
        </div>
    );
};

export default TasksList;