import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import student from '../../../assets/studentbook.png';
import eye from '../../../assets/eye-icon.png';
import facebook_icon from '../../../assets/face.svg';
import google_icon from '../../../assets/google.svg';
import github_icon from '../../../assets/github.svg';
import './SignUpPage.scss';

const SignUpPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            username: '',
            emailOrPhone: '',
            password: '',
            rememberMe: false,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            username: Yup.string().required('Required'),
            emailOrPhone: Yup.string().required('Required'),
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
                <img src={student} alt="login-page" />
            </div>
            <div className="right">
                <h2>Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="emailOrPhone"
                            name="emailOrPhone"
                            placeholder="Email or Phone"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.emailOrPhone}
                        />
                        {formik.touched.emailOrPhone && formik.errors.emailOrPhone ? (
                            <div className="error">{formik.errors.emailOrPhone}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="name"
                            name="name"
                            placeholder="First and last name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                        ) : null}
                    </div>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                        {formik.touched.username && formik.errors.username ? (
                            <div className="error">{formik.errors.username}</div>
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
                            Teacher Account{' '}
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
                            Sign Up
                        </Button>
                    </div>
                </form>
                <div className="login-with">
                    <div>Sign Up with:</div>
                    <div id="google" className="social-media-icon">
                        <img src={google_icon} alt="google-icon" />
                    </div>
                    <div id="github" className="social-media-icon">
                        <img src={github_icon} alt="github-icon" />
                    </div>
                    <div id="facebook" className="social-media-icon">
                        <img src={facebook_icon} alt="facebook-icon" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
