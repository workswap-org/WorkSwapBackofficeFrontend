const RolesList = ({
    roles, 
    selectRole, 
    selectedRole, 
    saving,
    roleListVisible
}) => {

    return (
        <div className={`roles-list ${roleListVisible ? "show" : ""}`}>
            {roles.map((role) => (
                <div 
                    className="role-item" 
                    key={role.id}
                    onClick={() => selectRole(role)}
                >
                    <span>{role.name}</span>
                    {(selectedRole?.id == role.id && saving) &&
                        <div>
                            <i className="fa-solid fa-loader fa-spin"></i>
                        </div>
                    }
                </div>
            ))}
        </div>
    );
};

export default RolesList;