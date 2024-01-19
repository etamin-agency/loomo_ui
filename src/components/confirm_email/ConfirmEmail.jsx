import {useState, useEffect, useRef} from 'react';

import {useFormik} from "formik";
import * as Yup from "yup";


import './ConfirmEmail.scss';
import authService from "../../services/authService";

const ConfirmEmail = (props) => {
    const userRef = useRef();
    const [errorText, setErrorText] = useState("");

    useEffect(() => {
        userRef.current.focus();
    }, []);

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
                    };
                    formik.setSubmitting(true);
                    const registerResponse = await authService.register(data);
                    if (registerResponse === "SUCCESS") {
                        const loginResponse = await authService.authenticate({
                            email: data.email,
                            password: data.password
                        });
                        console.log(loginResponse)
                    } else {
                        switch (registerResponse) {
                            case "INCORRECT_NUMBER":
                                setErrorText("Incorrect  number format. Please enter a valid  number.");
                                break;

                            case "TOO_MANY_ATTEMPTS":
                                setErrorText("Too many attempts. Please try again later.");
                                break;

                            case "WRONG_EMAIL":
                                setErrorText("Incorrect email. Please register email first.");
                                break;

                            default:
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
                    <div className="code-request">Request code.</div>
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
                        <button type="submit" className="submit-form"
                                disabled={!formik.isValid || formik.isSubmitting || errorText}>
                            Confirm code
                        </button>
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