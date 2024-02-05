import Cookie from "js-cookie";
import authService from "../../services/authService";


const handleLogin = async (data) => {

    try {
        const loginResponse = await authService.authenticate({
            email: data.email,
            password: data.password,
        });
        if (+loginResponse.status === 401 || loginResponse.data === "INCORRECT_EMAIL_OR_PASSWORD") {
            return false;
        }
        const {access_token, refresh_token} = loginResponse;
        Cookie.set("access_token", access_token, {secure: true, sameSite: "strict"});
        Cookie.set("refresh_token", refresh_token, {secure: true, sameSite: "strict"});
        return true;
    } catch (error) {
        console.error("Login failed:", error);
    }
};

const handleLogout = () => {
    try {
        Cookie.remove("access_token", {secure: true, sameSite: "strict"});
        Cookie.remove("refresh_token", {secure: true, sameSite: "strict"});

    } catch (error) {
        console.error("Logout failed:", error);
    }
};


export {handleLogin, handleLogout};
