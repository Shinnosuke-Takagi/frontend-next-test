import axios from 'axios';

export const baseURL = 'http://localhost:80/api';

export const axiosInstance = axios.create({ baseURL });
