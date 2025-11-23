import React from "react";
import { Avatar } from "@core/components";
import { User } from "@/types";

type UserCardProps = {
    user: User;
};

const UserCard: React.FC<UserCardProps> = ({user}) => {
    return (
        <div className="user-card">
            <Avatar user={user} size={80} />
            <span>{user.name}</span>
        </div>
    );
};

export default UserCard;