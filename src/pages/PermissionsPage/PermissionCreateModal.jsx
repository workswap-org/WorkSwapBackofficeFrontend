import { createPermission } from "@core/lib";
import { useState } from "react";

const PermissionCreateModal = ({setPermissionCreateModal}) => {

    const [name, setName] = useState("");

    async function createPerm() {
        if (!name.trim()) return;
        const data = await createPermission(name);
        console.log(data?.message);
        setName("");
        setPermissionCreateModal(false);
    }

    return (
        <div className="modal-overlay">
            <div className="admin-modal">
                <div className="admin-modal-content">
                    <span className="close" onClick={() => setPermissionCreateModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                    <h2>Создать Разрешение</h2>
                    <div style={{gap: '0.5rem'}}>                  
                        <div className="form-group">
                            <label for="permissionName">Имя:</label>
                            <p for="permissionName">(на англиском, заглавными буквами)</p>
                            <input
                                type="text"
                                id="permissionName"
                                name="permissionName"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-actions" onClick={() => createPerm()}>
                            <button className="btn btn-outline-primary">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionCreateModal;