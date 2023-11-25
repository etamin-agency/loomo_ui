import {useState, useEffect, useRef} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';


import pcman from '../../../assets/pcman.png';
import eye from '../../../assets/eye-icon.png';
import facebook_icon from '../../../assets/face.svg';
import google_icon from '../../../assets/google.svg';
import github_icon from '../../../assets/github.svg';
import './LoginPage.scss';


const LogInPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const userRef = useRef();
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
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
            // Handle form submission here, e.g., send data to the server
            console.log(values);
        },
    });

    return (
        <div className="LoginPage">
            <div className="left">
                <img src={pcman} alt="login-page"/>
            </div>
            <div className="right">
                <h2>Log In</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="emailOrUsername"
                            ref={userRef}
                            name="emailOrUsername"
                            placeholder="Username or Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.emailOrUsername}
                        />

                        {formik.touched.emailOrUsername && formik.errors.emailOrUsername ? (
                            <div className="error">{formik.errors.emailOrUsername}</div>
                        ) : null}

                    </div>
                    <div className="form-group">
                        <div className="password-input">
                            <input
                                className="text-input"
                                type={passwordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                placeholder="Password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                            <img
                                src={eye}
                                onClick={togglePasswordVisibility}
                                className="password-toggle"
                            />
                        </div>
                        {formik.touched.password && formik.errors.password ? (
                            <div className="error">{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="form-group check-box">
                        <label>
                            Remember Me{' '}
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formik.values.rememberMe}
                                onChange={formik.handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <Button type="submit" size="sm">
                            Log in
                        </Button>
                    </div>
                </form>

                <div className="login-with">
                    <div>Login with:</div>
                    <div id="google" className="social-media-icon"><img src={google_icon} alt="google-icon"/></div>
                    <div id="github" className="social-media-icon"><img src={github_icon} alt="github-icon"/></div>
                    <div id="facebook" className="social-media-icon"><img src={facebook_icon} alt="facebook-icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogInPage;
