import { ITask } from "@core/lib";

const TaskCard = ({task}: {task: ITask}) => {
    console.log(task)
    return (
        <div className="task-card">
            <span id="title">{task.name}</span>

            <div className="meta">
                <span id="taskType">{task.type}</span>
                <span id="taskStatus" className={"status-" + task.status.code.toLocaleLowerCase()}>{task.status.name}</span>
            </div>
        </div>
    );
}

export default TaskCard;