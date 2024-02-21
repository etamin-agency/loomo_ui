import {useFormik} from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import {useCallback, useEffect, useRef} from "react";


import {useDispatch} from "react-redux";

import './EditPageItems.scss'
const EditNumber = (props) => {
    const userRef = useRef();
    const dispatch = useDispatch();

    useEffect(() => {
        userRef.current.focus();
    }, []);
    const formik = useFormik({
        initialValues: {
            num: '',
        },
        validationSchema: Yup.object({
            num: Yup.number().required('Required').max(20),
        }),
        onSubmit:  (values) => {
            dispatch(props.setter(values));
            props.close()
        }
    });
    return (
        <div className="some-name">
            <div className="EditNumber">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                      <input
                          className="num-input"
                          id="num"
                          name="num"
                          ref={userRef}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.num}
                      />
                        {formik.touched.num && formik.errors.num ? (
                            <div className="error">{formik.errors.num}</div>
                        ) : null}
                    </div>
                    <Button className="text-button" type="submit" size="sm"  disabled={!formik.isValid}>
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
export default EditNumber;