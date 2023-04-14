import axios from 'axios';
import { HOST_API_KEY } from '../config-global';
import i18n from '../locales/i18n';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = i18n.language;
    return config;
  }
);

export default axiosInstance;
