import axios from 'axios';
import Cookie from 'js-cookie';
import {jwtDecode} from "jwt-decode";

const API_BASE_URL = 'http://192.168.23.246:8082/api/v1/publish-class';

//const API_BASE_URL = 'http://localhost:8082/api/v1/publish-class';


const publishService = {
    getPosts: async (offset = 0, num = 6, username) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/${username}?number=${num}&offset=${offset}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    getLanguages: async () => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/languages`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    createPost: async (formData) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        const userName = jwtDecode(Cookie.get('access_token')).sub;

        try {
            const response =    await axiosInstance.post(`/${userName}/create`,formData);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    getPostData: async (uuid)=>{
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/post/${uuid}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    getFile: async (uuid)=>{
        const token = Cookie.get('access_token');

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/post/image/${uuid}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    editPost: async (uuid,formData) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        try {
            const response =  await axiosInstance.post(`edit/${uuid}`,formData);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    deletePost: async (uuid) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        try {
            const response =  await axiosInstance.delete(`delete/${uuid}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },

};

export default publishService;
