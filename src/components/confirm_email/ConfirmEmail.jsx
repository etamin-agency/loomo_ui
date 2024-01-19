import {useState, useEffect, useRef} from 'react';

import {useFormik} from "formik";
import * as Yup from "yup";


import './ConfirmEmail.scss';
import authService from "../../services/authService";

const ConfirmEmail = (props) => {
    const userRef = useRef();

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
                        verificationNumber:values.code,
                    };
                    console.log(data)
                    formik.setSubmitting(true);
                    const registerResponse = await authService.register(data);
                    if (registerResponse) {

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
                        <button type="submit" className="submit-form">
                            Confirm code
                        </button>
                    </div>
                    <div className="back-btn" onClick={() => props.setPage("sign-up")}>Back</div>
                </form>
            </div>
        </div>
    );

}

export default ConfirmEmail;