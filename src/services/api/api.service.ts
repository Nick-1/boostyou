import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: false,
    timeout: 10000,
});

// --------------------
// REQUEST interceptor
// --------------------
api.interceptors.request.use(
    (config) => {
        // const token = localStorage.getItem('token');
        // if (token) config.headers.Authorization = `Bearer ${token}`;

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --------------------
// RESPONSE interceptor
// --------------------
api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            console.warn('Unauthorized');
            // redirect to login if needed
        }

        return Promise.reject(error);
    }
);

// --------------------
// API methods
// --------------------
export const Api = {
    get: <T>(url: string, params?: any): Promise<T> =>
        api.get(url, { params }),

    post: <T>(url: string, body?: any): Promise<T> =>
        api.post(url, body),

    put: <T>(url: string, body?: any): Promise<T> =>
        api.put(url, body),

    delete: <T>(url: string): Promise<T> =>
        api.delete(url),
};

export default Api;
