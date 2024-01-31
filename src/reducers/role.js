import {createReducer} from "@reduxjs/toolkit";
import {setTeacher, setStudent} from "../actions";

const initialState = {role: ''};

const role = createReducer(initialState, builder => {
    builder.addCase(setTeacher, (state) => {
        state.role = "teacher"
    }).addCase(setStudent, (state) => {
        state.role = "student"
    }).addDefaultCase(() => {
    });
});

export default role;