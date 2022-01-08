import React from "react";
import PropTypes from "prop-types";
import {
    getProfessionById,
    getProfessionsLoading
} from "../../store/profession";
import { useSelector } from "react-redux";

const Profession = ({ id }) => {
    const professionsLoading = useSelector(getProfessionsLoading());
    const profession = useSelector(getProfessionById(id));

    if (!professionsLoading) {
        return <p>{profession.name}</p>;
    } else return "loading ...";
};

Profession.propTypes = {
    id: PropTypes.string
};

export default Profession;
