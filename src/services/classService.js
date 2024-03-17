import axios from 'axios';
import Cookie from "js-cookie";

const API_BASE_URL = 'http://localhost:8087/api/v1/class';
const classService = {

    createClass: async (className, postId) => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = {
            className: className,
            postId: postId
        };
        try {
            const response = await axiosInstance.post(`/create-class`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    isClassExists: async (classId) => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/is-exists/${classId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAcceptedStudents: async (classId) => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/accepted-students/${classId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    acceptStudent: async (studentId, classId) => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = {
            classId: classId,
            studentId: studentId
        };
        try {
            const response = await axiosInstance.post(`/accept-student`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

};

export default classService;
