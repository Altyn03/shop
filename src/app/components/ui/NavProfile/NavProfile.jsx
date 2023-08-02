import React, { useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import styles from "./NavProfile.module.scss";

const NavProfile = () => {
    const [isShow, setIsShow] = useState(false);

    const toggleMenu = () => {
        setIsShow((prev) => !prev);
    };

    const { currentUser } = useAuth();

    return (
        <div className={`dropdown ${styles.dropdown}`} onClick={toggleMenu}>
            <div className={`btn dropdown-toggle ${styles.toggle}`}>
                <img
                    // src={`https://avatars.dicebear.com/api/avataaars/${
                    //     (Math.random() + 1, toString(36).substring(7))
                    // }.svg`}
                    src={currentUser.image}
                    alt=""
                    className="img-responsive rounded-circle"
                />
                <div className={styles.name}>{currentUser.name}</div>
            </div>
            <div
                className={
                    `dropdown-menu ${styles.drop_menu}` +
                    (isShow ? " show" : "")
                }
            >
                <Link to={`/users/${currentUser.id}`} className="dropdown-item">
                    Профиль
                </Link>
                <Link to="/logOut" className="dropdown-item">
                    Выйти из аккаунта
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
