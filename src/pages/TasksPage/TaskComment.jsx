const TaskComments = () => {
    return (
        <div th:fragment="taskComments" className="task-comment-card" th:each="comment : ${comments}">
            <div className="task-comment flex-row">
                <div className="flex-column">
                    <div className="flex-row" style={{gap: "0.5rem"}}>
                        <img th:replace="~{fragments/small-components :: avatar(user=${comment.author}, size='32', className='')}"></img>
                        <span th:text="${comment.author.name}" style={{margin: "auto 0"}}></span>
                    </div>
                    <br/>
                    <span th:text="${comment.content}"></span>
                </div>
                <div className="button-actions flex-column task-comment-actions" th:if="${admin == comment.author}">
                    <button th:data-comment="${comment.id}" 
                            th:data-task="${task.id}"
                            className="btn-admin btn-admin-danger delete-taskcomment-btn"
                            style={{ height: "auto", right: 0, }}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskComments;