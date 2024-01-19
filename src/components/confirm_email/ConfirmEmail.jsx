import {useState, useEffect, useRef} from 'react';

import {useFormik} from "formik";
import * as Yup from "yup";


import './ConfirmEmail.scss';

const ConfirmEmail = (props) => {
    const [code, setCode] = useState(0);
    const userRef = useRef();

    useEffect(() => {
        userRef.current.focus();
    }, []);

    const formik = useFormik({
        initialValues: {
            code: '',
        },
        validationSchema: Yup.object({
            emailOrUsername: Yup.number()
                .test('len', 'wrong numbers', (val) => val && val.toString().length === 6),
        }),
        onSubmit: (values) => {
            console.log(values);
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
                    Enter the confirmation code that we sent to the email address {props.email} <div className="code-request">Request  code.</div>
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
                        <button  className="submit-form" >
                            Confirm code
                        </button >
                    </div>
                    <div className="back-btn" onClick={()=>props.setPage("sign-up")}>Back</div>
                </form>
            </div>
        </div>
    );

}

export default ConfirmEmail;