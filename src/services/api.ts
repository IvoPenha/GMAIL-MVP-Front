import axios from "../../node_modules/axios/index"; 'axios';
export const api = axios.create({
    baseURL: 'http://localhost:8000/api',
});