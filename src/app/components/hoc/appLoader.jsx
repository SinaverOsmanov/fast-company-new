import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsLoggedIn, loadUsers, getUsersLoading } from "../../store/users";
import { PropTypes } from "prop-types";
import { loadQualitiesList } from "./../../store/qualities";
import { loadProfessions } from "./../../store/profession";

export function AppLoader({ children }) {
    const dispatch = useDispatch();

    const isLoggedIn = useSelector(getIsLoggedIn());

    const usersStatusLoading = useSelector(getUsersLoading());

    useEffect(() => {
        dispatch(loadQualitiesList());
        dispatch(loadProfessions());
        if (isLoggedIn) {
            dispatch(loadUsers());
        }
    }, [isLoggedIn]);
    if (usersStatusLoading) return "Loading...";
    return children;
}

AppLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
