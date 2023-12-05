
import {useState, useEffect, useRef} from 'react';

import {useFormik} from "formik";
import * as Yup from "yup";

import Button from "react-bootstrap/Button";

import './ConfirmEmail.scss';

const ConfirmEmail = () => {
    const [code, setCode] = useState(0);
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            emailOrUsername: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            emailOrUsername: Yup.string().required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: (values) => {
            console.log(values);
        },
    });

    return (
        <div className="confirm-email">
            <div className="wrapper">
                <div className="message-icon">

                </div>

                <div className="confirm-text">
                    Enter confirmation code
                </div>
                <div className="email-info">
                    Enter the confirmation code that we sent to the email address {}
                </div>
                <div> Request the code again</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="code"
                            ref={userRef}
                            name="emailOrUsername"
                            placeholder="Confirmation code"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.emailOrUsername}
                        />
                    </div>
                    <div className="form-group">
                        <Button type="submit" size="sm">
                            Further
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default ConfirmEmail;