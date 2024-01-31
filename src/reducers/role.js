const initialState = {role: ''};
const role = (state = initialState, action) => {
    switch (action.type) {
        case "SET_STUDENT_ROLE":
            return {
                ...state,
                role: "student"
            }
        case "SET_TEACHER_ROLE":
            return {
                ...state,
                role: "teacher"
            }
        default:
            return {
                ...state,
            };
    }
}

export default role;