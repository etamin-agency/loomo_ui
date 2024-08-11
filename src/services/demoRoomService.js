import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";

const API_BASE_URL = 'https://192.168.23.246:8086/api/v1/room';
// const API_BASE_URL = 'http://localhost:8086/api/v1/room';

const demoRoomService = {

    createRoom: async (postId,teacherId) => {
        try {
          const  teacherName=jwtDecode(Cookie.get('access_token')).sub
            const response = await axios.post(`${API_BASE_URL}/create-room`,{postId,teacherId,teacherName});
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
