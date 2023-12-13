import React from "react";
import PropTypes from "prop-types";
import styles from "./RadioField.module.scss";

const RadioField = ({ options, name, value, onChange, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className={styles.radioField}>
            <label>{label}</label>
            <br />
            {options.map((option) => (
                <div
                    key={option.name + "_" + option.value}
                    className={styles.radioField__input}
                >
                    <input
                        type="radio"
                        name={name}
                        id={option.name + "_" + option.value}
                        value={option.value}
                        onChange={handleChange}
                        checked={option.value === value}
                    />
                    <label htmlFor={option.name + "_" + option.value}>
                        {option.name}
                    </label>
                </div>
            ))}
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default RadioField;
