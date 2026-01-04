import { getSortedTasks, getTasksMetadata, ITask } from "@core/lib";
import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";

const TasksGrid = () => {

    const [sort, setSort] = useState<string>("created");
    const [taskType, setTaskType] = useState<string>("");
    const [taskStatus, setTaskStatus] = useState<string>("");
    const [page, setPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0);

    const [taskTypeList, setTaskTypeList] = useState<string[] | null>(null);
    const [taskStatusList, setTaskStatusList] = useState<string[] | null>(null);

    const [tasks, setTasks] = useState<ITask[] | null>(null);

    useEffect(() => {
        async function loadSortedTasks() {
            const params: any = {};

            if (taskType) params.type = taskType;
            if (sort) params.sort = sort;
            if (taskStatus) params.status = taskStatus;
            params.page = page;

            try {
                const data = await getSortedTasks(params);
                console.log(data)
                setTasks(data.tasks);
                setTotalPages(data.totalPages)
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
        <div className="tasks-grid">
            {tasks?.slice()
                .map(task => (
                    <TaskCard key={task.id} task={task}/>
                ))
            }
        </div>
    )
}

export default TasksGrid;