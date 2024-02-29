import {useState, useEffect, useRef, useCallback} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import * as Yup from "yup";


import authService from "../../services/authService";
import {handleLogin} from "../../utils/auth/authUtils";

import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {setStudent, setTeacher} from "../../actions";
import {useDispatch} from "react-redux";


import './ConfirmEmail.scss';

const ConfirmEmail = (props) => {
    const userRef = useRef();
    const [errorText, setErrorText] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const requestNewConfirmationCode = async (email) => {
        const verificationNumberResponse = await authService.verificationNumber(email);
        if (verificationNumberResponse?.data) {
            setErrorText("");
        } else {
            setErrorText("Too many attempts, please try again later.");
        }
    }
    const countryName = async () => {
        return await fetch("https://ipapi.co/json/")
            .then((response) => response.json())
            .then(data => {
                return data?.country_name;
            })
    }


    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: Yup.object({
            code: Yup.number().required("type a code"),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                if (formik.isValid) {

                    const data = {
                        ...props.data,
                        verificationNumber: values.code,
                        country: await countryName()
                    };
                    console.log(data)
                    formik.setSubmitting(true);
                    const registerResponse = await authService.register(data);
                    console.log(registerResponse)
                    if (registerResponse === "SUCCESS") {
                        const loginResponse = await handleLogin({
                            email: data.email,
                            password: data.password
                        });
                        if (loginResponse) {
                            const token = Cookie.get("access_token");
                            if (token != null) {
                                const tokeRole = jwtDecode(token)?.role;
                                switch (tokeRole) {
                                    case "TEACHER":
                                        dispatch(setTeacher());
                                        break;
                                    case "STUDENT":
                                        dispatch(setStudent());
                                        break;
                                }
                            }
                            navigate('/classes');
                        }
                    } else {
                        switch (registerResponse) {
                            case "INCORRECT_NUMBER":
                                setErrorText("Wrong Code");
                                break;
                            case "TOO_MANY_ATTEMPTS":
                                setErrorText("Too many attempts. Please try again later.");
                                break;

                            case "WRONG_EMAIL":
                                setErrorText("Incorrect email. Please register email first.");
                                break;

                            default:
                                console.log(registerResponse)
                                setErrorText("Please try again later.");
                        }
                    }

                }

            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="ConfirmEmail">
            <div className="wrapper">
                <div className="message-icon">

                </div>

                <div className="confirm-text">
                    Enter confirmation code
                </div>
                <div className="email-info">
                    Enter the confirmation code that we sent to the email address {props.email}
                    <div className="code-request" onClick={() => requestNewConfirmationCode(props.email)}> Request code.
                    </div>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="code"
                            ref={userRef}
                            name="code"
                            placeholder="Confirmation code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.code}
                        />
                    </div>
                    <div className="form-group">
                        <Button
                            type="submit"
                            size="sm"
                            disabled={!formik.isValid || formik.isSubmitting || (errorText && errorText !== 'Wrong Code')}
                            className={`submit-form ${formik.isSubmitting || errorText === 'Too many attempts, please try again later.' ? 'disabled-button' : ''}`}
                        >
                            Confirm code
                        </Button>
                        {errorText && (
                            <div className="error-container">
                                <div className={'error-message  show_message'}>
                                    {errorText}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="back-btn" onClick={() => props.setPage("sign-up")}>Back</div>
                </form>
            </div>
        </div>
    );

}

export default ConfirmEmail;