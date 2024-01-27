import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api/v1';


const userProfileService = {
    getStudentProfile: async (username) => {
        try {
            const response = await axios.get(`{${API_BASE_URL}/student/${username}`);
            return response.data;
        } catch (error) {
                return error?.response?.data;
        }
    },
    getTeacherProfile: async (username) => {
        try {
            const response = await axios.get(`{${API_BASE_URL}/teacher/${username}`);
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    },
}
