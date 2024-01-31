import axios from 'axios';
import Cookie from "js-cookie";

const API_BASE_URL = 'http://localhost:8081/api/v1';

const token = Cookie.get("access_token");
const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    },
});
const settingService = {
    getStudentProfile: async (username) => {
        try {
            const response = (await axiosInstance.get(`/student/${username}`)).data;
            return response;
        } catch (error) {
                return error?.response?.data;
        }
    },
    getTeacherProfile: async (username) => {
        try {
            const response = await axiosInstance.get(`/teacher/${username}`);
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
}
export default settingService;
