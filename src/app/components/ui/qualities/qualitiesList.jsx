import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQuality } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { getQuality, isLoading } = useQuality();

    const newQualities = qualities.map((id) => {
        return getQuality(id);
    });
    console.log(newQualities);

    return (
        <>
            {!isLoading
                ? newQualities.map((qual) => (
                      <Quality {...qual} key={qual._id} />
                  ))
                : "loading..."}
        </>
    );
};

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
};

export default QualitiesList;
