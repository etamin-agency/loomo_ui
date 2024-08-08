import axios from 'axios';

// const API_BASE_URL = 'http://16.170.223.3:8084/api/v1/post';
// const API_BASE_URL = 'http://192.168.23.246:8084/api/v1/post';
const API_BASE_URL = 'http://localhost:8084/api/v1/post';
const postService = {

    getImage: async (uuid) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/image/${uuid}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getPost: async (uuid) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${uuid}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default postService;
