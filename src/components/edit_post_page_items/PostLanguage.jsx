import React, { useEffect, useState } from "react";
import publishService from "../../services/publishService";
import Dropdown from "react-bootstrap/Dropdown";
import arrow_down from "../../assets/down-arrow-svgrepo-com.svg";
import "./EditPageItems.scss";

const PostLanguage = (props) => {
    const [languages, setLanguages] = useState([]);
    const [pickedLanguage, setPickedLanguage] = useState(
        props?.language || "Select language"
    );

    useEffect(() => {
        publishService
            .getLanguages()
            .then((data) => {
                setLanguages(data);
            })
            .then(() => {
                setPickedLanguage(props?.language || "Select language");
            });
    }, [props.language]);

    const handleChange = (text) => {
        props?.setter(text);
        setPickedLanguage(text);
    };

    return (
        <div className="PostLanguage">
            <Dropdown>
                <Dropdown.Toggle
                    variant="primary"
                    id="dropdown-languages"
                    className={`custom-toggle ${props.error ? "error" : ""}`}
                >
                    {pickedLanguage}
                    <div className="custom-toggle-container">
                        <img
                            className="custom-arrow"
                            src={arrow_down}
                            alt="arrow-down-svg"
                        />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu">
                    {languages?.map((language) => (
                        <Dropdown.Item
                            key={language.languageId}
                            onClick={() => handleChange(language.language)}
                        >
                            {language.language}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            {props.error && (
                <div className="error-text">{props.helperText}</div>
            )}
        </div>
    );
};

export default PostLanguage;
