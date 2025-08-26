import TaskCreateModalBtn from "./TaskCreateModal";
import TaskComments from "./TaskComment";
import TaskTable from "./TasksTable";

const TasksPage = () => {

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
                        <TaskCreateModalBtn />
                    </div>
                    <div className="task-page-container">
                        <div className="tasks-aside">
                            <div id="taskDetailsContainer"></div>
                            <div className="task-comments-container" id="taskCommentsContainer">
                                <TaskComments/>
                            </div>
                        </div>
                        <div className="global-tasks-container">
                            <TaskTable/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TasksPage;