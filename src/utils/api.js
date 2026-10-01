import axios from 'axios';

/**
 * Dynamically resolves the API Base URL:
 * 1. On localhost, uses VITE_API_URL or falls back to http://localhost:5000/api
 * 2. On live production (e.g. Vercel deployment), falls back to https://aussiesmartenergy.onrender.com/api if VITE_API_URL is missing or points to localhost
 */
export const getApiBaseUrl = () => {
    const envUrl = import.meta.env.VITE_API_URL;
    const isLocalhost = typeof window !== 'undefined' && (
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1'
    );

    if (isLocalhost) {
        return envUrl || 'http://localhost:5000/api';
    }

    if (!envUrl || envUrl.includes('localhost')) {
        return 'https://aussiesmartenergy.onrender.com/api';
    }

    return envUrl;
};

const api = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;

