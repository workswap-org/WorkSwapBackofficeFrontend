import { useEffect, useState } from "react";
import { apiFetch } from "@/components/functions/apiClient";
import TimeCounter from "@/components/small-components/TimeCounter";

const TaskDetails = ({taskId}) => {

    const [task, setTask] = useState([]);

    useEffect(() => {
        async function loadSortedTasks() {
            try {
                const res = await apiFetch(`/api/tasks/${taskId}/details`);
                const data = await res;
                setTask(data.task || []);
            } catch (err) {
                console.error(err);
            }
        };
        
        loadSortedTasks();
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
                <span>{task.status.displayName}</span>
            </p>
            <br/>
            <p className="task-detail">
                <label className="task-detail-label">Автор:</label> 
                <span>{task.author.name}</span>
            </p>
            <p className="task-detail" th:if="${status == 'COMPLETED'}">
                <label className="task-detail-label">Выполнил:</label> 
                <span>task.executor.name</span>
            </p>
            <p className="task-detail" th:if="${status == 'IN_PROGRESS'}">
                <label className="task-detail-label">Выполняющий:</label> 
                <span>{task.executor.name}</span>
            </p>
            <br/>
            <p className="task-detail">
                <label className="task-detail-label">Создана:</label> 
                <span th:text="${#temporals.format(task.createdAt, 'HH:mm dd.MM.yyyy')}"></span>
            </p>
            <p className="task-detail" th:if="${task.completed == null}">
                <label className="task-detail-label">Дедлайн через:</label> 
                <TimeCounter duration={task.duration}/>
            </p>
            <p className="task-detail" th:if="${task.completed != null}">
                <label className="task-detail-label">Завершена:</label> 
                <span th:text="${#temporals.format(task.completed, 'HH:mm dd.MM.yyyy')}"></span>
            </p>
            <div className="button-actions">
                <button th:if="${status == 'CANCELED' or status == 'NEW'}"
                        th:data-task="${task.id}"
                        className="btn-admin btn-admin-primary pickup-task-btn">
                    <i className="fa-solid fa-download"></i>
                </button>
                <button th:if="${user == task.executor and status == 'IN_PROGRESS'}"
                        th:data-task="${task.id}"
                        className="btn-admin btn-admin-confirm complete-task-btn">
                    <i className="fa-solid fa-check"></i>
                </button>
                <button th:if="${(user == task.executor and status == 'IN_PROGRESS') or (status == 'NEW')}"
                        th:data-task="${task.id}"
                        className="btn-admin btn-admin-danger cancel-task-btn">
                    <i className="fa-solid fa-trash"></i>
                </button>
                <button className="btn-admin btn-admin-primary" 
                        th:if="${user == executor and status == 'IN_PROGRESS'}">
                    <i className="fa-solid fa-edit"></i>
                </button>
                <button className="btn-admin btn-admin-gold comment-btn" th:attr="task-id=${task.id}">
                    <i className="fa-solid fa-message"></i>
                </button>
            </div>
        </div>
    );
};

export default TaskDetails;