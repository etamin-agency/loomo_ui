import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1/auth';

const authService = {
    register: async (request) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/register`, request);
            return response.data;
        } catch (error) {
            return error?.response?.data;
        }
    },

    confirmEmail: async (email, number) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/confirm`, {email, number});
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    refreshToken: async () => {
        try {
            await axios.post(`${API_BASE_URL}/refresh-token`);
        } catch (error) {
            throw error;
        }
    },

    authenticate: async (request) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, request);
            return response.data;
        } catch (error) {
            return  error.response;
        }
    },

    checkUserName: async (userName) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/username-exist?userName=${userName}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    checkEmail: async (email) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/email-exist?email=${email}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    verificationNumber: async (email)=>{
        try {
            const response = await  axios.get(`${API_BASE_URL}/verification-number?email=${email}`);
            return response;
        }catch (error){
            throw error;
        }
    },
};

export default authService;
