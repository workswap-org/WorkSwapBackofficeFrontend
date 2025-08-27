import TaskCreateModal from "./TaskCreateModal";
import TaskComments from "./TaskComments";
import TaskDetails from "./TaskDetails";
import TaskTable from "./TasksTable";
import { useEffect, useState } from "react";

const TasksPage = () => {

    const [selectedTaskId, setSelectedTaskId] = useState(null);

    useEffect(() => {
        // Создаём link для CSS
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "/css/pages/tasks-page.css"; // путь к CSS из public
        link.id = "login-page-css";
        document.head.appendChild(link);

        // Убираем стили при размонтировании
        return () => {
            document.head.removeChild(link);
        };
    }, []);

    return (
        <>
            <nav className="breadcrumbs">
                <a href="/dashboard">Панель управления</a>
                <span> / </span>
                <span href="/tasks">Задачи</span>
            </nav>
            <div className="card admin-page">
                <div className="card-body">
                    <div className="card-header">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Задачи</h2>
                        </div>
                        <TaskCreateModal />
                    </div>
                    <div className="task-page-container">
                        <div className="tasks-aside">
                            <div id="taskDetailsContainer">
                                <TaskDetails 
                                    taskId={selectedTaskId}
                                />
                            </div>
                            <div className="task-comments-container" id="taskCommentsContainer">
                                <TaskComments 
                                    taskId={selectedTaskId}
                                />
                            </div>
                        </div>
                        <div className="global-tasks-container">
                            <TaskTable onSelectTask={setSelectedTaskId}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TasksPage;