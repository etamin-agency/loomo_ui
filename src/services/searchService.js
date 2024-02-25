import axios from 'axios';

const API_BASE_URL = 'http://localhost:8083/api/v1/search';
const searchService = {

    searchPosts: async (text) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/basic-search?query=${text}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

};

export default searchService;
