import {setStudentProfile} from '../actions'
import {createReducer} from "@reduxjs/toolkit";

const initialState = {profile: {}};
const profile = createReducer(initialState, builder => {
    builder.addCase(setStudentProfile, (state, action) => {
        state.profile = {
            firstName: action.payload.firstName,
            lastName: action.payload.lastName,
            userName: action.payload.userName,
            profilePictureUrl: action.payload.profilePictureUrl,
            bio: action.payload.bio
        }
    })
        .addDefaultCase(() => {
        });
});

export default profile;