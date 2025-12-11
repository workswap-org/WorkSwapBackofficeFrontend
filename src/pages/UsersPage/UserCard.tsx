import React from "react";
import { Avatar } from "@core/components";
import { IUser } from "@core/lib";

type UserCardProps = {
    user: IUser;
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