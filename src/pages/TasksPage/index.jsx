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
                <span className="divider">/</span>
                <span href="/tasks">Задачи</span>
            </nav>
            <div className="card admin-page">
                <div className="card__body">
                    <div className="card__header">
                        <TaskCreateModal />
                    </div>
                    <div className="task-page-container">
                        <div className="tasks-aside">
                            <TaskDetails 
                                taskId={selectedTaskId}
                            />
                            <div className="task-comments-container">
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