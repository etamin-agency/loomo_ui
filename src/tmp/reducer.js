const initialState ={role:''};
const reducer = (state= initialState , action) => {
    switch (action.type) {
        case "STUDENT":
            return {role:"STUDENT"}
        case "TEACHER":
            return {role:"TEACHER"}
        default:
            return {role:""};
    }
}

export default reducer;