import {useFormik} from "formik";
import * as Yup from "yup";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import {useCallback} from "react";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";

import settingService from "../../../services/settingService";

import './AccountEditPage.scss'

const AccountEditPage = () => {
    const {profile} = useSelector(state => state.profile);

    const formik = useFormik({
        initialValues: {
            bio: profile?.bio,
        },
        validationSchema: Yup.object({
            bio: Yup.string().min(40).max(7000, "Have to be less than chars"),
        }),
        onSubmit: async (values, {setSubmitting}) => {
            try {
                const userName = jwtDecode(Cookie.get('access_token')).sub;

                await settingService.updateProfile(userName, formik.values.bio);
            } catch (error) {
                console.error(error);
            } finally {
                setSubmitting(false);
            }
        },
    });
    const countWords = useCallback(() => {
        if (!formik.values.bio || formik.values.bio.trim().length === 0) {
            return 0;
        }
        const words = formik.values.bio.trim().split(/\s+/);
        return words.length;
    }, [formik.values]);
    const isButtonDisabled = formik.touched.bio && (formik.errors.bio || countWords() > 800);

    return (
        <div className="AccountEditPage">
            <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                    <div className="bio-text">Bio:</div>
                    <textarea
                        className="bio-textarea"
                        id="bio"
                        name="bio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.bio}
                    />

                    {formik.touched.bio && formik.errors.bio ? (
                        <div className="error">{formik.errors.bio}</div>
                    ) : null}
                    <div className="word-counter">{countWords()}/800</div>
                </div>


                <div className="form-group">
                    <Button type="submit" size="lg" disabled={isButtonDisabled}>
                        Update
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default AccountEditPage;