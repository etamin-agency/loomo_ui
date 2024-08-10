import axios from 'axios';
// test
// const API_BASE_URL = 'http://search.loomo.online:8083/api/v1/search';
const API_BASE_URL = 'http://192.168.23.246:8083/api/v1/search';
// const API_BASE_URL = 'http://localhost:8083/api/v1/search';
const searchService = {

    searchPosts: async (text,page=0) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/basic-search?query=${text}&page=${page}`);
            return response.data;

        } catch (error) {
            throw error;
        }
    },

};

export default searchService;
