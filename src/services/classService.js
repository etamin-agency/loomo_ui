import axios from 'axios';
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";

// const API_BASE_URL = 'http://class.loomo.online:8087/api/v1/class';
const API_BASE_URL = 'https://192.168.23.246:8450/api/v1/class';
// const API_BASE_URL = 'http://localhost:8087/api/v1/class';
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
    },
    isStudentAccepted: async (classId)=>{
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const userName = jwtDecode(Cookie.get('access_token')).sub;
        const data = {
            "userName": userName,
            "classId": classId
        };

        console.log(data)
        try {
            const response = await axiosInstance.post(`/is-student-accepted`,data);
            return response?.data;
        } catch (error) {
            throw error;
        }

    },
    buyClass: async (classId,teacherId)=>{
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const userName = jwtDecode(Cookie.get('access_token')).sub;
        const data = {
            "userName": userName,
            "classId": classId,
            "teacherId":teacherId,
        };

        try {
            const response = await axiosInstance.post(`/buy-class`,data);
            return response?.data;
        } catch (error) {
            throw error;
        }

    },
    updateClass: async (classId,data)=>{
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.post(`/edit-class/${classId}`,data);
            return response?.data;
        } catch (error) {
            throw error;
        }

    },
    fetchAttendingClassesForStudent: async () => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const userName = jwtDecode(Cookie.get('access_token')).sub;

        try {
            const response = await axiosInstance.get(`/student-classes/${userName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    isTeacherClassExists: async () => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const userName = jwtDecode(Cookie.get('access_token')).sub;

        try {
            const response = await axiosInstance.get(`/is-teacher-classes-exists/${userName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchTeacherClasses: async () => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const userName = jwtDecode(Cookie.get('access_token')).sub;

        try {
            const response = await axiosInstance.get(`/teacher-classes/${userName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    fetchClass: async (classId) => {
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/class/${classId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default classService;
