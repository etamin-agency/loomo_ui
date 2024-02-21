import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import {useCallback, useEffect, useRef} from "react";

import './EditPageItems.scss'
import {useDispatch} from "react-redux";

const EditText = (props) => {
    const userRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
            userRef.current.focus();
    }, []);
    const formik = useFormik({
        initialValues: {
            text: '',
        },
        validationSchema: Yup.object({
            text: Yup.string().required('Required'),
        }),
        onSubmit:  (values) => {
            dispatch(props.setter(values));
            props.close()
        }
    });
    const countWords = useCallback(() => {
        if (!formik.values.text || formik.values.text.trim().length === 0) {
            return 0;
        }
        const words = formik.values.text.trim().split(/\s+/);
        return words.length;
    }, [formik.values]);

    const isButtonDisabled =  countWords() > +props.num || countWords()<1;
    return (
        <div className="some-name">
            <div className="EditText">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <textarea
                          className="text-textarea"
                          id="text"
                          name="text"
                          ref={userRef}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.text}
                      />

                        {formik.touched.text && formik.errors.text ? (
                            <div className="error">{formik.errors.text}</div>
                        ) : null}
                        <div className="word-counter">{countWords()}/{props.num}</div>

                    </div>
                    <Button className="text-button" type="submit" size="sm"  disabled={isButtonDisabled}>
                        Save
                    </Button>

                    <Button className="close-button" type="button" size="sm" onClick={props.close} >
                        Close
                    </Button>
                </form>
            </div>
        </div>

    )
}
export default EditText;