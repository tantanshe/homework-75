import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});
export default axiosApi;