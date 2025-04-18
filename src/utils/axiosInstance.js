import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: '/api', // or your full base URL
});

axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

export default axiosInstance;

