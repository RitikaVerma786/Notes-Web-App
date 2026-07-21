import axios from 'axios';

import {toast} from 'react-toastify';

console.log('api instamce...')
const api = axios.create({
    baseURL: "http://localhost:3000",
    headers:{
        "Content-Type":"application/json"
    }

});

    api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.log("Token expired. Logging out...");
      toast.error('Token expired. Logging out....')
      localStorage.removeItem("token");
      setTimeout(()=>{
        window.location.href = '/login'
      },2000);
    }

    return Promise.reject(error);
  }
);

export default api;