import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";


import Button from "react-bootstrap/Button";
import {useDispatch} from "react-redux";

import './EditPageItems.scss'
const EditList = (props) => {
    const [array, setArray] = React.useState(props.items);
    const dispatch = useDispatch();
    const deleteItem = (index) => {
        const newArray = [...array];
        newArray.splice(index, 1);
        setArray(newArray);
    };
    const handleSave=()=>{
        dispatch(props.setter(array));
        props.close()
    }

    return (
        <div className="some-name">
            <div className="EditList">
                <h2>Fill info</h2>
                <Formik
                    initialValues={{ text: "" }}
                    onSubmit={(values, { resetForm }) => {
                        if (values.text.trim() !== "") {
                            setArray([...array, values.text.trim()]);
                        }
                        resetForm();
                    }}
                >
                    <Form>
                        <Field type="text" name="text"  />
                        <button type="submit" className="add-btn">Add</button>
                        <ErrorMessage name="text" component="div" className="error" />
                    </Form>
                </Formik>
                <div className="items-container">
                    {array.map((text, i) => (
                        <div className="item" key={i}>
                            <div>{text}</div>
                            <div className="btn-close " onClick={() => deleteItem(i)}></div>
                        </div>
                    ))}
                </div>
                <Button className="text-button" type="submit" size="sm" onClick={handleSave}>
                    Save
                </Button>

                <Button className="close-button" type="button" size="sm" onClick={props.close} >
                    Close
                </Button>
            </div>
        </div>
    );
};

export default EditList;
