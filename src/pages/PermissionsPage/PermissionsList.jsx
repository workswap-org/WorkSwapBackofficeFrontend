import { useEffect, useState } from "react";
import { apiFetch } from "@core/lib/services/apiClient";
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

    return (
        <div className="permissions-list" id="permissionsList">
            {permissions.map((perm) => (
                <PermissionItem 
                    key={perm.id}
                    permission={perm} 
                    setSaving={setSaving} 
                    selectedRole={selectedRole}
                    checkedPermissions={checkedPermissions}
                    setCheckedPermissions={setCheckedPermissions}
                />
            ))}
        </div>
    );
};

export default PermissionsList;