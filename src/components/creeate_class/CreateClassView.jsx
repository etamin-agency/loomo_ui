import Button from "react-bootstrap/Button";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect, useRef} from "react";

import './CreateClassView.scss'
const CreateClassView = (props) => {
    const userRef = useRef();

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
            props.createClass(values.text);
        }
    });

    return (
        <div className="some-name">
            <div className="CreateClassView">
                <form onSubmit={formik.handleSubmit}>
                    Write class name
                    <div className="form-group">
                      <input
                          className="class-name"
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
                    </div>
                    <Button className="create-class-button" type="submit" size="sm"  >
                        Create Class
                    </Button>
                    <Button className="close-button" type="button" size="sm" onClick={props.close} >
                        Close
                    </Button>
                </form>
            </div>
        </div>
    )
}
export default CreateClassView;