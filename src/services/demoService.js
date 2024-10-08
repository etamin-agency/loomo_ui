import axios from 'axios';
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";

// const API_BASE_URL = 'http://16.16.159.103:8085/api/v1/demo-class';
const API_BASE_URL = 'https://dev.loomo.online:8448/api/v1/demo-class';
// const API_BASE_URL = 'http:///localhost:8085/api/v1/demo-class';

const demoService = {

    getDemoClasses: async () => {
        const token = Cookie.get('access_token');
        const username = jwtDecode(token).sub;

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/posts/${username}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getDemoAppliedStudent: async (uuid) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/students/${uuid}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getDemoClassesPost: async () => {
        const token = Cookie.get('access_token');
        const username = jwtDecode(token).sub;

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`${API_BASE_URL}/classes/${username}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    attendDemoClass: async (data) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.post(`/add`,data);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    isStudentAttending: async (postId)=>{
        const token = Cookie.get('access_token');
        const username = jwtDecode(token).sub;
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/is-attending/${postId}/${username}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    isStudentAttendingToAnyClass: async ()=>{
        const token = Cookie.get('access_token');
        const username = jwtDecode(token).sub;
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/is-attending/${username}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    isDemoClassesExists: async ()=>{
        const token = Cookie.get('access_token');
        const username = jwtDecode(token).sub;
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/is-demo-classes-exists/${username}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },

};

export default demoService;
