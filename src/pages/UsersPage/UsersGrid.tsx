import React from "react";
import UserCard from "./UserCard"

const UsersGrid = () => {

    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        const data = await loadUsers
    }, [])
    return (
        <div className="users-grid">
            {users.map((user) => (
                <UserCard user={user}/>
            ))}
        </div>
    );
};

export default UsersGrid;