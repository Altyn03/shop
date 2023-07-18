import { useState, useEffect } from "react";
import { validator } from "../utils/validator";

const useForm = (data, setData, validatorConfig) => {
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length === 0;

    return { handleChange, validate, errors, isValid, setErrors };
};

export default useForm;
