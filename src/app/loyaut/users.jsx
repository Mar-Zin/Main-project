import React from "react";
import UsersListPage from "../components/page/usersListPage";
import UserPage from "../components/page/userPage";
import { useParams, useHistory } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage/editUserPage";
import UserProvider from "../hooks/useUsers";
import { useAuth } from "../hooks/useAuth";

const Users = () => {
    const { userId } = useParams();
    const { edit } = useParams();
    const { currentUser } = useAuth();
    const history = useHistory();

    return (
        <UserProvider>
            {userId === currentUser._id && edit ? (
                <EditUserPage />
            ) : userId !== currentUser._id && edit ? (
                history.push(`/users/${currentUser._id}/edit`)
            ) : userId ? (
                <UserPage userId={userId} />
            ) : (
                <UsersListPage />
            )}
        </UserProvider>
    );
};

export default Users;
