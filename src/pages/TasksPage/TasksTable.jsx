import { getTasksMetadata, getSortedTasks } from "@core/lib";
import { useState, useEffect } from "react";
import { Avatar } from "@core/components";
import TasksList from "./TasksList";

const TaskTable = ({ onSelectTask }) => {

    const [sort, setSort] = useState("created");
    const [taskType, setTaskType] = useState("");
    const [taskStatus, setTaskStatus] = useState("");

    const [taskTypeList, setTaskTypeList] = useState([]);
    const [taskStatusList, setTaskStatusList] = useState([]);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function loadSortedTasks() {
            const params = {};

            if (taskType) params.type = taskType;
            if (sort) params.sort = sort;
            if (taskStatus) params.status = taskStatus;

            try {
                const data = await getSortedTasks(params);
                console.log(data)
                setTasks(data.tasks || []);
            } catch (err) {
                console.error(err);
            }
        };
    
        loadSortedTasks();
    }, [sort, taskStatus, taskType]);

    useEffect(() => {
    // Загружаем метаданные только один раз при загрузке страницы
        async function loadSettings() {
            try {
                const data = await getTasksMetadata();
                setTaskTypeList(data.taskTypeList || []);
                setTaskStatusList(data.taskStatusList || []);
            } catch (err) {
                console.error(err);
            }
        }

        loadSettings();
    }, []); 

    return (
        <div className="task-container">
            <div className="tasks-list-container">
                <div className="tasks-list-header task-sort">
                    <select
                        name="sort"
                        id="sort"
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        required
                    >
                        <option value="created">По дате создания</option>
                        <option value="deadline">По дате дедлайна</option>
                        <option value="completed">По дате выполнения</option>
                    </select>

                    <select
                        name="taskType"
                        id="taskType"
                        value={taskType}
                        onChange={(e) => setTaskType(e.target.value)}
                        required
                    >
                        <option value="">Тип задачи</option>
                        {taskTypeList.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>

                    <select
                        name="taskStatus"
                        id="taskStatus"
                        value={taskStatus}
                        onChange={(e) => setTaskStatus(e.target.value)}
                        required
                    >
                        <option value="">Статус</option>
                        {taskStatusList.map((status) => (
                            <option key={status} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="tasks-list" id="tasksTable">
                    <TasksList 
                        tasks={tasks}
                        onSelectTask={onSelectTask} 
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskTable;