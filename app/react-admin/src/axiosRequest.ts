import axios from 'axios';
import JwtManager from './JwtManager';

const jwtInterceptor = axios.create({ baseURL: 'http://localhost:3000' });

jwtInterceptor.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const prevRequest = error.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
            JwtManager.eraseToken();
            return Promise.reject(error);
        }
        return Promise.reject(error);
    },
);

export default jwtInterceptor;