import axios from 'axios';
import Cookie from 'js-cookie';

const API_BASE_URL = 'http://localhost:8081/api/v1';

const axiosErrorHandler = (error) => error?.response?.data;

const settingService = {
    getStudentProfile: async (username) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/student/${username}`);
            return response.data;
        } catch (error) {
            return axiosErrorHandler(error);
        }
    },
    getTeacherProfile: async (username) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/teacher/${username}`);
            return response.data;
        } catch (error) {
            return axiosErrorHandler(error);
        }
    },
};

export default settingService;
