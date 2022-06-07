import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQuality();

    return (
        <>
            {!isLoading
                ? qualities.map((qual) => <Quality id={qual} key={qual} />)
                : "loading..."}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
