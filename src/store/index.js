import role from '../reducers/role';
import profile from "../reducers/profile";
import {configureStore} from "@reduxjs/toolkit";


const store = configureStore({
    reducer: {role, profile},
    devTools: process.env.NODE_ENV !== 'production',
})
export default store;
