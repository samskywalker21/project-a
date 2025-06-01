import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Adjust for your backend URL
  withCredentials: true, // Enables sending cookies with requests
  headers: {
    Accept: 'application/json',
  },
});

// Fetch the token from cookies (assuming it's accessible via document.cookies)
const getTokenFromCookies = () => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find((cookie) =>
    cookie.trim().startsWith('accessToken'),
  );
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

// Add a request interceptor to set the Authorization header
api.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookies();
    console.log(token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default api;
