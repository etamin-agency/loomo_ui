import {setStudentProfile,setStudentProfileImage} from '../actions'
import {createReducer} from "@reduxjs/toolkit";

const initialState = {profile: {}};
const profile = createReducer(initialState, builder => {
    builder.addCase(setStudentProfile, (state, action) => {
        state.profile = {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            userName: action.payload.userName,
            profilePicture: action.payload.profilePicture,
            bio: action.payload.bio
        }
    })
    builder.addCase(setStudentProfileImage, (state, action) => {
        state.profile = {
            ...state.profile,
            profilePicture: action.payload,
        };
    })
        .addDefaultCase(() => {
        });
});

export default profile;