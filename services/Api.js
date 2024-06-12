import axios from 'axios';

const api = axios.create({
  baseURL: 'http://ec2-3-66-47-131.eu-central-1.compute.amazonaws.com/api',
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api
