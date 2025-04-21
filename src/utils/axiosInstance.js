import axios from 'axios';
import { VITE_APP_KEY } from '../env';

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'skip_zrok_interstitial': 'true'
    }
});


axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

export default axiosInstance;

