import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://devtesteam.site/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('Token expired. Redirecting...');
      localStorage.removeItem('session');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export default apiClient;
