const TaskCreateModalBtn = () => {
    return (
        <button onclick="openModal('adminModal')" className="btn-admin btn-admin-primary btn-overlay task-add-btn">
            <i className="fa-solid fa-plus"></i> Добавить задачу
            <TaskCreateModal/>
        </button>
    );
};

const TaskCreateModal = () => {
    return (
        <div id="adminModal" className="modal-overlay">
            <div className="admin-modal">
                <div className="admin-modal-content">
                    <span className="close" onclick="closeModal('adminModal')">&times;</span>
                    <h2>Добавить задачу</h2>
                    <form style={{gap: "0.5rem"}} id="taskCreateForm">
                        
                        <div className="form-group">
                            <label for="taskName">Название:</label>
                            <input type="text" id="taskName" name="taskName" required />
                        </div>
                        
                        <div className="form-group">
                            <label for="taskDescription">Описание:</label>
                            <p>(как можно подробнее)</p>
                            <textarea id="taskDescription" name="taskDescription" rows="2"></textarea>
                        </div>

                        <div className="form-group">
                            <label for="taskDescription">Тип задания:</label>
                            <select name="taskType" id="taskType" className="form-control" required>
                                <option value="" selected>Тип задания</option>
                                <option th:each="taskType : ${taskTypes}"
                                        th:value="${taskType}"
                                        th:text="${taskType.displayName}">
                                </option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label for="deadline">Дедлайн:</label>
                            <input type="datetime-local" id="deadline" name="deadline" className="form-control" required />
                        </div>

                        <div className="form-actions">
                            <button id="saveTaskBtn" className="btn btn-outline-primary">Сохранить</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TaskCreateModalBtn;