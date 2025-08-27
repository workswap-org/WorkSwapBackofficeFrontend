import { useState } from "react";
import Modal from "@/components/Modal";

const TaskCreateModal = () => {

    const [isTaskModalOpen, setTaskModalOpen] = useState(false);

    return (
        <Modal
            isOpen={isTaskModalOpen}
            onClose={() => setTaskModalOpen(false)}
            title="Добавить задачу"
        >
            <form style={{ gap: "0.5rem" }} id="taskCreateForm">
                <div className="form-group">
                    <label htmlFor="taskName">Название:</label>
                    <input type="text" id="taskName" name="taskName" required />
                </div>

                <div className="form-group">
                    <label htmlFor="taskDescription">Описание:</label>
                    <p>(как можно подробнее)</p>
                    <textarea id="taskDescription" name="taskDescription" rows="2"></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="taskType">Тип задания:</label>
                    <select name="taskType" id="taskType" className="form-control" required>
                        <option value="">Тип задания</option>
                        {/* map по taskTypes */}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="deadline">Дедлайн:</label>
                    <input
                        type="datetime-local"
                        id="deadline"
                        name="deadline"
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-actions">
                    <button id="saveTaskBtn" className="btn btn-outline-primary">
                        Сохранить
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default TaskCreateModal;