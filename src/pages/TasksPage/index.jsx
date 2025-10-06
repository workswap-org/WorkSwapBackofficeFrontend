import TaskCreateModal from "./TaskCreateModal";
import TaskComments from "./TaskComments";
import TaskDetails from "./TaskDetails";
import TaskTable from "./TasksTable";
import { useState } from "react";

const TasksPage = () => {

    const [selectedTaskId, setSelectedTaskId] = useState(null);

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