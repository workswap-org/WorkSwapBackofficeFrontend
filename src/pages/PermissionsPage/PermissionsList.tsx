import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getRolePermissions, IPermission, IRole } from "@core/lib";
import PermissionItem from "./PermissionItem";

interface PermissionsListProps {
    permissions: IPermission[] | null;
    selectedRole: IRole | null;
    setSaving: Dispatch<SetStateAction<boolean>>
}

const PermissionsList = ({permissions, selectedRole, setSaving}: PermissionsListProps) => {

    const [checkedPermissions, setCheckedPermissions] = useState<IPermission[] | null>(null);

    useEffect(() => {
        async function loadPermsByRole() {
            const data = await getRolePermissions(selectedRole?.id);
            setCheckedPermissions(data);
        }

        if (selectedRole) {
            loadPermsByRole()
        }
    }, [selectedRole])

    return (
        <div className="permissions-list" id="permissionsList">
            {permissions?.map((perm) => (
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