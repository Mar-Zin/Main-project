import React from "react";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { useHistory } from "react-router-dom";

const UserCard = ({ user }) => {
    const history = useHistory();

    const handleBack = () => {
        history.replace("/users");
    };

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h2>
                    <QualitiesList qualities={user.qualities} />
                </h2>
                <h3>CompletedMeetings: {user.completedMeetings}</h3>
                <h2>Rate: {user.rate}</h2>
                <button
                    onClick={() => {
                        handleBack();
                    }}
                >
                    Все пользователи
                </button>
            </>
        );
    }
    return <h1>Loading</h1>;
};

UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
