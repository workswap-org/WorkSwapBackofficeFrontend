import { apiFetch } from "@/lib/apiClient";
import { useState } from "react";

const PermissionCreateModal = ({setPermissionCreateModal}) => {

    const [name, setName] = useState("");

    async function createPermission() {
        if (!name.trim()) return;
        const data = await apiFetch(`/api/permissions/create/permission?permissionName=${name}`, { method: "POST" });
        console.log(data?.message);
        setName("");
        setPermissionCreateModal(false);
    }

    return (
        <div class="modal-overlay">
            <div class="admin-modal">
                <div class="admin-modal-content">
                    <span class="close" onClick={() => setPermissionCreateModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                    <h2>Создать Разрешение</h2>
                    <div style={{gap: '0.5rem'}}>                  
                        <div class="form-group">
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

                        <div class="form-actions" onClick={() => createPermission()}>
                            <button class="btn btn-outline-primary">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PermissionCreateModal;