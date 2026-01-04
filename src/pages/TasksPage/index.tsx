import TaskCreateModal from "./TaskCreateModal";
import TasksGrid from "./TasksGrid";

const TasksPage = () => {

    return (
        <>
            <div className="card admin-page">
                <div className="card__body">
                    <div className="card__header">
                        <TaskCreateModal />
                    </div>
                    <div className="task-page-container">
                        <div className="tasks-container">
                            <TasksGrid />
                        </div>
                        <div className="tasks-aside">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TasksPage;