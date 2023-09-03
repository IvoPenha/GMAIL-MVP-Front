import axios from "../../node_modules/axios/index"; 'axios';
export const api = axios.create({    
baseURL: `${import.meta.env.VITE_BASE_URL}/api`,

});
