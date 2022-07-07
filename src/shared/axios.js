import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:5001"
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`
    }
    return config;
  }, (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
