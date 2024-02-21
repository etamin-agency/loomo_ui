import React, {useState, useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import publishService from "../../services/publishService";
import {setPostLanguage} from "../../actions";
import {useDispatch} from "react-redux";

const EditLanguage = (props) => {
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const dispatch = useDispatch();
    useEffect(() => {
        setSelectedLanguage(props.langauge)
        publishService.getLanguages().then(data => setLanguages(data));
    }, []);

    const handleLanguageSelect = (language) => {
        setSelectedLanguage(language);
    };

    const handleSubmit = () => {
        dispatch(setPostLanguage(selectedLanguage));
        props.close()
    };
    return (
        <div className="some-name">
            <div className="EditLanguage">
                <h2>Select a Language</h2>
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-languages">
                        {selectedLanguage}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                        {languages.map((language) => (
                            <Dropdown.Item
                                key={language.languageId}
                                onClick={() => handleLanguageSelect(language.language)}
                            >
                                {language.language}
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <Button className="text-button" type="submit" size="sm" onClick={handleSubmit}>
                    Save
                </Button>

                <Button className="close-button" type="button" size="sm" onClick={props.close}>
                    Close
                </Button>
            </div>
        </div>
    );
};

export default EditLanguage;
