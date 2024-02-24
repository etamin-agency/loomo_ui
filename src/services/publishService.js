import axios from 'axios';
import Cookie from 'js-cookie';
import {jwtDecode} from "jwt-decode";

const API_BASE_URL = 'http://localhost:8082/api/v1';


const publishService = {
    getPublishedClasses: async (offset = 0, num = 6, username) => {
        const token = Cookie.get('access_token');
        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        try {
            const response = await axiosInstance.get(`/publish-class/${username}?number=${num}&offset=${offset}`);
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
            const response = await axiosInstance.get(`/publish-class/languages`);
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
            const response =    await axiosInstance.post(`/publish-class/${userName}/create`,formData);
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
            const response = await axiosInstance.get(`/publish-class/post/${uuid}`);
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },
    getFile: async (uuid)=>{
        const token = Cookie.get('access_token');
        const userName = jwtDecode(token).sub;

        const axiosInstance = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        try {
            const response = await axiosInstance.get(`/publish-class/post/file/${userName}/${uuid}`);
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
        const userName = jwtDecode(Cookie.get('access_token')).sub;

        try {
            const response =  await axiosInstance.post(`/publish-class/${userName}/edit/${uuid}`,formData);
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error)
        }
    },

};

export default publishService;
