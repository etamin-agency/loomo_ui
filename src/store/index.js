import role from '../reducers/role';
import profile from "../reducers/profile";
import classPost from "../reducers/classPost";
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {role, profile,classPost},
    devTools: process.env.NODE_ENV !== 'production',
})
export default store;
