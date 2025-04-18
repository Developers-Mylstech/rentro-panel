import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api',
});

axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

export default axiosInstance;

