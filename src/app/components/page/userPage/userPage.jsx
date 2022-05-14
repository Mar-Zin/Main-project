import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Qualities from "../../ui/qualities";
import { Link } from "react-router-dom";
import api from "../../../api";

const UserPage = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <h2>
                    <Qualities qualities={user.qualities} />
                </h2>
                <p>CompletedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>

                <Link to={"/users/" + user._id + "/edit"}>
                    <button>Изменить</button>
                </Link>
            </>
        );
    }
    return <h1>Loading</h1>;
};

UserPage.propTypes = {
    userId: PropTypes.string
};

export default UserPage;
