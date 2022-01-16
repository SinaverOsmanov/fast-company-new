import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

export default function NavProfile() {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };
    console.log(currentUser);
    if (!currentUser) return "Loading...";

    return (
        <div className="dropdown" onClick={toggleMenu}>
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div className="me-2">{currentUser.name}</div>
                <img
                    src={currentUser.image}
                    className="img-responsive rounded-circle shadow-1-strong me-3"
                    alt="avatar"
                    width="65"
                    height="65"
                />
            </div>
            <div className={"w-100 dropdown-menu" + (isOpen ? "show" : "")}>
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Profile
                </Link>
                <Link to={`/logout`} className="dropdown-item">
                    Logout
                </Link>
            </div>
        </div>
    );
}
