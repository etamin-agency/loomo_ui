import axios from 'axios';
// const API_BASE_URL = 'http://search.loomo.online:8083/api/v1/search';
const API_BASE_URL = 'http://13.48.248.105:8083/api/v1/search';
// const API_BASE_URL = 'http://localhost:8083/api/v1/search';

const searchService = {
    searchPosts: async (text, page = 0) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/basic-search?query=${text}&page=${page}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    applyFilters: async (query, page, filters, sortOrder) => {
        try {
            let url = `${API_BASE_URL}/search?query=${query}&page=${page}`;
            
            // Add filter parameters
            Object.entries(filters).forEach(([key, values]) => {
                if (values.length) {
                    url += `&${key}=${values.join(',')}`;
                }
            });
            
            // Add sort parameter
            if (sortOrder) {
                url += `&sort=${sortOrder}`;
            }

            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};


export default searchService;
