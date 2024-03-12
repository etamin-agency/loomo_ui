import axios from 'axios';

const API_BASE_URL = 'http://localhost:8086/api/v1/room';
const demoRoomService = {

    createRoom: async (postId,teacherId) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/create-room`,{postId,teacherId});
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    isRoomExists:async (roomId)=>{
        try {
            const response = await axios.get(`${API_BASE_URL}/exists/${roomId}`,);
            return response.data;
        } catch (error) {
            throw error;
        }
    }


};

export default demoRoomService;
