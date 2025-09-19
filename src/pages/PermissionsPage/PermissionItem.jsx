import { useEffect, useRef, useState } from 'react';
import PermissionActions from "./PermissionActions";
import { apiFetch } from '@/lib/apiClient';
import { useNotification } from "@/lib/contexts/notifications/NotificationContext";

const PermissionItem = ({
    permission,
    setSaving,
    selectedRole,
    checkedPermissions,
    setCheckedPermissions
}) => {

    const notificate = useNotification()

    const [editMode, setEditMode] = useState(false);
    const [permissionName, setPermissionName] = useState(permission.name);
    const [permissionComment, setPermissionComment] = useState(permission.comment);

    const inputRef = useRef(null);

    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    async function savePermissions(permId, enabled) {
        const params = {
            permissionId: permId,
            enabled
        }
        const data = await apiFetch(`/api/permissions/${selectedRole.id}/save`, { method: 'PUT' }, params)
        if (data.message) setSaving(false);
    }

    function changeRolePerms(perm, enabled) {
        setSaving(true);
        savePermissions(perm.id, enabled);
        setCheckedPermissions(prev => {
            // если уже есть — удалить
            if (prev.some(p => p.id === perm.id)) {
                return prev.filter(p => p.id !== perm.id);
            } else {
                return [...prev, { id: perm.id, name: perm.name }];
            }
        });
    }

    async function savePermission(id) {
        const params = {};
        if (permissionName) params.name = permissionName;
        params.comment = permissionComment || "";
        setEditMode(false);
        const res = await apiFetch(`/api/permissions/update/permission/${id}`, {method: "POST"}, params)
        if (res.message) {
            notificate(res.message, res.status);
        }
    }

    const handleEnterDown = (e) => {
        if (e.key === 'Enter') {
            savePermission(permission.id);
        }
    };

    return (
        <div className="permission-item" key={permission.id}>
            {editMode ? (
                <>
                    <input
                        ref={inputRef}
                        id="permissionName"
                        className='permission-name'
                        type="text"
                        required
                        value={permissionName}
                        onChange={(e) => setPermissionName(e.target.value)}
                        onKeyDown={handleEnterDown}
                    />
                    <input
                        id="permissionComment"
                        type="text"
                        className="permission-comment"
                        required
                        value={permissionComment}
                        placeholder='Введите комментарий к разрешению'
                        onChange={(e) => setPermissionComment(e.target.value)}
                        onKeyDown={handleEnterDown}
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
                        onChange={(e) => changeRolePerms(permission, e.target.checked)}
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