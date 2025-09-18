import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/apiClient";
import PermissionItem from "./PermissionItem";

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
                <PermissionItem 
                    permission={perm} 
                    changeRolePerms={changeRolePerms} 
                    selectedRole={selectedRole}
                    checkedPermissions={checkedPermissions}
                />
            ))}
        </div>
    );
};

export default PermissionsList;