import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";

const Users = () => {
    const { userId } = useParams();
    const { edit } = useParams();

    return (
        <UserProvider>
            {userId && edit ? (
                <EditUserPage />
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
