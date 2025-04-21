import axios from 'axios';
import { VITE_APP_KEY } from '../env';

const axiosInstance = axios.create({
    baseURL: "/api",
});


axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

export default axiosInstance;

