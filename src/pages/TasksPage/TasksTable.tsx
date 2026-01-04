import { getTasksMetadata, getSortedTasks, ITask } from "@core/lib";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import TasksList from "./TasksList";

const TaskTable = ({ onSelectTask }: { onSelectTask: Dispatch<SetStateAction<number | null>> }) => {

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

                    {taskTypeList && (
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
                    )}

                    {taskStatusList && (
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
                    )}
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