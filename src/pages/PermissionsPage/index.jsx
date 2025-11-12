import { useCallback, useEffect, useState } from "react";
import { 
    getAllRoles,
    getAllPermissions
} from "@core/lib";
import RolesList from "./RolesList";
import PermissionsList from "./PermissionsList";
import RoleCreateModal from "./RoleCreateModal";
import PermissionCreateModal from "./PermissionCreateModal";

const PermissionsPage = () => {

    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState(undefined);
    const [permissions, setPermissions] = useState([]);
    const [roleListVisible, setRoleListVisible] = useState(true);

    const [roleCreateModal, setRoleCreateModal] = useState(false);
    const [permissionCreateModal, setPermissionCreateModal] = useState(false);

    const [saving, setSaving] = useState(false)
    
    function toggleRoleList() {
        setRoleListVisible(!roleListVisible)
    }

    useEffect(() => {
        async function loadRoles() {
            const data = await getAllRoles();
            setRoles(data.roles);
        }

        async function loadPerms() {
            const data = await getAllPermissions();
            setPermissions(data.permissions);
        }

        loadPerms();
        loadRoles();
    }, [])

    const selectRole = useCallback((role) => {
        setSelectedRole(role);
        setRoleListVisible(false)
    }, [])

    return (
        <>
            <nav className="breadcrumbs">
                <a href="/dashboard">Панель управления</a>
                <span className="divider">/</span>
                <span href="/tasks">Роли и разрешения</span>
            </nav>
            
            <div className="card admin-page">
                <div className="card-body flex-column">
                    <div className="card-header">
                        <div className="btn-actions-group">
                            <button onClick={() => setRoleCreateModal(true)} className="btn btn-primary">
                                <i className="fa-solid fa-plus"></i> Роль
                            </button>
                            <button onClick={() => setPermissionCreateModal(true)} className="btn btn-primary">
                                <i className="fa-solid fa-plus"></i> Разрешение
                            </button>
                        </div>
                    </div>
                    {selectedRole ? (
                        <div className="selected-role" onClick={() => toggleRoleList()}>
                            {selectedRole.name}
                        </div>
                    ) : (
                        <div className="selected-role"></div>
                    )}
                    
                    <div className="page-container">
                        <RolesList 
                            roles={roles} 
                            selectRole={selectRole}
                            saving={saving}
                            selectedRole={selectedRole}
                            roleListVisible={roleListVisible}
                        />
                        <PermissionsList
                            selectedRole={selectedRole} 
                            permissions={permissions}
                            setSaving={setSaving}
                        />
                        {roleCreateModal && (
                            <RoleCreateModal setRoleCreateModal={setRoleCreateModal}/>
                        )}
                        {permissionCreateModal && (
                            <PermissionCreateModal setPermissionCreateModal={setPermissionCreateModal}/>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PermissionsPage;