import React, { useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import propfessionService from "../services/profession.service";

const ProfessionContext = React.createContext();
export const useProfession = () => {
    return useContext(ProfessionContext);
};

export const ProfessionProvider = ({ children }) => {
    const [professions, setProfessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    function catchError(error) {
        const { message } = error.response.data;
        setError(message);
    }

    async function getProfessions() {
        try {
            const { content } = await propfessionService.get();
            setProfessions(content);
            setIsLoading(false);
        } catch (error) {
            catchError(error);
        }
    }

    function getProfession(id) {
        return professions.find((p) => p._id === id);
    }

    useEffect(() => {
        getProfessions();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast.error(error);
            setError(null);
        }
    }, [error]);

    return (
        <ProfessionContext.Provider
            value={{ professions, isLoading, getProfession }}
        >
            {children}
        </ProfessionContext.Provider>
    );
};

ProfessionProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
