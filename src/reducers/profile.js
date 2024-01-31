const initialState = {profile: {}};
const profile = (state = initialState, action) => {
    switch (action.type) {
        case "SET_STUDENT_PROFILE":
            return {
                ...state,
                profile: {
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    userName: action.payload.userName,
                    profilePictureUrl: action.payload.profilePictureUrl,
                    bio: action.payload.bio
                }
            }
        default:
            return {
                ...state,
            };
    }
}

export default profile;