import {useState, useEffect, useRef} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import authService from "../../services/authService";

import student from '../../assets/studentbook.png';
import eye from '../../assets/eye-icon.png';
import facebook_icon from '../../assets/face.svg';
import google_icon from '../../assets/google.svg';
import github_icon from '../../assets/github.svg';

import './SignUp.scss';

const SignUp = (props) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isBlur, setBlur] = useState(false);
    const userRef = useRef();
    useEffect(() => {
        userRef.current.focus();
    }, []);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const mouseIn = () => {
        setBlur(true);
    }

    const mouseOut = () => {
        setBlur(false);
    }
    const formik = useFormik({
        initialValues: {
            name: props.data?.lastName != null ? props.data.firstName + ' ' + props.data.lastName : props.data?.firstName,
            username: props.data?.userName,
            // emailOrPhone:  props.data?.emailOrPhone,
            email: props.data?.email,
            password: props.data?.password,
            isTeacher: props.data?.role === 'TEACHER' ? true : false,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2, "at least 2 characters").required('Required'),
            username: Yup.string().min(6, "at least 6 characters").required('Required')
                .test('is-unique-username', 'Username is already in use', async (value) => {
                    const isUnique = await authService.checkUserName(value);
                    return !isUnique;
                }),
            email: Yup.string().required('Required').test('is-valid-format', 'Invalid email', (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // const phoneRegex = /^[0-9]{10}$/;

                if (emailRegex.test(value)) {
                    return true;
                }

                // if (phoneRegex.test(value)) {
                //     return true;
                // }

                return false;
            })
                .test('is-unique-email-or-phone', 'Email or phone number is already in use', async (value) => {
                    const isUnique = await authService.checkEmail(value);
                    return !isUnique;
                }),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),

        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                if (formik.isValid) {
                    //     const name = values.name.replaceAll("  "," ").split(" ");
                    //     const registrationResponse = await authService.register({
                    //         firstName: name[0],
                    //         lastName: name[1],
                    //         userName: values.username,
                    //         email: values.emailOrPhone,
                    //         password: values.password,
                    //         role: values.isTeacher?"TEACHER":"STUDENT",
                    //     });
                    //     console.log(registrationResponse);

                    const name = values.name.replaceAll("  ", " ").split(" ");
                    const data = {
                        firstName: name[0],
                        lastName: name[1],
                        userName: values.username,
                        email: values.email,
                        password: values.password,
                        role: values.isTeacher ? "TEACHER" : "STUDENT",
                    };
                    formik.setSubmitting(true);
                    const verificationNumberResponse = await authService.verificationNumber(data.email);
                    if (verificationNumberResponse){
                        props.setData(data);
                        props.setEmail(values.email)
                        props.setPage("confirm-page")
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
        <div className="SignUp">
            <div className="left">
                <img src={student} alt="sign-up-page"/>
            </div>
            <div className="right">
                <h2>Sign Up</h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <input
                            className="text-input"
                            type="text"
                            id="email"
                            name="email"
                            ref={userRef}
                            placeholder="Email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="error-container" onMouseOver={mouseIn} onMouseOut={mouseOut}>
                                <CancelRoundedIcon style={{color: 'red'}}/>
                                <div className={`error-message ${isBlur ? 'show_message' : ''}`}>
                                    {formik.errors.email}
                                </div>
                            </div>
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
                            <div className="error-container" onMouseOver={mouseIn} onMouseOut={mouseOut}>
                                <CancelRoundedIcon style={{color: 'red'}}/>
                                <div className={`error-message ${isBlur ? 'show_message' : ''}`}>
                                    {formik.errors.name}
                                </div>
                            </div>
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
                            <div className="error-container" onMouseOver={mouseIn} onMouseOut={mouseOut}>
                                <CancelRoundedIcon style={{color: 'red'}}/>
                                <div className={`error-message ${isBlur ? 'show_message' : ''}`}>
                                    {formik.errors.username}
                                </div>
                            </div>
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
                            {formik.touched.password && formik.errors.password ? (
                                <div className="error-container" onMouseOver={mouseIn} onMouseOut={mouseOut}>
                                    <CancelRoundedIcon style={{color: 'red'}}/>
                                    <div className={`error-message ${isBlur ? 'show_message' : ''}`}>
                                        {formik.errors.password}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                    <div className="form-group check-box">
                        <label>
                            Teacher Account{' '}
                            <input
                                type="checkbox"
                                id="isTeacher"
                                name="isTeacher"
                                checked={formik.values.isTeacher}
                                onChange={formik.handleChange}
                            />
                        </label>
                    </div>
                    <div className="form-group">
                        <Button type="submit" size="sm" disabled={!formik.isValid || formik.isSubmitting}>
                            Sign Up
                        </Button>
                    </div>
                </form>
                <div className="login-with">
                    <div>Sign Up with:</div>
                    <div id="google" className="social-media-icon">
                        <img src={google_icon} alt="google-icon"/>
                    </div>
                    <div id="github" className="social-media-icon">
                        <img src={github_icon} alt="github-icon"/>
                    </div>
                    <div id="facebook" className="social-media-icon">
                        <img src={facebook_icon} alt="facebook-icon"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
