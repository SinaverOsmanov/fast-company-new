import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataStatus, loadUsers } from "../../store/users";
import { PropTypes } from "prop-types";

export function UsersLoader({ children }) {
    const dispatch = useDispatch();
    const dataStatus = useSelector(getDataStatus());
    useEffect(() => {
        if (!dataStatus) dispatch(loadUsers);
    }, []);

    if (!dataStatus) return "Loading";

    return children;
}

UsersLoader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
