import React from "react";
import PropTypes from "prop-types";

const CheckBoxField = ({ name, value, onChange, children, error }) => {
    const handleChange = () => {
        onChange({ name: name, value: !value });
    };

    return (
        <div style={{ marginTop: "20px", fontSize: "18px" }}>
            <input
                type="checkBox"
                id={name}
                onChange={handleChange}
                checked={value}
            />
            <label htmlFor={name}>{children}</label>
            <div style={{ height: "20px", margin: "10px 0" }}>
                {error && (
                    <span style={{ color: "red", fontSize: "14px" }}>
                        {error}
                    </span>
                )}
            </div>
        </div>
    );
};
CheckBoxField.propTypes = {
    name: PropTypes.string,
    error: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]),
    value: PropTypes.bool,
    onChange: PropTypes.func
};

export default CheckBoxField;
