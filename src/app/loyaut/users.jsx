import React, { useState, useEffect } from "react";
import UsersList from "../components/usersList";
import UserCard from "../components/userCard";
import { useParams } from "react-router-dom";
import api from "../api";

const Users = () => {
    const [user, setUser] = useState();
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    });

    return <>{userId ? <UserCard user={user} /> : <UsersList />}</>;
};

export default Users;
