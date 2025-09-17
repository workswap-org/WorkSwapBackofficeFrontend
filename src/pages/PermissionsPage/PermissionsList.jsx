import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";

const PermissionsList = ( {permissions, selectedRole, setSaving} ) => {

    const [checkedPermissions, setCheckedPermissions] = useState([]);

    useEffect(() => {
        async function loadPermsByRole() {
            const data = await apiFetch(`/api/permissions/${selectedRole?.id}/get`);
            setCheckedPermissions(data.permissions);
        }

        if (selectedRole) {
            loadPermsByRole()
        }
    }, [selectedRole])

    function changeRolePerms(perm) {
        setSaving(true);
        setCheckedPermissions(prev => {
            // если уже есть — удалить
            if (prev.some(p => p.id === perm.id)) {
                return prev.filter(p => p.id !== perm.id);
            } else {
                return [...prev, { id: perm.id, name: perm.name }];
            }
        });
    }

    useEffect(() => {
        async function savePermissions() {
            const data = await apiFetch(`/api/permissions/${selectedRole.id}/save`, { 
                method: 'PUT', 
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checkedPermissions) 
            })
            if(data.message) setSaving(false);
        }

        if (selectedRole && checkedPermissions.length > 0) savePermissions(checkedPermissions);
    }, [checkedPermissions, selectedRole, setSaving])

    return (
        <div className="permissions-list" id="permissionsList">
            {permissions.map((perm) => (
                <div className="permission-item" key={perm.id} >
                    <span>{perm.name}</span>
                    {selectedRole && (
                        <label className="switch perm-toggle-label">
                            <input 
                                className="perm-toggle" 
                                type="checkbox"
                                checked={checkedPermissions.some(p => p.id === perm.id)}
                                onChange={() => changeRolePerms(perm)}
                            />
                            <span className="slider">
                                <i className="fa-solid fa-check" style={{color: 'lightgreen'}}></i>
                                <i className="fa-solid fa-xmark" style={{color: 'rgb(184, 94, 94)'}}></i>
                            </span>
                        </label>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PermissionsList;