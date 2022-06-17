import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/textForm/textField";
import SelectField from "../../common/textForm/selectField";
import RadioField from "../../common/textForm/radioField";
import MultiSelectField from "../../common/textForm/multiSelectField";
import BackHistoryButton from "../../common/backButton";
import { useProfession } from "../../../hooks/useProfession";
import { useQuality } from "../../../hooks/useQuality";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        email: "",
        profession: "",
        sex: "male",
        qualities: []
    });
    const { currentUser, editUserData } = useAuth();
    const { professions } = useProfession();
    const { qualities } = useQuality();
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const getQualities = (elements) => {
        const qualitiesArray = [];
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem === qualities[quality]._id) {
                    qualitiesArray.push({
                        value: qualities[quality]._id,
                        label: qualities[quality].name
                    });
                }
            }
        }
        return qualitiesArray;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        console.log({
            ...data,
            qualities: data.qualities.map((qual) => qual.value)
        });
        editUserData({
            ...data,
            qualities: data.qualities.map((qual) => qual.value)
        });
        history.push(`/users/${currentUser._id}`);
    };
    useEffect(() => {
        setData((prevState) => ({
            ...prevState,
            ...currentUser,
            qualities: getQualities(currentUser.qualities)
        }));
        setIsLoading(false);
    }, []);
    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }));
    };
    const transformQuality = (data) => {
        return data.map((qual) => ({
            value: qual._id,
            label: qual.name,
            color: qual.color
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={data.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={data.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                options={transformData(professions)}
                                name="profession"
                                onChange={handleChange}
                                value={data.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={data.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={data.qualities}
                                options={transformQuality(qualities)}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        "Loading..."
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
