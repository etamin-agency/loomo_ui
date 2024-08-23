import axios from 'axios';
import Cookie from 'js-cookie';

// const API_BASE_URL = 'http://13.51.205.110:8081/api/v1';
const API_BASE_URL = 'http://16.16.159.103:8081/api/v1';
// const API_BASE_URL = 'http://localhost:8081/api/v1/';

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
    updateProfileImage: async (username, formData) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'

            },
        });
        try {
            const response = await axiosInstance.post(`/settings/${username}/profile-image`, formData,);
            return response.data;
        } catch (error) {
            return axiosErrorHandler(error);
        }
    },
    getUserProfileImage: async (username) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            },
        });

        try {
            const response = await axiosInstance.get(`/settings/${username}/profile-image`);
            console.log(response.data)
            return response.data;
        } catch (error) {
            return axiosErrorHandler(error);
        }
    },
    updateProfile: async (username,bio) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': "application/json"
            },
        });

        try {
            const response = await axiosInstance.put(`/settings/${username}/profile`,{bio});
            return response.data;
        } catch (error) {
            return axiosErrorHandler(error);
        }
    },
    getTeacherProfileById: async (uuid)=>{
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': "application/json"
            },
        });

        try {
            const response = await axiosInstance.get(`/teacher/id/${uuid}`);
            return response.data;
        } catch (error) {
            return axiosErrorHandler(error);
        }
    },


};

export default settingService;
