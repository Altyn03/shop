import React, { useState } from "react";
import styles from "./TextField.module.scss";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, error }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className={styles.textField}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.textField__inputDiv}>
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                />
                {type === "password" && (
                    <button
                        onMouseDown={toggleShowPassword}
                        onMouseUp={toggleShowPassword}
                    >
                        <i
                            className={`fa-regular fa-eye${
                                showPassword ? "-slash" : ""
                            }`}
                        ></i>
                    </button>
                )}
                <div className={styles.error}>
                    {error && <span>{error}</span>}
                </div>
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func
};
export default TextField;
