import React, { useState } from 'react';
import PermissionActions from "./PermissionActions";

const PermissionItem = ({
    permission,
    changeRolePerms,
    selectedRole,
    checkedPermissions
}) => {

    const [editMode, setEditMode] = useState(false);
    const [permissionName, setPermissionName] = useState(permission.name);
    const [permissionComment, setPermissionComment] = useState(permission.comment);

    return (
        <div className="permission-item" key={permission.id}>
            {editMode ? (
                <>
                    <input
                        type="text"
                        required
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                    />
                    <input
                        type="text"
                        className="permission-comment"
                        required
                        value={permissionComment}
                        onChange={(e) => setPermissionComment(e.target.value)}
                    />
                </>
            ) : (
                <>
                    <span>{permissionName}</span>
                    <div className="permission-comment">{permissionComment}</div>
                </>
            )}
            {(selectedRole && !editMode) && (
                <label className="switch perm-toggler">
                    <input 
                        type="checkbox"
                        checked={checkedPermissions.some(p => p.id === permission.id)}
                        onChange={() => changeRolePerms(permission)}
                    />
                    <span className="slider">
                        <i className="fa-solid fa-check" style={{color: 'lightgreen'}}></i>
                        <i className="fa-solid fa-xmark" style={{color: 'rgb(184, 94, 94)'}}></i>
                    </span>
                </label>
            )}
            <PermissionActions setEditMode={setEditMode} editMode={editMode} />
        </div>
    );
};

export default PermissionItem;