import axios from 'axios';
import store from '@/store';
import router from '@/router';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});

instance.interceptors.request.use(
  (config) => {
    const storage = JSON.parse(localStorage.getItem('user'));
    if (storage) config.headers['Authorization'] = `Bearer ${storage.token}`;
    return config;
  },
  (err) => {
    return Promise.reject(err);
  },
);

instance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch('setLogout');
    }
    if (error.response.status === 500) {
      router.push({ name: '500' });
    }

    return { error };
  },
);
export default instance;
