import { useState } from "react";

const PermissionActions = ({editMode, setEditMode}) => {

    const [actionsCard, setActionsCard] = useState(false);

    function toggleActionsCard() {
        setActionsCard(!actionsCard);
    }

    function toggleEditMode() {
        setEditMode(!editMode)
    }

    return (
        <>
            <button className='permission-actions-btn hover' onClick={() => toggleActionsCard()}>
                <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>   
            {actionsCard && (
                <div className="permission-actions-card">
                    <button className='permission-actions-btn hover' onClick={() => toggleEditMode()}>
                        <i className="fa-solid fa-pen"></i>
                    </button> 
                </div>
            )}
        </>
    );
};

export default PermissionActions;