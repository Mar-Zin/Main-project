import React, { useEffect, useState } from "react";
import { validator } from "../../utils/validator";
import TextField from "../common/textForm/textField";
import CheckBoxField from "../common/textForm/checkBoxField";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
    const history = useHistory();
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});
    const [enterError, setEnterError] = useState(null);
    const { logIn } = useAuth();

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
        setEnterError(null);
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            }
            // isEmail: {
            //     message: "Электронная почта введена некоректно"
            // }
        },
        password: {
            isRequired: { message: "Пароль обязателен для заполнения" }
            // isCapital: {
            //     message: "Пароль должен содержать хотя бы одну заглавную букву"
            // },
            // isContainDigit: {
            //     message: "Пароль должен содержать хотя бы одну цифру"
            // },
            // min: {
            //     message: "Пароль должен содержать минимум 8 символов",
            //     value: 8
            // }
        }
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        try {
            await logIn(data);
            alert(
                `Давно не виделись! Рад тебя видеть, ${data.email.slice(
                    0,
                    data.email.indexOf("@")
                )}`
            );
            history.push(
                history.location.state
                    ? history.location.state.from.pathname
                    : "/"
            );
        } catch (error) {
            setEnterError(error.message);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                name="stayOn"
                onChange={handleChange}
            >
                Оставаться в системе
            </CheckBoxField>
            {enterError && <p className="text-danger">{enterError}</p>}
            <button
                disabled={!isValid || enterError}
                className="btn btn-primary w-100 mx-auto"
            >
                Отправить форму
            </button>
        </form>
    );
};

export default LoginForm;
