import axios from 'axios';
import { jwtJsonHeader } from './header';

export const baseURL = 'http://localhost:80/api';

export const axiosInstance = axios.create({ baseURL });
axiosInstance.defaults.withCredentials = true;
axiosInstance.defaults.headers = jwtJsonHeader;
