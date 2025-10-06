import { createRole } from "@core/lib";
import { useState } from "react";

const RoleCreateModal = ({setRoleCreateModal}) => {

    const [name, setName] = useState("");

    async function createR() {
        if (!name.trim()) return;
        const data = await createRole(name);
        console.log(data?.message);
        setName("");
        setRoleCreateModal(false);
    }

    return (
        <div className="modal-overlay">
            <div className="admin-modal">
                <div className="admin-modal-content">
                    <span className="close" onClick={() => setRoleCreateModal(false)}>
                        <i className="fa-solid fa-xmark"></i>
                    </span>
                    <h2>Создать роль</h2>
                    <div style={{gap: '0.5rem'}}>                  
                        <div className="form-group">
                            <label for="roleName">Имя:</label>
                            <p for="roleName">(на англиском, заглавными буквами)</p>
                            <input
                                type="text"
                                id="roleName"
                                name="roleName"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-actions" onClick={() => createR()}>
                            <button className="btn btn-outline-primary">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoleCreateModal;