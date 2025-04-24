import axios from 'axios';

// Use Vite environment variable
const baseURL = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
    baseURL,
});

axiosInstance.defaults.headers.common['skip_zrok_interstitial'] = 'true';

export default axiosInstance;
